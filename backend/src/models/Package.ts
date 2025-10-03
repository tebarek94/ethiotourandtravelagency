import pool from '../config/database';
import { Package, CreatePackageRequest } from '../types';

export class PackageModel {
  static async create(packageData: CreatePackageRequest): Promise<Package> {
    const { name, description, duration_days, nights, price, type, rating = 0 } = packageData;
    
    const [result] = await pool.execute(
      'INSERT INTO packages (name, description, duration_days, nights, price, type, rating) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, description, duration_days, nights, price, type, rating]
    );

    const insertResult = result as any;
    const newPackage = await this.findById(insertResult.insertId);
    return newPackage!;
  }

  static async findById(id: number): Promise<Package | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM packages WHERE package_id = ?',
      [id]
    );

    const packages = rows as Package[];
    return packages.length > 0 ? packages[0] : null;
  }

  static async findAll(): Promise<Package[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM packages ORDER BY created_at DESC'
    );

    return rows as Package[];
  }

  static async findByType(type: string): Promise<Package[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM packages WHERE type = ? ORDER BY created_at DESC',
      [type]
    );

    return rows as Package[];
  }

  static async update(id: number, updateData: Partial<Package>): Promise<Package | null> {
    const fields = [];
    const values = [];

    if (updateData.name !== undefined) {
      fields.push('name = ?');
      values.push(updateData.name);
    }
    if (updateData.description !== undefined) {
      fields.push('description = ?');
      values.push(updateData.description);
    }
    if (updateData.duration_days !== undefined) {
      fields.push('duration_days = ?');
      values.push(updateData.duration_days);
    }
    if (updateData.nights !== undefined) {
      fields.push('nights = ?');
      values.push(updateData.nights);
    }
    if (updateData.price !== undefined) {
      fields.push('price = ?');
      values.push(updateData.price);
    }
    if (updateData.type !== undefined) {
      fields.push('type = ?');
      values.push(updateData.type);
    }
    if (updateData.rating !== undefined) {
      fields.push('rating = ?');
      values.push(updateData.rating);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.execute(
      `UPDATE packages SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE package_id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute(
      'DELETE FROM packages WHERE package_id = ?',
      [id]
    );

    const deleteResult = result as any;
    return deleteResult.affectedRows > 0;
  }

  static async addDestination(packageId: number, destinationId: number): Promise<void> {
    await pool.execute(
      'INSERT INTO package_destinations (package_id, destination_id) VALUES (?, ?)',
      [packageId, destinationId]
    );
  }

  static async removeDestination(packageId: number, destinationId: number): Promise<void> {
    await pool.execute(
      'DELETE FROM package_destinations WHERE package_id = ? AND destination_id = ?',
      [packageId, destinationId]
    );
  }

  static async getDestinations(packageId: number): Promise<any[]> {
    const [rows] = await pool.execute(
      `SELECT d.* FROM destinations d 
       INNER JOIN package_destinations pd ON d.destination_id = pd.destination_id 
       WHERE pd.package_id = ?`,
      [packageId]
    );

    return rows as any[];
  }
}
