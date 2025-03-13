import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  console.log('🔍 Checking Authentication...'); // Debugging
  console.log('🔍 Cookies:', req.cookies); // Cek apakah token ada di cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
