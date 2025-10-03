import { ArticleModel } from '../models/Article';
import { InquiryModel } from '../models/Inquiry';
import { Article, CreateArticleRequest, Inquiry, CreateInquiryRequest } from '../types';
import { createError } from '../middlewares/errorHandler';

export class ArticleService {
  static async createArticle(articleData: CreateArticleRequest): Promise<Article> {
    // Check if slug already exists
    const existingArticle = await ArticleModel.findBySlug(articleData.slug);
    if (existingArticle) {
      throw createError('Slug already exists', 400);
    }

    return ArticleModel.create(articleData);
  }

  static async getAllArticles(): Promise<Article[]> {
    return ArticleModel.findAll();
  }

  static async getArticleById(id: number): Promise<Article> {
    const article = await ArticleModel.findById(id);
    if (!article) {
      throw createError('Article not found', 404);
    }
    return article;
  }

  static async getArticleBySlug(slug: string): Promise<Article> {
    const article = await ArticleModel.findBySlug(slug);
    if (!article) {
      throw createError('Article not found', 404);
    }
    return article;
  }

  static async updateArticle(id: number, updateData: Partial<Article>): Promise<Article> {
    const existingArticle = await ArticleModel.findById(id);
    if (!existingArticle) {
      throw createError('Article not found', 404);
    }

    // Check if slug is being updated and if it already exists
    if (updateData.slug && updateData.slug !== existingArticle.slug) {
      const slugExists = await ArticleModel.slugExists(updateData.slug, id);
      if (slugExists) {
        throw createError('Slug already exists', 400);
      }
    }

    const updatedArticle = await ArticleModel.update(id, updateData);
    if (!updatedArticle) {
      throw createError('Failed to update article', 500);
    }

    return updatedArticle;
  }

  static async deleteArticle(id: number): Promise<void> {
    const existingArticle = await ArticleModel.findById(id);
    if (!existingArticle) {
      throw createError('Article not found', 404);
    }

    const deleted = await ArticleModel.delete(id);
    if (!deleted) {
      throw createError('Failed to delete article', 500);
    }
  }
}

export class InquiryService {
  static async createInquiry(inquiryData: CreateInquiryRequest): Promise<Inquiry> {
    return InquiryModel.create(inquiryData);
  }

  static async getAllInquiries(): Promise<Inquiry[]> {
    return InquiryModel.findAll();
  }

  static async getInquiryById(id: number): Promise<Inquiry> {
    const inquiry = await InquiryModel.findById(id);
    if (!inquiry) {
      throw createError('Inquiry not found', 404);
    }
    return inquiry;
  }

  static async updateInquiry(id: number, updateData: Partial<Inquiry>): Promise<Inquiry> {
    const existingInquiry = await InquiryModel.findById(id);
    if (!existingInquiry) {
      throw createError('Inquiry not found', 404);
    }

    const updatedInquiry = await InquiryModel.update(id, updateData);
    if (!updatedInquiry) {
      throw createError('Failed to update inquiry', 500);
    }

    return updatedInquiry;
  }

  static async deleteInquiry(id: number): Promise<void> {
    const existingInquiry = await InquiryModel.findById(id);
    if (!existingInquiry) {
      throw createError('Inquiry not found', 404);
    }

    const deleted = await InquiryModel.delete(id);
    if (!deleted) {
      throw createError('Failed to delete inquiry', 500);
    }
  }

  static async getInquiriesByStatus(status: string): Promise<Inquiry[]> {
    return InquiryModel.findByStatus(status);
  }

  static async getInquiryStats(): Promise<any> {
    return InquiryModel.getStats();
  }
}
