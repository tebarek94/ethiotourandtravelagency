import { Router } from 'express';
import { InquiryController } from '../controllers/ContentController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import { validateInquiry } from '../middlewares/validation';

const router = Router();

// Public routes (no authentication required)
// POST /api/inquiries - Submit inquiry
router.post('/', validateInquiry, InquiryController.createInquiry);

// Admin routes (require authentication and admin role)
router.use(authMiddleware);
router.use(adminMiddleware);

// GET /api/inquiries - View all inquiries (admin)
router.get('/', InquiryController.getAllInquiries);

// GET /api/inquiries/stats - Get inquiry statistics (admin)
router.get('/stats', InquiryController.getInquiryStats);

// GET /api/inquiries/status/:status - Get inquiries by status (admin)
router.get('/status/:status', InquiryController.getInquiriesByStatus);

// GET /api/inquiries/:id - Get inquiry by ID (admin)
router.get('/:id', InquiryController.getInquiryById);

// PUT /api/inquiries/:id - Update inquiry (admin)
router.put('/:id', InquiryController.updateInquiry);

// DELETE /api/inquiries/:id - Delete inquiry (admin)
router.delete('/:id', InquiryController.deleteInquiry);

export default router;
