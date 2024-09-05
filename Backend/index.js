const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const serverless = require('serverless-http');

const app = express();
const port = 5000;

const JWT_SECRET = 'SecretToken_Miphi@12';

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());

// Ensure /uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const profilesDir = path.join(__dirname, 'profile');
if (!fs.existsSync(profilesDir)) {
  fs.mkdirSync(profilesDir);
}

// Set up MySQL connection using promises
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'blogdb',
});

// Configure multer
const upload = multer({ 
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  })
});

const profile_upload = multer({ 
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, profilesDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  })
});
// Route to handle Register
app.post('/register', profile_upload.single('profile'), async (req, res) => {
  const { username, name, password } = req.body;
  const profileImg = req.file ? req.file.filename : ''; // Get filename from uploaded file

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
    const [userResults] = await db.execute(checkUserQuery, [username]);

    if (userResults.length > 0) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let query;
    let params;

    if (profileImg) {
      query = 'INSERT INTO users (role, username, name, password, profile_img) VALUES (1, ?, ?, ?, ?)';
      params = [username, name, hashedPassword, profileImg];
    } else {
      query = 'INSERT INTO users (role, username, name, password) VALUES (1, ?, ?, ?)';
      params = [username, name, hashedPassword];
    }

    const [results] = await db.execute(query, params);

    const token = jwt.sign({ id: results.insertId, username }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to handle login
app.post('/login', async (req, res) => {
  const { username, password } = req.body; // Changed from 'name' to 'username'

  try {
    const [results] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, role: user.role });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to fetch user details
app.get('/author/details', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); 

    const [results] = await db.execute('SELECT id, name, role , profile_img FROM users WHERE id = ?', [decoded.id]);

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching user details', error);
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Route to handle blog creation
app.post('/blogs', upload.single('image_url'), async (req, res) => {
  try {
    const { author_name, blog_title, blog_content, status, author_id } = req.body;
    const image_url = req.file ? `uploads/${req.file.filename}` : '';
    console.log(req.body, image_url)

    const query = `INSERT INTO blogs (author_name, blog_title, blog_content, status, image_url, author_id) VALUES (?, ?, ?, ?, ?, ?)`;
    const [results] = await db.execute(query, [author_name, blog_title, blog_content, status, image_url, author_id]);

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

// Route to get blogs count
app.get('/blogs/count', async (req, res) => {
  try {
    const query = `SELECT COUNT(*) AS total_count FROM blogs`;
    const q1 = `SELECT COUNT(*) AS pending_count FROM blogs WHERE status = "Pending"`;
    const q2 = `SELECT COUNT(*) AS accepted_count FROM blogs WHERE status = "Accept"`;
    const q3 = `SELECT COUNT(*) AS rejected_count FROM blogs WHERE status = "Reject"`;

    const [totalCount] = await db.execute(query);
    const [pendingCount] = await db.execute(q1);
    const [acceptedCount] = await db.execute(q2);
    const [rejectedCount] = await db.execute(q3);

    res.json({ total: totalCount[0].total_count, pending: pendingCount[0].pending_count, accept: acceptedCount[0].accepted_count, reject: rejectedCount[0].rejected_count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a single blog
app.get('/blogs/:id', async (req, res) => {
  const id = req.params.id;

  // Validate ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'Invalid blog ID' });
  }

  try {
    const query = `SELECT * FROM blogs WHERE id = ?`;
    const [results] = await db.execute(query, [id]);

    if (results.length === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.json({ blog: results[0] });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to update Blog
app.put('/blogs/:id', upload.single('image_url'), async (req, res) => {
  try {
    const { id } = req.params;
    const { author_name, blog_title, blog_content, status, author_id } = req.body;
    const image_url = req.file ? `uploads/${req.file.filename}` : '';

    let query;
    let params;

    if (image_url) {
      query = `
        UPDATE blogs
        SET author_name = ?, blog_title = ?, blog_content = ?, status = ?, image_url = ?, author_id = ?
        WHERE id = ?
      `;
      params = [author_name, blog_title, blog_content, status, image_url, author_id, id];
    } else {
      query = `
        UPDATE blogs
        SET author_name = ?, blog_title = ?, blog_content = ?, status = ?, author_id = ?
        WHERE id = ?
      `;
      params = [author_name, blog_title, blog_content, status, author_id, id];
    }

    const [results] = await db.execute(query, params);

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ id: id, image: image_url });
  } catch (err) {
    console.error('Error updating blog:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to delete Blog
app.delete('/blogs/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({ error: 'Invalid blog ID' });
    }

    const query = `DELETE FROM blogs WHERE id = ?`;
    const [results] = await db.execute(query, [id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (err) {
    console.error('Error deleting blog:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/profile', express.static(path.join(__dirname, 'profile')));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports.handler = serverless(app);
