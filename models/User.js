import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// 🔹 Buat skema User
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] }, // Default user
});

// 🔹 Hash password sebelum disimpan ke database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 🔹 Method untuk membandingkan password saat login
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// 🔹 Buat model User
const User = mongoose.model('User', userSchema);
export default User;
