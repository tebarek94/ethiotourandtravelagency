const mysql = require('mysql2/promise');
require('dotenv').config();

async function checkInquiriesTable() {
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

    // Check if inquiries table exists
    const [tables] = await connection.execute(`
      SELECT TABLE_NAME 
      FROM INFORMATION_SCHEMA.TABLES 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'inquiries'
    `, [process.env.DB_NAME || 'zad_travel_agency']);

    if (tables.length === 0) {
      console.log('Creating inquiries table...');
      await connection.execute(`
        CREATE TABLE inquiries (
          inquiry_id INT PRIMARY KEY AUTO_INCREMENT,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(20),
          message TEXT NOT NULL,
          status ENUM('new', 'read', 'replied') DEFAULT 'new',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('✅ Inquiries table created successfully');
    } else {
      console.log('✅ Inquiries table already exists');
    }

    // Check table structure
    const [columns] = await connection.execute('DESCRIBE inquiries');
    console.log('\n📋 Inquiries table structure:');
    columns.forEach(row => {
      console.log(`  - ${row.Field}: ${row.Type} ${row.Null === 'NO' ? '(NOT NULL)' : ''} ${row.Default ? `DEFAULT ${row.Default}` : ''}`);
    });

    // Test the table by inserting a sample inquiry
    try {
      await connection.execute(`
        INSERT INTO inquiries (name, email, message, status) 
        VALUES ('Test User', 'test@example.com', 'This is a test inquiry', 'new')
      `);
      console.log('✅ Test inquiry inserted successfully');
      
      // Clean up test data
      await connection.execute('DELETE FROM inquiries WHERE email = "test@example.com"');
      console.log('✅ Test data cleaned up');
    } catch (error) {
      console.log('ℹ️  Test inquiry already exists or error:', error.message);
    }

    console.log('\n✅ Inquiries table check completed successfully!');
    
  } catch (error) {
    console.error('❌ Inquiries table check failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the check
checkInquiriesTable();

