import { Request, Response } from 'express';
import { AdminService } from '../services/AdminService';
import { createError } from '../middlewares/errorHandler';

export class AdminController {
  // Dashboard Statistics
  static async getDashboardStats(req: Request, res: Response): Promise<void> {
    try {
      const stats = await AdminService.getDashboardStats();
      res.json({
        success: true,
        message: 'Dashboard statistics retrieved successfully',
        data: stats
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Failed to retrieve dashboard statistics'
      });
    }
  }

  // User Management
  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, search = '', role = '' } = req.query;
      const users = await AdminService.getAllUsers({
        page: Number(page),
        limit: Number(limit),
        search: search as string,
        role: role as string
      });
      res.json({
        success: true,
        message: 'Users retrieved successfully',
        data: users
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Failed to retrieve users'
      });
    }
  }

  static async updateUserRole(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { role } = req.body;
      const user = await AdminService.updateUserRole(Number(id), role);
      res.json({
        success: true,
        message: 'User role updated successfully',
        data: user
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Failed to update user role'
      });
    }
  }

  // Booking Management
  static async getAllBookings(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, status = '', search = '' } = req.query;
      const bookings = await AdminService.getAllBookings({
        page: Number(page),
        limit: Number(limit),
        status: status as string,
        search: search as string
      });
      res.json({
        success: true,
        message: 'Bookings retrieved successfully',
        data: bookings
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Failed to retrieve bookings'
      });
    }
  }

  static async updateBookingStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const booking = await AdminService.updateBookingStatus(Number(id), status);
      res.json({
        success: true,
        message: 'Booking status updated successfully',
        data: booking
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Failed to update booking status'
      });
    }
  }

  // Package Management
  static async getAllPackages(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, type = '', search = '' } = req.query;
      const packages = await AdminService.getAllPackages({
        page: Number(page),
        limit: Number(limit),
        type: type as string,
        search: search as string
      });
      res.json({
        success: true,
        message: 'Packages retrieved successfully',
        data: packages
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Failed to retrieve packages'
      });
    }
  }

  // Inquiry Management
  static async getAllInquiries(req: Request, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10, status = '', search = '' } = req.query;
      const inquiries = await AdminService.getAllInquiries({
        page: Number(page),
        limit: Number(limit),
        status: status as string,
        search: search as string
      });
      res.json({
        success: true,
        message: 'Inquiries retrieved successfully',
        data: inquiries
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Failed to retrieve inquiries'
      });
    }
  }

  static async updateInquiryStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const inquiry = await AdminService.updateInquiryStatus(Number(id), status);
      res.json({
        success: true,
        message: 'Inquiry status updated successfully',
        data: inquiry
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Failed to update inquiry status'
      });
    }
  }

  // Analytics
  static async getAnalytics(req: Request, res: Response): Promise<void> {
    try {
      const { period = '30d' } = req.query;
      const analytics = await AdminService.getAnalytics(period as string);
      res.json({
        success: true,
        message: 'Analytics retrieved successfully',
        data: analytics
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Failed to retrieve analytics'
      });
    }
  }

  // Revenue Reports
  static async getRevenueReport(req: Request, res: Response): Promise<void> {
    try {
      const { startDate, endDate, groupBy = 'month' } = req.query;
      const report = await AdminService.getRevenueReport({
        startDate: startDate as string,
        endDate: endDate as string,
        groupBy: groupBy as string
      });
      res.json({
        success: true,
        message: 'Revenue report retrieved successfully',
        data: report
      });
    } catch (error: any) {
      res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Failed to retrieve revenue report'
      });
    }
  }
}
