import pool from '../config/database';
import { Transfer, CreateTransferRequest } from '../types';

export class TransferModel {
  static async create(transferData: CreateTransferRequest): Promise<Transfer> {
    const { booking_id, from_location, to_location, transport_type, time } = transferData;
    
    const [result] = await pool.execute(
      'INSERT INTO transfers (booking_id, from_location, to_location, transport_type, time) VALUES (?, ?, ?, ?, ?)',
      [booking_id, from_location, to_location, transport_type, time]
    );

    const insertResult = result as any;
    const newTransfer = await this.findById(insertResult.insertId);
    return newTransfer!;
  }

  static async findById(id: number): Promise<Transfer | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM transfers WHERE transfer_id = ?',
      [id]
    );

    const transfers = rows as Transfer[];
    return transfers.length > 0 ? transfers[0] : null;
  }

  static async findByBookingId(bookingId: number): Promise<Transfer[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM transfers WHERE booking_id = ? ORDER BY time ASC',
      [bookingId]
    );

    return rows as Transfer[];
  }

  static async findAll(): Promise<Transfer[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM transfers ORDER BY time ASC'
    );

    return rows as Transfer[];
  }

  static async update(id: number, updateData: Partial<Transfer>): Promise<Transfer | null> {
    const fields = [];
    const values = [];

    if (updateData.from_location !== undefined) {
      fields.push('from_location = ?');
      values.push(updateData.from_location);
    }
    if (updateData.to_location !== undefined) {
      fields.push('to_location = ?');
      values.push(updateData.to_location);
    }
    if (updateData.transport_type !== undefined) {
      fields.push('transport_type = ?');
      values.push(updateData.transport_type);
    }
    if (updateData.time !== undefined) {
      fields.push('time = ?');
      values.push(updateData.time);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.execute(
      `UPDATE transfers SET ${fields.join(', ')} WHERE transfer_id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute(
      'DELETE FROM transfers WHERE transfer_id = ?',
      [id]
    );

    const deleteResult = result as any;
    return deleteResult.affectedRows > 0;
  }
}
