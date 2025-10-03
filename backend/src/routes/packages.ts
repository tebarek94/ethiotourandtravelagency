import { Router } from 'express';
import { PackageController, DestinationController } from '../controllers/PackageController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import { validatePackage } from '../middlewares/validation';

const router = Router();

// Public routes (no authentication required)
// GET /api/packages - List all travel packages
router.get('/', PackageController.getAllPackages);

// GET /api/packages/:id - Get package details
router.get('/:id', PackageController.getPackageById);

// GET /api/packages/:id/destinations - Get package destinations
router.get('/:id/destinations', PackageController.getPackageDestinations);

// Admin routes (require authentication and admin role)
router.use(authMiddleware);
router.use(adminMiddleware);

// POST /api/packages - Add new package (admin)
router.post('/', validatePackage, PackageController.createPackage);

// PUT /api/packages/:id - Update package (admin)
router.put('/:id', validatePackage, PackageController.updatePackage);

// DELETE /api/packages/:id - Delete package (admin)
router.delete('/:id', PackageController.deletePackage);

// POST /api/packages/:id/destinations - Add destination to package (admin)
router.post('/:id/destinations', PackageController.addDestinationToPackage);

// DELETE /api/packages/:id/destinations/:destinationId - Remove destination from package (admin)
router.delete('/:id/destinations/:destinationId', PackageController.removeDestinationFromPackage);

export default router;
