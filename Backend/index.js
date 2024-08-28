const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Ensure /uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Set up MySQL connection using promises
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'blogDB',
});

// Route to handle login
app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE name = ? AND password = ?';
    const [rows] = await db.execute(query, [name, password]);

    console.log(name , password)

    if (rows.length > 0) {
      res.status(200).send({ message: 'Login successful' });
    } else {
      res.status(401).send({ message: 'Invalid name or password' });
    }
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).send({ message: 'Server error' });
  }
});

// Route to handle blog creation
app.post('/blogs', multer({ storage: multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
}) }).single('image_url'), async (req, res) => {
  try {
    const { author_name, blog_title, blog_content, status } = req.body;
    const image_url = req.file ? `uploads/${req.file.filename}` : '';

    const query = `INSERT INTO blogs (author_name, blog_title, blog_content, status, image_url) VALUES (?, ?, ?, ?, ?)`;
    const [results] = await db.execute(query, [author_name, blog_title, blog_content, status, image_url]);

    res.status(201).json({ id: results.insertId, image: image_url });
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

// Route to get all blogs
app.get('/blogs', async (req, res) => {
  try {
    const query = `SELECT * FROM blogs`;
    const [results] = await db.execute(query);

    res.json({ blogs: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to update blog status
app.put('/blogs/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const { remarks } = req.body;

    const query = `UPDATE blogs SET status = ? , remarks = ? WHERE id = ?`;
    const [results] = await db.execute(query, [status, remarks , id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ message: 'Status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join('uploads')));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
