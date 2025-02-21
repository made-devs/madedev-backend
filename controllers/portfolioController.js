import Portfolio from '../models/Portfolio.js';

// ✅ Get all portfolio items
export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find().sort({ createdAt: -1 });
    res.status(200).json(portfolios);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching portfolios', details: error });
  }
};

// ✅ Get single portfolio item by ID
export const getPortfolioById = async (req, res) => {
  try {
    const { id } = req.params;
    const portfolio = await Portfolio.findById(id);

    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.status(200).json(portfolio);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching portfolio', details: error });
  }
};

// ✅ Create new portfolio item
export const createPortfolio = async (req, res) => {
  try {
    const { title, description, image, tags, link } = req.body;

    if (!title || !description || !image || !link) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newPortfolio = new Portfolio({
      title,
      description,
      image,
      tags: tags ? tags.split(',').map((tag) => tag.trim()) : [],
      link,
    });

    await newPortfolio.save();
    res.status(201).json(newPortfolio);
  } catch (error) {
    res.status(500).json({ error: 'Error creating portfolio', details: error });
  }
};

// ✅ Delete portfolio item
export const deletePortfolio = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPortfolio = await Portfolio.findByIdAndDelete(id);

    if (!deletedPortfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }

    res.status(200).json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting portfolio', details: error });
  }
};
