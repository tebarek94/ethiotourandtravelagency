import pool from '../config/database';

export interface Document {
  document_id: number;
  booking_id: number;
  file_name: string;
  original_name: string;
  file_path: string;
  file_type: 'passport' | 'visa' | 'photo' | 'other';
  file_size: number;
  mime_type: string;
  created_at: string;
  updated_at: string;
}

export interface CreateDocumentData {
  booking_id: number;
  file_name: string;
  original_name: string;
  file_path: string;
  file_type: 'passport' | 'visa' | 'photo' | 'other';
  file_size: number;
  mime_type: string;
}

export class DocumentModel {
  static async create(documentData: CreateDocumentData): Promise<Document> {
    const { booking_id, file_name, original_name, file_path, file_type, file_size, mime_type } = documentData;
    
    const [result] = await pool.execute(
      'INSERT INTO documents (booking_id, file_name, original_name, file_path, file_type, file_size, mime_type) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [booking_id, file_name, original_name, file_path, file_type, file_size, mime_type]
    );

    const insertResult = result as any;
    const newDocument = await this.findById(insertResult.insertId);
    return newDocument!;
  }

  static async findById(id: number): Promise<Document | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM documents WHERE document_id = ?',
      [id]
    );

    const documents = rows as Document[];
    return documents.length > 0 ? documents[0] : null;
  }

  static async findByBookingId(bookingId: number): Promise<Document[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM documents WHERE booking_id = ? ORDER BY created_at DESC',
      [bookingId]
    );

    return rows as Document[];
  }

  static async findByBookingIdAndType(bookingId: number, fileType: string): Promise<Document[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM documents WHERE booking_id = ? AND file_type = ? ORDER BY created_at DESC',
      [bookingId, fileType]
    );

    return rows as Document[];
  }

  static async update(id: number, updateData: Partial<Document>): Promise<Document | null> {
    const fields = [];
    const values = [];

    if (updateData.file_name !== undefined) {
      fields.push('file_name = ?');
      values.push(updateData.file_name);
    }
    if (updateData.original_name !== undefined) {
      fields.push('original_name = ?');
      values.push(updateData.original_name);
    }
    if (updateData.file_path !== undefined) {
      fields.push('file_path = ?');
      values.push(updateData.file_path);
    }
    if (updateData.file_type !== undefined) {
      fields.push('file_type = ?');
      values.push(updateData.file_type);
    }
    if (updateData.file_size !== undefined) {
      fields.push('file_size = ?');
      values.push(updateData.file_size);
    }
    if (updateData.mime_type !== undefined) {
      fields.push('mime_type = ?');
      values.push(updateData.mime_type);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.execute(
      `UPDATE documents SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE document_id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute(
      'DELETE FROM documents WHERE document_id = ?',
      [id]
    );

    const deleteResult = result as any;
    return deleteResult.affectedRows > 0;
  }

  static async deleteByBookingId(bookingId: number): Promise<boolean> {
    const [result] = await pool.execute(
      'DELETE FROM documents WHERE booking_id = ?',
      [bookingId]
    );

    const deleteResult = result as any;
    return deleteResult.affectedRows > 0;
  }
}
