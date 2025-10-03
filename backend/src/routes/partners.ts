import { Router } from 'express';
import { PartnerController } from '../controllers/PartnerController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router = Router();

// Public routes (no authentication required)
// GET /api/partners - List all partners
router.get('/', PartnerController.getAllPartners);

// GET /api/partners/type/:type - Get partners by type
router.get('/type/:type', PartnerController.getPartnersByType);

// GET /api/partners/:id - Get partner by ID
router.get('/:id', PartnerController.getPartnerById);

// Admin routes (require authentication and admin role)
router.use(authMiddleware);
router.use(adminMiddleware);

// POST /api/partners - Add partner (admin)
router.post('/', PartnerController.createPartner);

// PUT /api/partners/:id - Update partner (admin)
router.put('/:id', PartnerController.updatePartner);

// DELETE /api/partners/:id - Delete partner (admin)
router.delete('/:id', PartnerController.deletePartner);

// GET /api/partners/stats - Get partner statistics (admin)
router.get('/stats', PartnerController.getPartnerStats);

export default router;
