import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import postRoutes from './routes/postRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error(
    '❌ MongoDB URI is missing! Set MONGO_URI in Railway Variables.'
  );
  process.exit(1); // Hentikan server jika tidak ada URI
}

const allowedOrigins = [
  'http://localhost:3000',
  'https://madedev-frontend.vercel.app', // Ganti dengan domain frontend Vercel kamu
  'https://madedev.id',
];

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
  });

app.use('/api/posts', postRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/auth', userRoutes);

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

console.log('🔍 JWT_SECRET:', process.env.JWT_SECRET);
