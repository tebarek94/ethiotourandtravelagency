const mysql = require('mysql2/promise');
require('dotenv').config({ path: '../.env' });

async function verifyDatabaseSchema() {
  let connection;
  
  try {
    // Connect to the database
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'zad_travel_agency',
    });

    console.log('🔍 Verifying database schema...\n');

    // List of required tables
    const requiredTables = [
      'users',
      'packages', 
      'bookings',
      'inquiries',
      'articles',
      'documents',
      'destinations',
      'partners'
    ];

    const existingTables = [];
    const missingTables = [];

    // Check each table
    for (const tableName of requiredTables) {
      const [tables] = await connection.execute(`
        SELECT TABLE_NAME 
        FROM INFORMATION_SCHEMA.TABLES 
        WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
      `, [process.env.DB_NAME || 'zad_travel_agency', tableName]);

      if (tables.length > 0) {
        existingTables.push(tableName);
        console.log(`✅ ${tableName} table exists`);
      } else {
        missingTables.push(tableName);
        console.log(`❌ ${tableName} table missing`);
      }
    }

    console.log(`\n📊 Summary:`);
    console.log(`   ✅ Existing tables: ${existingTables.length}`);
    console.log(`   ❌ Missing tables: ${missingTables.length}`);

    if (missingTables.length > 0) {
      console.log(`\n🔧 Missing tables: ${missingTables.join(', ')}`);
      console.log('\n💡 To create missing tables, run the appropriate setup scripts:');
      console.log('   - node scripts/setup-database.js (creates all basic tables)');
      console.log('   - node scripts/create-documents-table.js (creates documents table)');
    } else {
      console.log('\n🎉 All required tables exist! Database schema is complete.');
    }

    // Check for any tables with missing columns
    console.log('\n🔍 Checking for missing columns...');
    
    // Check users table for role column
    const [userColumns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'users' AND COLUMN_NAME = 'role'
    `, [process.env.DB_NAME || 'zad_travel_agency']);

    if (userColumns.length === 0) {
      console.log('⚠️  users table missing "role" column');
    } else {
      console.log('✅ users table has "role" column');
    }

    // Check inquiries table for status column
    const [inquiryColumns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'inquiries' AND COLUMN_NAME = 'status'
    `, [process.env.DB_NAME || 'zad_travel_agency']);

    if (inquiryColumns.length === 0) {
      console.log('⚠️  inquiries table missing "status" column');
    } else {
      console.log('✅ inquiries table has "status" column');
    }

    // Check bookings table for travelers column
    const [bookingColumns] = await connection.execute(`
      SELECT COLUMN_NAME 
      FROM INFORMATION_SCHEMA.COLUMNS 
      WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'bookings' AND COLUMN_NAME = 'travelers'
    `, [process.env.DB_NAME || 'zad_travel_agency']);

    if (bookingColumns.length === 0) {
      console.log('⚠️  bookings table missing "travelers" column');
    } else {
      console.log('✅ bookings table has "travelers" column');
    }

    console.log('\n✅ Database schema verification completed!');
    
  } catch (error) {
    console.error('❌ Database verification failed:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the verification
verifyDatabaseSchema();

