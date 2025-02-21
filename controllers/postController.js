import Post from '../models/Post.js';

// **GET All Posts**
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts', details: error });
  }
};

// **CREATE Post**
export const createPost = async (req, res) => {
  try {
    const { title, summary, content, image, tags } = req.body;

    if (!title || !summary || !content || !image) {
      console.error('❌ Validation Error: Missing fields', {
        title,
        summary,
        content,
        image,
      });
      return res.status(400).json({ error: 'All fields are required' });
    }

    const formattedContent = Array.isArray(content)
      ? content
      : content.split('\n').filter((line) => line.trim() !== '');

    const formattedTags = Array.isArray(tags) ? tags : [];

    const newPost = new Post({
      title,
      summary,
      content: formattedContent,
      image,
      tags: formattedTags,
    });

    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    console.error('❌ Server Error saat menyimpan post:', error);
    res
      .status(500)
      .json({ error: 'Error creating post', details: error.message });
  }
};

// **GET Single Post by ID**
export const getPostById = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post', details: error });
  }
};

export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { name, content } = req.body; // 🔹 Terima name dari frontend

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = {
      name: name || 'Anonymous', // 🔹 Jika tidak ada nama, gunakan default
      content,
      createdAt: new Date(),
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment); // 🔹 Kirim data komentar ke frontend
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment', details: error });
  }
};

// 🔹 Ambil semua komentar dari post tertentu
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.status(200).json(post.comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments', details: error });
  }
};
