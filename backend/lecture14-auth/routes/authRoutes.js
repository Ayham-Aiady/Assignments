import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import { authenticate } from '../middleware/auth.js';
import {
  googleAuth,
  googleCallback,
  getCurrentUser,
  logout,
  refreshToken
} from '../controllers/authController.js';
import { isAuthenticated, authenticateJWT } from '../middleware/auth.js';

const router = Router();

// Google OAuth routes
router.get('/google', googleAuth);
router.get('/google/callback', googleCallback);


// User authentication routes
router.get('/user', isAuthenticated, getCurrentUser);
router.post('/logout', isAuthenticated, logout);
router.post('/refresh', refreshToken);


// JWT protected route example
router.get('/protected', authenticateJWT, (req, res) => {
  res.json({
    success: true,
    message: 'This is a protected route',
    user: req.user
  });
});

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authenticate, AuthController.getMe);
router.put('/change-password', authenticate, AuthController.changePassword);

export default router;