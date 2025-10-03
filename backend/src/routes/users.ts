import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { adminMiddleware, authMiddleware } from '../middlewares/auth';
import { validateUserUpdate } from '../middlewares/validation';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// GET /api/users - List all users (admin only)
router.get('/', adminMiddleware, UserController.getAllUsers);

// GET /api/users/:id - Get single user
router.get('/:id', UserController.getUserById);

// PUT /api/users/:id - Update user
router.put('/:id', validateUserUpdate, UserController.updateUser);

// DELETE /api/users/:id - Delete user (admin only)
router.delete('/:id', adminMiddleware, UserController.deleteUser);

export default router;
