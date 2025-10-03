import { Router } from 'express';
import { DestinationController } from '../controllers/PackageController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';

const router = Router();

// Public routes (no authentication required)
// GET /api/destinations - List destinations
router.get('/', DestinationController.getAllDestinations);

// GET /api/destinations/:id - Get destination by ID
router.get('/:id', DestinationController.getDestinationById);

// GET /api/destinations/type/:type - Get destinations by type
router.get('/type/:type', DestinationController.getDestinationsByType);

// Admin routes (require authentication and admin role)
router.use(authMiddleware);
router.use(adminMiddleware);

// POST /api/destinations - Add destination (admin)
router.post('/', DestinationController.createDestination);

// PUT /api/destinations/:id - Update destination (admin)
router.put('/:id', DestinationController.updateDestination);

// DELETE /api/destinations/:id - Delete destination (admin)
router.delete('/:id', DestinationController.deleteDestination);

export default router;
