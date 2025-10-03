import { Router } from 'express';
import { ArticleController } from '../controllers/ContentController';
import { authMiddleware, adminMiddleware } from '../middlewares/auth';
import { validateArticle } from '../middlewares/validation';

const router = Router();

// Public routes (no authentication required)
// GET /api/articles - List all articles
router.get('/', ArticleController.getAllArticles);

// GET /api/articles/:slug - Get article by slug
router.get('/slug/:slug', ArticleController.getArticleBySlug);

// GET /api/articles/id/:id - Get article by ID
router.get('/id/:id', ArticleController.getArticleById);

// Admin routes (require authentication and admin role)
router.use(authMiddleware);
router.use(adminMiddleware);

// POST /api/articles - Add new article (admin)
router.post('/', validateArticle, ArticleController.createArticle);

// PUT /api/articles/:id - Update article (admin)
router.put('/:id', validateArticle, ArticleController.updateArticle);

// DELETE /api/articles/:id - Delete article (admin)
router.delete('/:id', ArticleController.deleteArticle);

export default router;
