import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { validateUserRegistration, validateUserLogin } from '../middlewares/validation';

const router = Router();

// POST /api/auth/register
router.post('/register', validateUserRegistration, UserController.register);

// POST /api/auth/login
router.post('/login', validateUserLogin, UserController.login);

export default router;
