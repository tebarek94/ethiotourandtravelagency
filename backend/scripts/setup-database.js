const mysql = require('mysql2/promise');
require('dotenv').config();

async function setupDatabase() {
  let connection;
  
  try {
    // Connect to MySQL server (without specifying database)
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
    });

    console.log('Connected to MySQL server');

    // Create database if it doesn't exist
    const dbName = process.env.DB_NAME || 'zad_travel_agency';
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`Database '${dbName}' created or already exists`);

    // Switch to the database
    await connection.execute(`USE \`${dbName}\``);

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        user_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        password_hash VARCHAR(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created or already exists');

    // Check if role column exists and add it if missing
    const [columns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role'
    `, [dbName]);

    if (columns.length === 0) {
      await connection.execute(`
        ALTER TABLE users 
        ADD COLUMN role ENUM('admin', 'user') DEFAULT 'user' 
        AFTER password_hash
      `);
      console.log('✅ Role column added to existing users table');
    } else {
      console.log('✅ Role column already exists in users table');
    }

    // Create packages table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS packages (
        package_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        duration_days INT NOT NULL,
        nights INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        type ENUM('umrah', 'hajj', 'tour', 'custom') NOT NULL,
        rating DECIMAL(3,2) DEFAULT 0.00,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    console.log('Packages table created or already exists');

    // Create destinations table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS destinations (
        destination_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        type ENUM('city', 'country', 'landmark') NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Destinations table created or already exists');

    // Create bookings table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS bookings (
        booking_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        package_id INT NOT NULL,
        travel_date DATE NOT NULL,
        travelers INT NOT NULL DEFAULT 1,
        status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
        total_price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (package_id) REFERENCES packages(package_id) ON DELETE CASCADE
      )
    `);
    console.log('Bookings table created or already exists');

    // Create inquiries table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS inquiries (
        inquiry_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        message TEXT NOT NULL,
        status ENUM('new', 'read', 'replied') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Inquiries table created or already exists');

    // Verify users table structure
    const [tableInfo] = await connection.execute('DESCRIBE users');
    console.log('\n📋 Users table structure:');
    tableInfo.forEach(row => {
      console.log(`  - ${row.Field}: ${row.Type} ${row.Null === 'NO' ? '(NOT NULL)' : ''} ${row.Default ? `DEFAULT ${row.Default}` : ''}`);
    });

    console.log('\n✅ Database setup completed successfully!');
    console.log('🚀 You can now start the server and test registration');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the setup
setupDatabase();

