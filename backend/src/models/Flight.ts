import pool from '../config/database';
import { Flight, CreateFlightRequest } from '../types';

export class FlightModel {
  static async create(flightData: CreateFlightRequest): Promise<Flight> {
    const { booking_id, departure_city, arrival_city, departure_time, arrival_time, airline, flight_number } = flightData;
    
    const [result] = await pool.execute(
      'INSERT INTO flights (booking_id, departure_city, arrival_city, departure_time, arrival_time, airline, flight_number) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [booking_id, departure_city, arrival_city, departure_time, arrival_time, airline, flight_number]
    );

    const insertResult = result as any;
    const newFlight = await this.findById(insertResult.insertId);
    return newFlight!;
  }

  static async findById(id: number): Promise<Flight | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM flights WHERE transport_id = ?',
      [id]
    );

    const flights = rows as Flight[];
    return flights.length > 0 ? flights[0] : null;
  }

  static async findByBookingId(bookingId: number): Promise<Flight[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM flights WHERE booking_id = ? ORDER BY departure_time ASC',
      [bookingId]
    );

    return rows as Flight[];
  }

  static async findAll(): Promise<Flight[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM flights ORDER BY departure_time ASC'
    );

    return rows as Flight[];
  }

  static async update(id: number, updateData: Partial<Flight>): Promise<Flight | null> {
    const fields = [];
    const values = [];

    if (updateData.departure_city !== undefined) {
      fields.push('departure_city = ?');
      values.push(updateData.departure_city);
    }
    if (updateData.arrival_city !== undefined) {
      fields.push('arrival_city = ?');
      values.push(updateData.arrival_city);
    }
    if (updateData.departure_time !== undefined) {
      fields.push('departure_time = ?');
      values.push(updateData.departure_time);
    }
    if (updateData.arrival_time !== undefined) {
      fields.push('arrival_time = ?');
      values.push(updateData.arrival_time);
    }
    if (updateData.airline !== undefined) {
      fields.push('airline = ?');
      values.push(updateData.airline);
    }
    if (updateData.flight_number !== undefined) {
      fields.push('flight_number = ?');
      values.push(updateData.flight_number);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.execute(
      `UPDATE flights SET ${fields.join(', ')} WHERE transport_id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute(
      'DELETE FROM flights WHERE transport_id = ?',
      [id]
    );

    const deleteResult = result as any;
    return deleteResult.affectedRows > 0;
  }
}
