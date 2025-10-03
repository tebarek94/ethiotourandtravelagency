import pool from '../config/database';
import { Booking, CreateBookingRequest } from '../types';

export class BookingModel {
  static async create(bookingData: CreateBookingRequest & { user_id: number; total_price: number }): Promise<Booking> {
    const { user_id, package_id, travel_date, travelers, total_price } = bookingData;
    
    const [result] = await pool.execute(
      'INSERT INTO bookings (user_id, package_id, travel_date, travelers, total_price) VALUES (?, ?, ?, ?, ?)',
      [user_id, package_id, travel_date, travelers, total_price]
    );

    const insertResult = result as any;
    const newBooking = await this.findById(insertResult.insertId);
    return newBooking!;
  }

  static async findById(id: number): Promise<Booking | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM bookings WHERE booking_id = ?',
      [id]
    );

    const bookings = rows as Booking[];
    return bookings.length > 0 ? bookings[0] : null;
  }

  static async findByUserId(userId: number): Promise<Booking[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );

    return rows as Booking[];
  }

  static async findAll(): Promise<Booking[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM bookings ORDER BY created_at DESC'
    );

    return rows as Booking[];
  }

  static async update(id: number, updateData: Partial<Booking>): Promise<Booking | null> {
    const fields = [];
    const values = [];

    if (updateData.travel_date !== undefined) {
      fields.push('travel_date = ?');
      values.push(updateData.travel_date);
    }
    if (updateData.travelers !== undefined) {
      fields.push('travelers = ?');
      values.push(updateData.travelers);
    }
    if (updateData.status !== undefined) {
      fields.push('status = ?');
      values.push(updateData.status);
    }
    if (updateData.total_price !== undefined) {
      fields.push('total_price = ?');
      values.push(updateData.total_price);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.execute(
      `UPDATE bookings SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE booking_id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute(
      'DELETE FROM bookings WHERE booking_id = ?',
      [id]
    );

    const deleteResult = result as any;
    return deleteResult.affectedRows > 0;
  }

  static async getBookingWithDetails(id: number): Promise<any> {
    const [rows] = await pool.execute(
      `SELECT b.*, p.name as package_name, p.type as package_type, u.name as user_name, u.email as user_email
       FROM bookings b
       INNER JOIN packages p ON b.package_id = p.package_id
       INNER JOIN users u ON b.user_id = u.user_id
       WHERE b.booking_id = ?`,
      [id]
    );

    const bookings = rows as any[];
    return bookings.length > 0 ? bookings[0] : null;
  }
}
