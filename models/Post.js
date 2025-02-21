import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true }, // 🔹 Nama user yang berkomentar
  content: { type: String, required: true }, // 🔹 Isi komentar
  createdAt: { type: Date, default: Date.now }, // 🔹 Timestamp komentar
});

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: [{ type: String, required: true }], // ✅ Ubah dari String ke Array of Strings
    summary: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{ type: String }],
    comments: [commentSchema],
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;
