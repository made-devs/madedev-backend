import express from 'express';
import {
  getAllPosts,
  createPost,
  getPostById,
  addComment,
  getComments,
} from '../controllers/postController.js';

const router = express.Router();

// **GET All Posts**
router.get('/', getAllPosts);

// **CREATE Post**
router.post('/', createPost);

// **GET Single Post by ID**
router.get('/:postId', getPostById);

router.post('/:postId/comments', addComment);

// 🔹 Ambil komentar berdasarkan ID post
router.get('/:postId/comments', getComments);

export default router;
