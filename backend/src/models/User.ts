import pool from '../config/database';
import { User, CreateUserData } from '../types';

export class UserModel {
  static async create(userData: CreateUserData): Promise<User> {
    try {
      const { name, email, phone, password_hash, role = 'user' } = userData;
      
      console.log('UserModel.create called with:', { name, email, phone, role, password_hash: '[HIDDEN]' });
      
      const [result] = await pool.execute(
        'INSERT INTO users (name, email, phone, password_hash, role) VALUES (?, ?, ?, ?, ?)',
        [name, email, phone, password_hash, role]
      );

      const insertResult = result as any;
      console.log('User inserted with ID:', insertResult.insertId);
      
      const newUser = await this.findById(insertResult.insertId);
      if (!newUser) {
        throw new Error('Failed to retrieve created user');
      }
      
      console.log('User retrieved successfully:', { user_id: newUser.user_id, email: newUser.email });
      return newUser;
    } catch (error) {
      console.error('UserModel.create error:', error);
      throw error;
    }
  }

  static async findById(id: number): Promise<User | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE user_id = ?',
      [id]
    );

    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  }

  static async findByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    const users = rows as User[];
    return users.length > 0 ? users[0] : null;
  }

  static async findAll(): Promise<User[]> {
    const [rows] = await pool.execute(
      'SELECT user_id, name, email, phone, role, created_at, updated_at FROM users ORDER BY created_at DESC'
    );

    return rows as User[];
  }

  static async update(id: number, updateData: Partial<User>): Promise<User | null> {
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
    if (updateData.password_hash !== undefined) {
      fields.push('password_hash = ?');
      values.push(updateData.password_hash);
    }
    if (updateData.role !== undefined) {
      fields.push('role = ?');
      values.push(updateData.role);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.execute(
      `UPDATE users SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE user_id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute(
      'DELETE FROM users WHERE user_id = ?',
      [id]
    );

    const deleteResult = result as any;
    return deleteResult.affectedRows > 0;
  }

  static async emailExists(email: string, excludeId?: number): Promise<boolean> {
    let query = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
    const params: any[] = [email];

    if (excludeId) {
      query += ' AND user_id != ?';
      params.push(excludeId);
    }

    const [rows] = await pool.execute(query, params);
    const result = rows as any[];
    return result[0].count > 0;
  }
}
