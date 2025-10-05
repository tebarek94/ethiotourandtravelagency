const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });

async function createDocumentsTable() {
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

    // Check if documents table already exists
    const [tables] = await connection.execute(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'documents'
    `, [process.env.DB_NAME || 'zad_travel_agency']);

    if (tables.length > 0) {
      console.log('✅ Documents table already exists');
    } else {
      console.log('Creating documents table...');
      
      // Create the documents table
      await connection.execute(`
        CREATE TABLE documents (
          document_id INT AUTO_INCREMENT PRIMARY KEY,
          booking_id INT NOT NULL,
          file_name VARCHAR(255) NOT NULL,
          original_name VARCHAR(255) NOT NULL,
          file_path VARCHAR(500) NOT NULL,
          file_type ENUM('passport', 'visa', 'photo', 'other') NOT NULL,
          file_size INT NOT NULL,
          mime_type VARCHAR(100) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
          INDEX idx_booking_id (booking_id),
          INDEX idx_file_type (file_type)
        )
      `);
      
      console.log('✅ Documents table created successfully');
    }

    // Check table structure
    const [columns] = await connection.execute('DESCRIBE documents');
    console.log('\n📋 Documents table structure:');
    columns.forEach(row => {
      console.log(`  - ${row.Field}: ${row.Type} ${row.Null === 'NO' ? '(NOT NULL)' : ''} ${row.Default ? `DEFAULT ${row.Default}` : ''}`);
    });

    // Check if bookings table exists (required for foreign key)
    const [bookingsTable] = await connection.execute(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'bookings'
    `, [process.env.DB_NAME || 'zad_travel_agency']);

    if (bookingsTable.length === 0) {
      console.log('\n⚠️  WARNING: bookings table does not exist. Foreign key constraint may fail.');
      console.log('   Please create the bookings table first.');
    } else {
      console.log('\n✅ bookings table exists - foreign key constraint is valid');
    }

    console.log('\n✅ Documents table setup completed successfully!');
    
  } catch (error) {
    console.error('❌ Documents table creation failed:', error);
    
    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      console.log('\n💡 This error usually means the bookings table doesn\'t exist.');
      console.log('   Please create the bookings table first, then run this script again.');
    }
    
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the script
createDocumentsTable();

