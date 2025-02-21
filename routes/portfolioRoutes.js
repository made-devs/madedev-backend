import express from 'express';
import {
  getAllPortfolios,
  getPortfolioById,
  createPortfolio,
  deletePortfolio,
} from '../controllers/portfolioController.js';

const router = express.Router();

router.get('/', getAllPortfolios); // Get all portfolio items
router.get('/:id', getPortfolioById); // Get single portfolio item
router.post('/', createPortfolio); // Create new portfolio
router.delete('/:id', deletePortfolio); // Delete portfolio item

export default router;
