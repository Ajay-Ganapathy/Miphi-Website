const express = require('express');
const { Blog } = require('../models/models');

const router = express.Router();

// Create a new blog
router.post('/blogs', async (req, res) => {
  try {
    const newBlog = new Blog(req.body);
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author_id');
    res.status(200).json(blogs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
