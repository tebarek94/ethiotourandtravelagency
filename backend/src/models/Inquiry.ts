import pool from '../config/database';
import { Inquiry, CreateInquiryRequest } from '../types';

export class InquiryModel {
  static async create(inquiryData: CreateInquiryRequest): Promise<Inquiry> {
    const { name, email, phone, message } = inquiryData;
    
    const [result] = await pool.execute(
      'INSERT INTO inquiries (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone, message]
    );

    const insertResult = result as any;
    const newInquiry = await this.findById(insertResult.insertId);
    return newInquiry!;
  }

  static async findById(id: number): Promise<Inquiry | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM inquiries WHERE inquiry_id = ?',
      [id]
    );

    const inquiries = rows as Inquiry[];
    return inquiries.length > 0 ? inquiries[0] : null;
  }

  static async findAll(): Promise<Inquiry[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM inquiries ORDER BY created_at DESC'
    );

    return rows as Inquiry[];
  }

  static async findByStatus(status: string): Promise<Inquiry[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM inquiries WHERE status = ? ORDER BY created_at DESC',
      [status]
    );

    return rows as Inquiry[];
  }

  static async update(id: number, updateData: Partial<Inquiry>): Promise<Inquiry | null> {
    const fields = [];
    const values = [];

    if (updateData.name !== undefined) {
      fields.push('name = ?');
      values.push(updateData.name);
    }
    if (updateData.email !== undefined) {
      fields.push('email = ?');
      values.push(updateData.email);
    }
    if (updateData.phone !== undefined) {
      fields.push('phone = ?');
      values.push(updateData.phone);
    }
    if (updateData.message !== undefined) {
      fields.push('message = ?');
      values.push(updateData.message);
    }
    if (updateData.status !== undefined) {
      fields.push('status = ?');
      values.push(updateData.status);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.execute(
      `UPDATE inquiries SET ${fields.join(', ')} WHERE inquiry_id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute(
      'DELETE FROM inquiries WHERE inquiry_id = ?',
      [id]
    );

    const deleteResult = result as any;
    return deleteResult.affectedRows > 0;
  }

  static async getStats(): Promise<any> {
    const [rows] = await pool.execute(
      `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'new' THEN 1 ELSE 0 END) as new_count,
        SUM(CASE WHEN status = 'read' THEN 1 ELSE 0 END) as read_count,
        SUM(CASE WHEN status = 'replied' THEN 1 ELSE 0 END) as replied_count
       FROM inquiries`
    );

    const result = rows as any[];
    return result[0];
  }
}
