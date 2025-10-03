import express from 'express';
import { AdminController } from '../controllers/AdminController';
import { authenticateToken } from '../middlewares/auth';
import { requireAdmin } from '../middlewares/auth';

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(requireAdmin);

// Dashboard Statistics
router.get('/dashboard/stats', AdminController.getDashboardStats);

// User Management
router.get('/users', AdminController.getAllUsers);
router.put('/users/:id/role', AdminController.updateUserRole);

// Booking Management
router.get('/bookings', AdminController.getAllBookings);
router.put('/bookings/:id/status', AdminController.updateBookingStatus);

// Package Management
router.get('/packages', AdminController.getAllPackages);

// Inquiry Management
router.get('/inquiries', AdminController.getAllInquiries);
router.put('/inquiries/:id/status', AdminController.updateInquiryStatus);

// Analytics
router.get('/analytics', AdminController.getAnalytics);

// Revenue Reports
router.get('/revenue', AdminController.getRevenueReport);

export default router;
