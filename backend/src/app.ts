import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import packageRoutes from './routes/packages';
import destinationRoutes from './routes/destinations';
import bookingRoutes from './routes/bookings';
import articleRoutes from './routes/articles';
import inquiryRoutes from './routes/inquiries';
import partnerRoutes from './routes/partners';
import adminRoutes from './routes/admin';

// Import middleware
import { errorHandler, notFound } from './middlewares/errorHandler';

// Load environment variables
dotenv.config();

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'Zad Travel Agency API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/partners', partnerRoutes);
app.use('/api/admin', adminRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Zad Travel Agency API',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Register a new user',
        'POST /api/auth/login': 'Login user'
      },
      users: {
        'GET /api/users': 'Get all users (admin only)',
        'GET /api/users/:id': 'Get user by ID',
        'PUT /api/users/:id': 'Update user',
        'DELETE /api/users/:id': 'Delete user (admin only)'
      },
      packages: {
        'GET /api/packages': 'Get all packages',
        'GET /api/packages/:id': 'Get package by ID',
        'POST /api/packages': 'Create package (admin only)',
        'PUT /api/packages/:id': 'Update package (admin only)',
        'DELETE /api/packages/:id': 'Delete package (admin only)'
      },
      destinations: {
        'GET /api/destinations': 'Get all destinations',
        'GET /api/destinations/:id': 'Get destination by ID',
        'POST /api/destinations': 'Create destination (admin only)',
        'PUT /api/destinations/:id': 'Update destination (admin only)',
        'DELETE /api/destinations/:id': 'Delete destination (admin only)'
      },
      bookings: {
        'GET /api/bookings': 'Get bookings (user: own, admin: all)',
        'GET /api/bookings/:id': 'Get booking by ID',
        'POST /api/bookings': 'Create booking (user only)',
        'PUT /api/bookings/:id': 'Update booking (admin only)',
        'DELETE /api/bookings/:id': 'Delete booking'
      },
      articles: {
        'GET /api/articles': 'Get all articles',
        'GET /api/articles/slug/:slug': 'Get article by slug',
        'GET /api/articles/id/:id': 'Get article by ID',
        'POST /api/articles': 'Create article (admin only)',
        'PUT /api/articles/:id': 'Update article (admin only)',
        'DELETE /api/articles/:id': 'Delete article (admin only)'
      },
      inquiries: {
        'POST /api/inquiries': 'Submit inquiry',
        'GET /api/inquiries': 'Get all inquiries (admin only)',
        'GET /api/inquiries/:id': 'Get inquiry by ID (admin only)',
        'PUT /api/inquiries/:id': 'Update inquiry (admin only)',
        'DELETE /api/inquiries/:id': 'Delete inquiry (admin only)'
      },
      partners: {
        'GET /api/partners': 'Get all partners',
        'GET /api/partners/:id': 'Get partner by ID',
        'POST /api/partners': 'Create partner (admin only)',
        'PUT /api/partners/:id': 'Update partner (admin only)',
        'DELETE /api/partners/:id': 'Delete partner (admin only)'
      }
    }
  });
});

// 404 handler
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

export default app;
