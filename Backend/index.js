const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser') 
const bcrypt = require('bcryptjs')


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

// Set up MySQL connection using promises
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'blogDB',
});

// Route to handle Register

const jwt = require('jsonwebtoken'); // Ensure you require the jwt library

app.post('/register', async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const query = 'INSERT INTO users (role, name, password) VALUES (1, ?, ?)';
    const [results] = await db.execute(query, [name, hashedPassword]);

    // Generate a token
    const token = jwt.sign({ id: results.insertId, name }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// Route to handle login
app.post('/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    const [results] = await db.execute('SELECT * FROM users WHERE name = ?', [name]);

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      const token = jwt.sign({ id: user.id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ "token" : token , "role" : user.role}); 
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// app.post('/login', (req, res) => {
//   const { name, password } = req.body;

//   db.query('SELECT * FROM users WHERE name = ?', [name], async (err, results) => {
//     if (err || results.length === 0) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     const user = results[0];
//     const match = await bcrypt.compare(password, user.password);

//     if (match) {
//       const token = jwt.sign({ id: user.id, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
//       res.json({ token, role: user.role });
//     } else {
//       res.status(400).json({ message: 'Invalid credentials' });
//     }
//   });
// });


// Route to fetch user details


app.get('/author/details', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify the token

    const [results] = await db.execute('SELECT id, name, role FROM users WHERE id = ?', [decoded.id]);

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
    const { author_name, blog_title, blog_content, status , author_id } = req.body;
    const image_url = req.file ? `uploads/${req.file.filename}` : '';
    console.log(req.body , image_url)

    const query = `INSERT INTO blogs (author_name, blog_title, blog_content, status, image_url , author_id) VALUES (?, ?, ?, ?, ? , ?)`;
    const [results] = await db.execute(query, [author_name, blog_title, blog_content, status, image_url , author_id]);

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

// Route to get a single blog

app.get("/blogs/:id", async (req, res) => {
  const id = req.params.id;

  // Validate ID
  if (!id || isNaN(id)) {
    return res.status(400).json({ error: "Invalid blog ID" });
  }

  try {
    const query = `SELECT * FROM blogs WHERE id = ?`;
    db.execute(query, [id], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: "Error fetching blog" });
      }

      // Check if blog was found
      if (results.length === 0) {
        return res.status(404).json({ error: "Blog not found" });
      }

      // Return the blog data
      res.json({ blog: results[0] });
    });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to update Blog

app.put('/blogs/:id/', multer({ 
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  }) 
}).single('image_url'), async (req, res) => {
  try {
    const { id } = req.params;
    const { author_name, blog_title, blog_content, status, author_id } = req.body;
    const image_url = req.file ? `uploads/${req.file.filename}` : '';

    // Construct the update query

    if(image_url != ''){
      const query = `
      UPDATE blogs
      SET author_name = ?, blog_title = ?, blog_content = ?, status = ?, image_url = ?, author_id = ?
      WHERE id = ?
    `;
    
    // Execute the update query
    const [results] = await db.execute(query, [author_name, blog_title, blog_content, status, image_url, author_id, id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ id: id, image: image_url });

    }else{
      const query = `
      UPDATE blogs
      SET author_name = ?, blog_title = ?, blog_content = ?, status = ? , author_id = ?
      WHERE id = ?
    `;
    
    // Execute the update query
    const [results] = await db.execute(query, [author_name, blog_title, blog_content, status , author_id, id]);
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    res.status(200).json({ id: id, image: image_url });
    }
    

    
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});





// Route to get status

app.get('/blogs/:status', (req, res) => {
  const status = req.params.status; // 'approved' or 'rejected'
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const offset = (page - 1) * limit;

  const query = `
    SELECT * FROM blogs
    WHERE status = ?
    ORDER BY id DESC
    LIMIT ? OFFSET ?`;

  db.query(query, [status, limit, offset], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Optionally, you can also send the total count of blogs for more advanced pagination
    db.query('SELECT COUNT(*) AS count FROM blogs WHERE status = ?', [status], (err, countResult) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        blogs: results,
        total: countResult[0].count
      });
    });
  });
});

// Route to update blog status
app.put('/blogs/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, remarks = '' } = req.body; // Default value for remarks

    console.log(id);
    console.log(status);
    console.log(remarks);

    const query = `UPDATE blogs SET status = ?, remarks = ? WHERE id = ?`;
    const [results] = await db.execute(query, [status, remarks, id]);

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
