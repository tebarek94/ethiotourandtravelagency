import pool from '../config/database';
import { Destination } from '../types';

export class DestinationModel {
  static async create(destinationData: Omit<Destination, 'destination_id' | 'created_at'>): Promise<Destination> {
    const { name, type, description } = destinationData;
    
    const [result] = await pool.execute(
      'INSERT INTO destinations (name, type, description) VALUES (?, ?, ?)',
      [name, type, description]
    );

    const insertResult = result as any;
    const newDestination = await this.findById(insertResult.insertId);
    return newDestination!;
  }

  static async findById(id: number): Promise<Destination | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM destinations WHERE destination_id = ?',
      [id]
    );

    const destinations = rows as Destination[];
    return destinations.length > 0 ? destinations[0] : null;
  }

  static async findAll(): Promise<Destination[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM destinations ORDER BY name ASC'
    );

    return rows as Destination[];
  }

  static async findByType(type: string): Promise<Destination[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM destinations WHERE type = ? ORDER BY name ASC',
      [type]
    );

    return rows as Destination[];
  }

  static async update(id: number, updateData: Partial<Destination>): Promise<Destination | null> {
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
    if (updateData.description !== undefined) {
      fields.push('description = ?');
      values.push(updateData.description);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.execute(
      `UPDATE destinations SET ${fields.join(', ')} WHERE destination_id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute(
      'DELETE FROM destinations WHERE destination_id = ?',
      [id]
    );

    const deleteResult = result as any;
    return deleteResult.affectedRows > 0;
  }
}
