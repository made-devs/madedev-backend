import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // URL gambar portfolio
    tags: [{ type: String }], // Tag kategori
    link: { type: String, required: true }, // Link ke project (GitHub, demo, dll)
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
