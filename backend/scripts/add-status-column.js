const mysql = require('mysql2/promise');
require('dotenv').config();

async function addStatusColumn() {
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

    // Check if status column exists
    const [columns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'inquiries' AND COLUMN_NAME = 'status'
    `, [process.env.DB_NAME || 'zad_travel_agency']);

    if (columns.length === 0) {
      console.log('Adding status column to inquiries table...');
      await connection.execute(`
        ALTER TABLE inquiries 
        ADD COLUMN status ENUM('new', 'read', 'replied') DEFAULT 'new' 
        AFTER message
      `);
      console.log('✅ Status column added to inquiries table');
    } else {
      console.log('✅ Status column already exists in inquiries table');
    }

    // Verify the table structure
    const [tableInfo] = await connection.execute('DESCRIBE inquiries');
    console.log('\n📋 Final inquiries table structure:');
    tableInfo.forEach(row => {
      console.log(`  - ${row.Field}: ${row.Type} ${row.Null === 'NO' ? '(NOT NULL)' : ''} ${row.Default ? `DEFAULT ${row.Default}` : ''}`);
    });

    // Test the table by inserting a sample inquiry
    try {
      await connection.execute(`
        INSERT INTO inquiries (name, email, message, status) 
        VALUES ('Test User', 'test@example.com', 'This is a test inquiry', 'new')
      `);
      console.log('✅ Test inquiry with status inserted successfully');
      
      // Clean up test data
      await connection.execute('DELETE FROM inquiries WHERE email = "test@example.com"');
      console.log('✅ Test data cleaned up');
    } catch (error) {
      console.log('ℹ️  Test inquiry error:', error.message);
    }

    console.log('\n✅ Status column fix completed successfully!');
    
  } catch (error) {
    console.error('❌ Status column fix failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the fix
addStatusColumn();

