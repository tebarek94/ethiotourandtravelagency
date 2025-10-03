import pool from '../config/database';
import { Hotel, CreateHotelRequest, BookingHotel, CreateBookingHotelRequest } from '../types';

export class HotelModel {
  static async create(hotelData: CreateHotelRequest): Promise<Hotel> {
    const { name, city, star_rating, address } = hotelData;
    
    const [result] = await pool.execute(
      'INSERT INTO hotels (name, city, star_rating, address) VALUES (?, ?, ?, ?)',
      [name, city, star_rating, address]
    );

    const insertResult = result as any;
    const newHotel = await this.findById(insertResult.insertId);
    return newHotel!;
  }

  static async findById(id: number): Promise<Hotel | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM hotels WHERE hotel_id = ?',
      [id]
    );

    const hotels = rows as Hotel[];
    return hotels.length > 0 ? hotels[0] : null;
  }

  static async findAll(): Promise<Hotel[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM hotels ORDER BY name ASC'
    );

    return rows as Hotel[];
  }

  static async findByCity(city: string): Promise<Hotel[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM hotels WHERE city = ? ORDER BY name ASC',
      [city]
    );

    return rows as Hotel[];
  }

  static async update(id: number, updateData: Partial<Hotel>): Promise<Hotel | null> {
    const fields = [];
    const values = [];

    if (updateData.name !== undefined) {
      fields.push('name = ?');
      values.push(updateData.name);
    }
    if (updateData.city !== undefined) {
      fields.push('city = ?');
      values.push(updateData.city);
    }
    if (updateData.star_rating !== undefined) {
      fields.push('star_rating = ?');
      values.push(updateData.star_rating);
    }
    if (updateData.address !== undefined) {
      fields.push('address = ?');
      values.push(updateData.address);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.execute(
      `UPDATE hotels SET ${fields.join(', ')} WHERE hotel_id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute(
      'DELETE FROM hotels WHERE hotel_id = ?',
      [id]
    );

    const deleteResult = result as any;
    return deleteResult.affectedRows > 0;
  }
}

export class BookingHotelModel {
  static async create(bookingHotelData: CreateBookingHotelRequest): Promise<BookingHotel> {
    const { booking_id, hotel_id, nights, check_in_date, check_out_date } = bookingHotelData;
    
    const [result] = await pool.execute(
      'INSERT INTO booking_hotels (booking_id, hotel_id, nights, check_in_date, check_out_date) VALUES (?, ?, ?, ?, ?)',
      [booking_id, hotel_id, nights, check_in_date, check_out_date]
    );

    const insertResult = result as any;
    const newBookingHotel = await this.findById(insertResult.insertId);
    return newBookingHotel!;
  }

  static async findById(id: number): Promise<BookingHotel | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM booking_hotels WHERE booking_hotel_id = ?',
      [id]
    );

    const bookingHotels = rows as BookingHotel[];
    return bookingHotels.length > 0 ? bookingHotels[0] : null;
  }

  static async findByBookingId(bookingId: number): Promise<any[]> {
    const [rows] = await pool.execute(
      `SELECT bh.*, h.name as hotel_name, h.city, h.star_rating, h.address
       FROM booking_hotels bh
       INNER JOIN hotels h ON bh.hotel_id = h.hotel_id
       WHERE bh.booking_id = ?`,
      [bookingId]
    );

    return rows as any[];
  }

  static async findAll(): Promise<BookingHotel[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM booking_hotels ORDER BY created_at DESC'
    );

    return rows as BookingHotel[];
  }

  static async update(id: number, updateData: Partial<BookingHotel>): Promise<BookingHotel | null> {
    const fields = [];
    const values = [];

    if (updateData.nights !== undefined) {
      fields.push('nights = ?');
      values.push(updateData.nights);
    }
    if (updateData.check_in_date !== undefined) {
      fields.push('check_in_date = ?');
      values.push(updateData.check_in_date);
    }
    if (updateData.check_out_date !== undefined) {
      fields.push('check_out_date = ?');
      values.push(updateData.check_out_date);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.execute(
      `UPDATE booking_hotels SET ${fields.join(', ')} WHERE booking_hotel_id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute(
      'DELETE FROM booking_hotels WHERE booking_hotel_id = ?',
      [id]
    );

    const deleteResult = result as any;
    return deleteResult.affectedRows > 0;
  }
}
