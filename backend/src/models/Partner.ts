import pool from '../config/database';
import { Partner, CreatePartnerRequest } from '../types';

export class PartnerModel {
  static async create(partnerData: CreatePartnerRequest): Promise<Partner> {
    const { name, type, contact_info, description } = partnerData;
    
    const [result] = await pool.execute(
      'INSERT INTO partners (name, type, contact_info, description) VALUES (?, ?, ?, ?)',
      [name, type, contact_info, description]
    );

    const insertResult = result as any;
    const newPartner = await this.findById(insertResult.insertId);
    return newPartner!;
  }

  static async findById(id: number): Promise<Partner | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM partners WHERE partner_id = ?',
      [id]
    );

    const partners = rows as Partner[];
    return partners.length > 0 ? partners[0] : null;
  }

  static async findAll(): Promise<Partner[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM partners ORDER BY name ASC'
    );

    return rows as Partner[];
  }

  static async findByType(type: string): Promise<Partner[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM partners WHERE type = ? ORDER BY name ASC',
      [type]
    );

    return rows as Partner[];
  }

  static async update(id: number, updateData: Partial<Partner>): Promise<Partner | null> {
    const fields = [];
    const values = [];

    if (updateData.name !== undefined) {
      fields.push('name = ?');
      values.push(updateData.name);
    }
    if (updateData.type !== undefined) {
      fields.push('type = ?');
      values.push(updateData.type);
    }
    if (updateData.contact_info !== undefined) {
      fields.push('contact_info = ?');
      values.push(updateData.contact_info);
    }
    if (updateData.description !== undefined) {
      fields.push('description = ?');
      values.push(updateData.description);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.execute(
      `UPDATE partners SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE partner_id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute(
      'DELETE FROM partners WHERE partner_id = ?',
      [id]
    );

    const deleteResult = result as any;
    return deleteResult.affectedRows > 0;
  }

  static async getStats(): Promise<any> {
    const [rows] = await pool.execute(
      `SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN type = 'airline' THEN 1 ELSE 0 END) as airline_count,
        SUM(CASE WHEN type = 'hotel' THEN 1 ELSE 0 END) as hotel_count,
        SUM(CASE WHEN type = 'transport' THEN 1 ELSE 0 END) as transport_count,
        SUM(CASE WHEN type = 'other' THEN 1 ELSE 0 END) as other_count
       FROM partners`
    );

    const result = rows as any[];
    return result[0];
  }
}
