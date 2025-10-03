import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import pool from '../config/database';
import { User, JWTPayload, AuthenticatedRequest } from '../types';

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({ message: 'Access denied. No token provided.' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'supersecretkey') as JWTPayload;
    
    // Get user from database
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE user_id = ?',
      [decoded.userId]
    );

    const users = rows as User[];
    if (users.length === 0) {
      res.status(401).json({ message: 'Invalid token. User not found.' });
      return;
    }

    (req as AuthenticatedRequest).user = users[0];
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

export const roleMiddleware = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const authReq = req as AuthenticatedRequest;
    if (!authReq.user) {
      res.status(401).json({ message: 'Access denied. User not authenticated.' });
      return;
    }

    if (!roles.includes(authReq.user.role)) {
      res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      return;
    }

    next();
  };
};

export const adminMiddleware = roleMiddleware(['admin']);
export const userMiddleware = roleMiddleware(['user', 'admin']);

// Alias for easier imports
export const authenticateToken = authMiddleware;
export const requireAdmin = adminMiddleware;