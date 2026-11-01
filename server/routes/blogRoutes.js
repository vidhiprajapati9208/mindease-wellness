const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');

// GET /api/blogs
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    let query = {};

    if (category && category !== 'All') {
      query.category = { $regex: category, $options: 'i' };
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } }
      ];
    }

    const blogs = await BlogPost.find(query).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({ message: 'Failed to fetch blogs', error: error.message });
  }
});

// GET /api/blogs/:id
router.get('/:id', async (req, res) => {
  try {
    const blog = await BlogPost.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch blog post', error: error.message });
  }
});

// POST /api/blogs
router.post('/', async (req, res) => {
  try {
    const { title, content, author, category, imageUrl, readTime } = req.body;
    if (!title || !content || !author || !category) {
      return res.status(400).json({ message: 'Title, content, author, and category are required.' });
    }

    const newBlog = new BlogPost({
      title,
      content,
      author,
      category,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
      readTime: readTime || '4 min read'
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create blog post', error: error.message });
  }
});

// PUT /api/blogs/:id
router.put('/:id', async (req, res) => {
  try {
    const updated = await BlogPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update blog post', error: error.message });
  }
});

// DELETE /api/blogs/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await BlogPost.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete blog post', error: error.message });
  }
});

module.exports = router;
