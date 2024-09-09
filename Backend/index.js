const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser') 
const bcrypt = require('bcryptjs')
const serverless = require('serverless-http');
const cron = require('node-cron');

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

// Set up MySQL connection using promises
const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'blogdb',
});

console.log(db)

// Route to handle Register

const jwt = require('jsonwebtoken'); 

app.get("/" , (req,res) => {
  res.send("hello")
})

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

// Route to Update user profile
// Route to Update user profile
app.put('/profile/edit/:id', profile_upload.single('profile_img'), async (req, res) => {
  const { name } = req.body;
  const id = req.params.id;
  const profileImg = req.file ? "profile/" + req.file.filename : ''; // Extract the profile image filename if uploaded

  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    // Check if user exists
    const [userCheck] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    if (userCheck.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If profile image is uploaded, update name and profile_img
    let query, params;
    if (profileImg) {
      // Remove the old profile image if exists
      const oldProfileImg = userCheck[0].profile_img;
      if (oldProfileImg) {
        const oldImagePath = path.join(profilesDir, oldProfileImg);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath); // Delete the old image from filesystem
        }
      }

      query = 'UPDATE users SET name = ?, profile_img = ? WHERE id = ?';
      params = [name, profileImg, id];
    } else {
      // If no new image is uploaded, only update the name
      query = 'UPDATE users SET name = ? WHERE id = ?';
      params = [name, id];
    }

    // Execute the update query
    const [updateResult] = await db.execute(query, params);

    if (updateResult.affectedRows === 0) {
      return res.status(404).json({ message: 'Failed to update profile' });
    }

    res.status(200).json({ message: 'Profile updated successfully' });

  } catch (error) {
    console.error('Error updating profile:', error);
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

    const [results] = await db.execute('SELECT id , name , username , role , profile_img FROM users WHERE id = ?', [decoded.id]);
   // console.log(results[0] , "dd")

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(results[0]);
  } catch (error) {
    console.error('Error fetching user details', error);
    res.status(401).json({ message: 'Invalid token' });
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

    const [results] = await db.execute('SELECT id, name, role , username , profile_img  FROM users WHERE id = ?', [decoded.id]);

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
    const query = `SELECT * FROM blogs WHERE deleted_at IS NULL`;
    const [results] = await db.execute(query);

    res.json({ blogs: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get deleted blogs
app.get('/deletedblogs', async (req, res) => {
  try {
    const query = `SELECT * FROM blogs WHERE deleted_at IS NOT NULL`;
    const [results] = await db.execute(query);

    res.json({ blogs: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get blogs count

app.get('/blogs/count', async (req, res) => {
  try {
    const query = `SELECT COUNT(*) AS total_count FROM blogs WHERE deleted_at IS NULL`;
    const q1 = `SELECT COUNT(*) AS pending_count FROM blogs WHERE status = "Pending" AND deleted_at IS NULL`;
    const q2 = `SELECT COUNT(*) AS accepted_count FROM blogs WHERE status = "Accept" AND deleted_at IS NULL`;
    const q3 = `SELECT COUNT(*) AS rejected_count FROM blogs WHERE status = "Reject" AND deleted_at IS NULL`;


    const results = await db.execute(query);
    const [results1] = await db.execute(q1);
    const [results2] = await db.execute(q2);
    const [results3] = await db.execute(q3);
    console.log(results , results1 , results2 , results3 );

    res.json({ total : results[0].total_count  , pending : results1[0].pending_count , accept : results2[0].accepted_count , reject : results3[0].rejected_count });
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
});


// Route to get specific blog count 


app.get('/blogs/count/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);

    // Use parameterized queries to prevent SQL injection
    const query = `
      SELECT 
        COUNT(*) AS total_count,
        SUM(CASE WHEN status = 'Pending' THEN 1 ELSE 0 END) AS pending_count,
        SUM(CASE WHEN status = 'Accept' THEN 1 ELSE 0 END) AS accepted_count,
        SUM(CASE WHEN status = 'Reject' THEN 1 ELSE 0 END) AS rejected_count,
        SUM(CASE WHEN status = 'Reverted' THEN 1 ELSE 0 END) AS reverted_count
      FROM blogs
      WHERE deleted_at IS NULL AND id = ?
    `;

    const [results] = await db.execute(query, [id]);

    // Log results for debugging
    console.log(results);

    res.json({
      total: results[0].total_count,
      pending: results[0].pending_count,
      accept: results[0].accepted_count,
      reject: results[0].rejected_count,
      reverted: results[0].reverted_count
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
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

// Route to Delete a blog

app.delete('/blogs/:id', async (req, res) => {
  const { id } = req.params;

  // Validate that the id is a number
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const query = 'DELETE FROM blogs WHERE id = ?';
    const [results] = await db.query(query, [id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Record not found' });
    }

    console.log("Successfully Deleted");

    res.status(200).json({ message: 'Record deleted successfully' });
  } catch (err) {
    console.error('Error deleting record:', err);
    res.status(500).json({ error: 'An error occurred while deleting the record' });
  }
});

// Route for soft delete

app.put('/blogs/:id/soft-delete', async (req, res) => {
  try {
    const { id } = req.params;
   

    console.log(id);
   

    const query = `UPDATE blogs SET deleted_at = NOW() WHERE id = ?`;
    const [results] = await db.execute(query, [ id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Restore a soft-deleted blog

app.put('/blogs/:id/restore', async (req, res) => {
  try {
    const { id } = req.params;
   

    console.log(id);
   

    const query = `UPDATE blogs SET deleted_at = NULL WHERE id = ?`;
    const [results] = await db.execute(query, [ id]);

    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Event listener

cron.schedule('0 0 * * *', () => {
  const query = 'DELETE FROM blogs WHERE deleted_at < NOW() - INTERVAL 30 DAY';
  
  db.query(query, (err, result) => {
      if (err) {
          console.error('Failed to delete old soft-deleted blogs:', err);
      } else {
          console.log(`${result.affectedRows} old blogs permanently deleted`);
      }
  });
});


// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join('uploads')));
app.use('/profile', express.static(path.join(__dirname, 'profile')));
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


