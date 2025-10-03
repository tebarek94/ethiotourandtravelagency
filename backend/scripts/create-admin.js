const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function createAdminUser() {
  try {
    // Create database connection
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'zad_travel_agency'
    });

    console.log('Connected to database successfully');

    // Check if admin user already exists
    const [existingAdmins] = await connection.execute(
      'SELECT * FROM users WHERE role = "admin"'
    );

    if (existingAdmins.length > 0) {
      console.log('Admin user already exists:');
      existingAdmins.forEach(admin => {
        console.log(`- ID: ${admin.user_id}, Name: ${admin.name}, Email: ${admin.email}`);
      });
      await connection.end();
      return;
    }

    // Create admin user
    const adminData = {
      name: 'Admin User',
      email: 'admin@zadtravel.com',
      phone: '+1234567890',
      password: 'admin123',
      role: 'admin'
    };

    // Hash password
    const saltRounds = 12;
    const password_hash = await bcrypt.hash(adminData.password, saltRounds);

    // Insert admin user
    const [result] = await connection.execute(
      'INSERT INTO users (name, email, phone, password_hash, role) VALUES (?, ?, ?, ?, ?)',
      [adminData.name, adminData.email, adminData.phone, password_hash, adminData.role]
    );

    console.log('Admin user created successfully!');
    console.log(`Admin ID: ${result.insertId}`);
    console.log(`Email: ${adminData.email}`);
    console.log(`Password: ${adminData.password}`);
    console.log('\nYou can now login to the admin dashboard with these credentials.');

    await connection.end();
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();
