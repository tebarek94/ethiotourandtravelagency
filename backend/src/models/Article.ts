import pool from '../config/database';
import { Article, CreateArticleRequest } from '../types';

export class ArticleModel {
  static async create(articleData: CreateArticleRequest): Promise<Article> {
    const { title, slug, content, author } = articleData;
    
    const [result] = await pool.execute(
      'INSERT INTO articles (title, slug, content, author) VALUES (?, ?, ?, ?)',
      [title, slug, content, author]
    );

    const insertResult = result as any;
    const newArticle = await this.findById(insertResult.insertId);
    return newArticle!;
  }

  static async findById(id: number): Promise<Article | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM articles WHERE article_id = ?',
      [id]
    );

    const articles = rows as Article[];
    return articles.length > 0 ? articles[0] : null;
  }

  static async findBySlug(slug: string): Promise<Article | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM articles WHERE slug = ?',
      [slug]
    );

    const articles = rows as Article[];
    return articles.length > 0 ? articles[0] : null;
  }

  static async findAll(): Promise<Article[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM articles ORDER BY published_date DESC'
    );

    return rows as Article[];
  }

  static async update(id: number, updateData: Partial<Article>): Promise<Article | null> {
    const fields = [];
    const values = [];

    if (updateData.title !== undefined) {
      fields.push('title = ?');
      values.push(updateData.title);
    }
    if (updateData.slug !== undefined) {
      fields.push('slug = ?');
      values.push(updateData.slug);
    }
    if (updateData.content !== undefined) {
      fields.push('content = ?');
      values.push(updateData.content);
    }
    if (updateData.author !== undefined) {
      fields.push('author = ?');
      values.push(updateData.author);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await pool.execute(
      `UPDATE articles SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE article_id = ?`,
      values
    );

    return this.findById(id);
  }

  static async delete(id: number): Promise<boolean> {
    const [result] = await pool.execute(
      'DELETE FROM articles WHERE article_id = ?',
      [id]
    );

    const deleteResult = result as any;
    return deleteResult.affectedRows > 0;
  }

  static async slugExists(slug: string, excludeId?: number): Promise<boolean> {
    let query = 'SELECT COUNT(*) as count FROM articles WHERE slug = ?';
    const params: any[] = [slug];

    if (excludeId) {
      query += ' AND article_id != ?';
      params.push(excludeId);
    }

    const [rows] = await pool.execute(query, params);
    const result = rows as any[];
    return result[0].count > 0;
  }
}
