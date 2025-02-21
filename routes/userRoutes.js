import express from 'express';
import {
  register,
  login,
  getMe,
  logout,
} from '../controllers/userController.js';
import { check } from 'express-validator';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

// 🔹 Register Route
router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],
  register
);

// 🔹 Login Route
router.post(
  '/login',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty(),
  ],
  login
);

// 🔹 Logout Route
router.post('/logout', logout);

// 🔹 Get Current User (Protected)
router.get('/me', authMiddleware, getMe);

export default router;
