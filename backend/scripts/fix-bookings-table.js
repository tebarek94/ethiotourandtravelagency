const mysql = require('mysql2/promise');
require('dotenv').config();

async function fixBookingsTable() {
  let connection;
  
  try {
    // Connect to the database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'zad_travel_agency',
    });

    console.log('Connected to database');

    // Check if bookings table exists
    const [tables] = await connection.execute(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'bookings'
    `, [process.env.DB_NAME || 'zad_travel_agency']);

    if (tables.length === 0) {
      console.log('Creating bookings table...');
      await connection.execute(`
        CREATE TABLE bookings (
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
      console.log('✅ Bookings table created successfully');
    } else {
      console.log('Bookings table exists, checking columns...');
      
      // Check current table structure
      const [columns] = await connection.execute('DESCRIBE bookings');
      console.log('\n📋 Current bookings table structure:');
      columns.forEach(row => {
        console.log(`  - ${row.Field}: ${row.Type} ${row.Null === 'NO' ? '(NOT NULL)' : ''} ${row.Default ? `DEFAULT ${row.Default}` : ''}`);
      });

      // Check for missing columns and add them
      const requiredColumns = [
        { name: 'travelers', definition: 'INT NOT NULL DEFAULT 1' },
        { name: 'status', definition: "ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending'" },
        { name: 'total_price', definition: 'DECIMAL(10,2) NOT NULL' },
        { name: 'updated_at', definition: 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP' }
      ];

      for (const column of requiredColumns) {
        const columnExists = columns.some(col => col.Field === column.name);
        if (!columnExists) {
          console.log(`Adding missing column: ${column.name}`);
          await connection.execute(`ALTER TABLE bookings ADD COLUMN ${column.name} ${column.definition}`);
          console.log(`✅ Added column: ${column.name}`);
        } else {
          console.log(`✅ Column already exists: ${column.name}`);
        }
      }
    }

    // Verify final table structure
    const [finalColumns] = await connection.execute('DESCRIBE bookings');
    console.log('\n📋 Final bookings table structure:');
    finalColumns.forEach(row => {
      console.log(`  - ${row.Field}: ${row.Type} ${row.Null === 'NO' ? '(NOT NULL)' : ''} ${row.Default ? `DEFAULT ${row.Default}` : ''}`);
    });

    console.log('\n✅ Bookings table fix completed successfully!');
    
  } catch (error) {
    console.error('❌ Bookings table fix failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the fix
fixBookingsTable();

