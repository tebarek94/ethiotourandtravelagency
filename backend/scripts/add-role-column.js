const mysql = require('mysql2/promise');
require('dotenv').config();

async function addRoleColumn() {
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

    // Check if role column exists
    const [columns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role'
    `, [process.env.DB_NAME || 'zad_travel_agency']);

    if (columns.length > 0) {
      console.log('✅ Role column already exists in users table');
    } else {
      // Add role column
      await connection.execute(`
        ALTER TABLE users 
        ADD COLUMN role ENUM('admin', 'user') DEFAULT 'user' 
        AFTER password_hash
      `);
      console.log('✅ Role column added to users table');
    }

    // Verify the table structure
    const [tableInfo] = await connection.execute('DESCRIBE users');
    console.log('\n📋 Current users table structure:');
    tableInfo.forEach(row => {
      console.log(`  - ${row.Field}: ${row.Type} ${row.Null === 'NO' ? '(NOT NULL)' : ''} ${row.Default ? `DEFAULT ${row.Default}` : ''}`);
    });

    console.log('\n✅ Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the migration
addRoleColumn();

