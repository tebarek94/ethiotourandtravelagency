import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'zad_travel_agency',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test database connection
export const testConnection = async (): Promise<void> => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

// Initialize database tables
export const initializeDatabase = async (): Promise<void> => {
  try {
    const connection = await pool.getConnection();
    
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

    // Create package_destinations junction table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS package_destinations (
        package_id INT,
        destination_id INT,
        PRIMARY KEY (package_id, destination_id),
        FOREIGN KEY (package_id) REFERENCES packages(package_id) ON DELETE CASCADE,
        FOREIGN KEY (destination_id) REFERENCES destinations(destination_id) ON DELETE CASCADE
      )
    `);

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

    // Create flights table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS flights (
        transport_id INT PRIMARY KEY AUTO_INCREMENT,
        booking_id INT NOT NULL,
        departure_city VARCHAR(255) NOT NULL,
        arrival_city VARCHAR(255) NOT NULL,
        departure_time DATETIME NOT NULL,
        arrival_time DATETIME NOT NULL,
        airline VARCHAR(255) NOT NULL,
        flight_number VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
      )
    `);

    // Create hotels table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS hotels (
        hotel_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        city VARCHAR(255) NOT NULL,
        star_rating INT DEFAULT 3,
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create booking_hotels junction table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS booking_hotels (
        booking_hotel_id INT PRIMARY KEY AUTO_INCREMENT,
        booking_id INT NOT NULL,
        hotel_id INT NOT NULL,
        nights INT NOT NULL DEFAULT 1,
        check_in_date DATE NOT NULL,
        check_out_date DATE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
        FOREIGN KEY (hotel_id) REFERENCES hotels(hotel_id) ON DELETE CASCADE
      )
    `);

    // Create transfers table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS transfers (
        transfer_id INT PRIMARY KEY AUTO_INCREMENT,
        booking_id INT NOT NULL,
        from_location VARCHAR(255) NOT NULL,
        to_location VARCHAR(255) NOT NULL,
        transport_type ENUM('bus', 'car', 'van', 'train') NOT NULL,
        time DATETIME NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE
      )
    `);

    // Create articles table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS articles (
        article_id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        content TEXT NOT NULL,
        author VARCHAR(255) NOT NULL,
        published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

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

    // Create partners table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS partners (
        partner_id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        type ENUM('airline', 'hotel', 'transport', 'other') NOT NULL,
        contact_info TEXT,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    connection.release();
    console.log('✅ Database tables initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    throw error;
  }
};

export default pool;
