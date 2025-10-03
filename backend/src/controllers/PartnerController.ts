import { Request, Response, NextFunction } from 'express';
import { PartnerService } from '../services/PartnerService';

export class PartnerController {
  static async createPartner(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const partner = await PartnerService.createPartner(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Partner created successfully',
        data: partner
      });
    } catch (error) {
      next(error);
    }
  }

  static async getAllPartners(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const partners = await PartnerService.getAllPartners();
      
      res.json({
        success: true,
        message: 'Partners retrieved successfully',
        data: partners
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPartnerById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const partnerId = parseInt(req.params.id);
      if (isNaN(partnerId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid partner ID'
        });
        return;
      }

      const partner = await PartnerService.getPartnerById(partnerId);
      
      res.json({
        success: true,
        message: 'Partner retrieved successfully',
        data: partner
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePartner(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const partnerId = parseInt(req.params.id);
      if (isNaN(partnerId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid partner ID'
        });
        return;
      }

      const updatedPartner = await PartnerService.updatePartner(partnerId, req.body);
      
      res.json({
        success: true,
        message: 'Partner updated successfully',
        data: updatedPartner
      });
    } catch (error) {
      next(error);
    }
  }

  static async deletePartner(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const partnerId = parseInt(req.params.id);
      if (isNaN(partnerId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid partner ID'
        });
        return;
      }

      await PartnerService.deletePartner(partnerId);
      
      res.json({
        success: true,
        message: 'Partner deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPartnersByType(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { type } = req.query;
      if (!type || typeof type !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Type parameter is required'
        });
        return;
      }

      const partners = await PartnerService.getPartnersByType(type);
      
      res.json({
        success: true,
        message: 'Partners retrieved successfully',
        data: partners
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPartnerStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const stats = await PartnerService.getPartnerStats();
      
      res.json({
        success: true,
        message: 'Partner statistics retrieved successfully',
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }
}
