import { Request, Response, NextFunction } from 'express';
import { ArticleService, InquiryService } from '../services/ContentService';

export class ArticleController {
  static async createArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const article = await ArticleService.createArticle(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Article created successfully',
        data: article
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllArticles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const articles = await ArticleService.getAllArticles();
      
      res.json({
        success: true,
        message: 'Articles retrieved successfully',
        data: articles
      });
    } catch (error) {
      next(error);
    }
  }

  static async getArticleById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const articleId = parseInt(req.params.id);
      if (isNaN(articleId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid article ID'
        });
        return;
      }

      const article = await ArticleService.getArticleById(articleId);
      
      res.json({
        success: true,
        message: 'Article retrieved successfully',
        data: article
      });
    } catch (error) {
      next(error);
    }
  }

  static async getArticleBySlug(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { slug } = req.params;
      if (!slug) {
        res.status(400).json({
          success: false,
          message: 'Slug parameter is required'
        });
        return;
      }

      const article = await ArticleService.getArticleBySlug(slug);
      
      res.json({
        success: true,
        message: 'Article retrieved successfully',
        data: article
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const articleId = parseInt(req.params.id);
      if (isNaN(articleId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid article ID'
        });
        return;
      }

      const updatedArticle = await ArticleService.updateArticle(articleId, req.body);
      
      res.json({
        success: true,
        message: 'Article updated successfully',
        data: updatedArticle
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteArticle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const articleId = parseInt(req.params.id);
      if (isNaN(articleId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid article ID'
        });
        return;
      }

      await ArticleService.deleteArticle(articleId);
      
      res.json({
        success: true,
        message: 'Article deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
}

export class InquiryController {
  static async createInquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const inquiry = await InquiryService.createInquiry(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Inquiry submitted successfully',
        data: inquiry
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllInquiries(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const inquiries = await InquiryService.getAllInquiries();
      
      res.json({
        success: true,
        message: 'Inquiries retrieved successfully',
        data: inquiries
      });
    } catch (error) {
      next(error);
    }
  }

  static async getInquiryById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const inquiryId = parseInt(req.params.id);
      if (isNaN(inquiryId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid inquiry ID'
        });
        return;
      }

      const inquiry = await InquiryService.getInquiryById(inquiryId);
      
      res.json({
        success: true,
        message: 'Inquiry retrieved successfully',
        data: inquiry
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateInquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const inquiryId = parseInt(req.params.id);
      if (isNaN(inquiryId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid inquiry ID'
        });
        return;
      }

      const updatedInquiry = await InquiryService.updateInquiry(inquiryId, req.body);
      
      res.json({
        success: true,
        message: 'Inquiry updated successfully',
        data: updatedInquiry
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteInquiry(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const inquiryId = parseInt(req.params.id);
      if (isNaN(inquiryId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid inquiry ID'
        });
        return;
      }

      await InquiryService.deleteInquiry(inquiryId);
      
      res.json({
        success: true,
        message: 'Inquiry deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async getInquiriesByStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { status } = req.query;
      if (!status || typeof status !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Status parameter is required'
        });
        return;
      }

      const inquiries = await InquiryService.getInquiriesByStatus(status);
      
      res.json({
        success: true,
        message: 'Inquiries retrieved successfully',
        data: inquiries
      });
    } catch (error) {
      next(error);
    }
  }

  static async getInquiryStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await InquiryService.getInquiryStats();
      
      res.json({
        success: true,
        message: 'Inquiry statistics retrieved successfully',
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }
}
