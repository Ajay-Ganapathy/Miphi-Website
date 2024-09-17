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
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));
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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the upload directory
    const uploadDir = path.join(__dirname, 'uploads/blogs');
    
    // Ensure the directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Use the original file name
    cb(null, file.originalname);
  }
});


const uploadimg = multer({ storage });

// Assuming you're using MySQL with a library like 'mysql2' or 'sequelize'

// Insert blog into 'blogs' table
const insertBlog = async (blogData, tags) => {
  const { author_name, blog_title, blog_content, status, author_id, image_url } = blogData;

  // Insert the blog into the 'blogs' table
  const [blogResult] = await db.execute(
      `INSERT INTO blogs (author_name, blog_title, blog_content, status, image_url, author_id) 
      VALUES (?, ?, ?, ?, ?, ?)`,
      [author_name, blog_title, blog_content, status, image_url, author_id]
  );
  
  const blogId = blogResult.insertId; // Get the new blog's ID

  // Insert tags into the 'tags' table if they don't exist and link them to the blog
  for (const tag of tags) {
    const [tagResult] = await db.execute(
        `INSERT INTO tags (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
        [tag]
    );
    const tagId = tagResult.insertId;

    // Insert mapping into 'blog_tags' table if it doesn't exist
    await db.execute(
        `INSERT INTO blog_tags (blog_id, tag_id) 
         SELECT ?, ? FROM DUAL 
         WHERE NOT EXISTS (
            SELECT * FROM blog_tags WHERE blog_id = ? AND tag_id = ?
         )`,
        [blogId, tagId, blogId, tagId]
    );
}

  // Return the inserted blog ID and image URL
  return {
      id: blogId,
      image: image_url
  };
};



const updateBlog = async (blogId, blogData, tags) => {
  const { author_name, blog_title, blog_content, status, author_id, image_url } = blogData;

  // Update the blog in the 'blogs' table based on the presence of image_url
  let updateQuery = `UPDATE blogs 
                     SET author_name = ?, blog_title = ?, blog_content = ?, status = ?, author_id = ? 
                     WHERE id = ?`;

  let queryParams = [author_name, blog_title, blog_content, status, author_id, blogId];

  if (image_url !== '') {
    if (image_url === 'rem') {
      updateQuery = `UPDATE blogs 
                     SET author_name = ?, blog_title = ?, blog_content = ?, status = ?, image_url = '', author_id = ? 
                     WHERE id = ?`;
      queryParams = [author_name, blog_title, blog_content, status, author_id, blogId];
    } else {
      updateQuery = `UPDATE blogs 
                     SET author_name = ?, blog_title = ?, blog_content = ?, status = ?, image_url = ?, author_id = ? 
                     WHERE id = ?`;
      queryParams = [author_name, blog_title, blog_content, status, image_url, author_id, blogId];
    }
  }

  await db.execute(updateQuery, queryParams);

  // Clear all existing tag links for this blog in 'blog_tags'
  await db.execute(`DELETE FROM blog_tags WHERE blog_id = ?`, [blogId]);

  // Insert tags into the 'tags' table if they don't exist and link them to the blog
  for (const tag of tags) {
    const [tagResult] = await db.execute(
      `INSERT INTO tags (name) VALUES (?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
      [tag]
    );
    const tagId = tagResult.insertId;

    // Insert mapping into 'blog_tags' table if it doesn't exist
    await db.execute(
      `INSERT INTO blog_tags (blog_id, tag_id) 
       SELECT ?, ? FROM DUAL 
       WHERE NOT EXISTS (
          SELECT 1 FROM blog_tags WHERE blog_id = ? AND tag_id = ?
       )`,
      [blogId, tagId, blogId, tagId]
    );
  }

  // Return the updated blog ID and image URL
  return {
    id: blogId,
    image: image_url
  };
};


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

app.post('/upload-images', uploadimg.array('images[]'), (req, res) => {
  // Array to hold image URLs
  const imageUrls = req.files.map(file => `/blogs/${file.filename}`);

  // Send response with image URLs
  res.json({
    success: true,
    imageUrls: imageUrls
  });
});


app.get("/" , (req,res) => {
  res.send("hello")
})

app.post('/register', profile_upload.single('profile'), async (req, res) => {
  const { username, name, password , designation } = req.body;
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
      query = 'INSERT INTO users (role, username, name, password, profile_img , designation) VALUES (1, ?, ?, ?, ? , ?)';
      params = [username, name, hashedPassword, profileImg , designation ];
    } else {
      query = 'INSERT INTO users (role, username, name, password , designation ) VALUES (1, ?, ?, ? , ?)';
      params = [username, name, hashedPassword , designation ];
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
    const { author_name, blog_title, blog_content, status, author_id, tags } = req.body;
    const image_url = req.file ? `uploads/${req.file.filename}` : '';

    // Construct blogData object
    const blogData = {
      author_name,
      blog_title,
      blog_content,
      status,
      image_url,
      author_id
    };

    // Convert tags from string (if coming as JSON string) to an array
    const tagsArray = Array.isArray(tags) ? tags : JSON.parse(tags);
    
    console.log(blogData)
    // Insert blog and handle tags
    const result = await insertBlog(blogData, tagsArray);

    res.status(201).json(result);
  } catch (err) {
    console.error('Error:', err.message);
    res.status(500).json({ error: err.message });
  }
});


// Route to get all blogs
app.get('/blogs', async (req, res) => {
  try {
    const query = `SELECT b.id , b.author_name , b.blog_title, b.blog_content , b.deleted_at, b.image_url , b.created_at , b.status , b.author_id , u.profile_img , u.designation FROM blogs b JOIN users u ON u.id = b.author_id`;
    
    const [results] = await db.execute(query);

    res.json({ blogs: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get latest blogs

app.get('/blogs/latest', async (req, res) => {
  try {
    const query = `SELECT b.id , b.author_name , b.blog_title, b.blog_content , b.deleted_at, b.image_url , b.created_at , b.status , b.author_id , u.profile_img , u.designation FROM blogs b JOIN users u ON u.id = b.author_id ORDER BY published_at  DESC LIMIT 3`;
    
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
    const id = req.params.id;
    console.log(id)
    const query = `SELECT COUNT(*) AS total_count FROM blogs WHERE deleted_at IS NULL `;
    const q1 = `SELECT COUNT(*) AS pending_count FROM blogs WHERE status = "Pending" AND deleted_at IS NULL AND author_id = ?`;
    const q2 = `SELECT COUNT(*) AS accepted_count FROM blogs WHERE status = "Accept" AND deleted_at IS NULL AND author_id = ?`;
    const q3 = `SELECT COUNT(*) AS rejected_count FROM blogs WHERE status = "Reject" AND deleted_at IS NULL AND author_id = ?`;


    const results = await db.execute(query);
    const [results1] = await db.execute(q1 , [id]);
    const [results2] = await db.execute(q2, [id]) ;
    const [results3] = await db.execute(q3 , [id]);
    console.log(results , results1 , results2 , results3 );

    res.json({ total : results[0].total_count  , pending : results1[0].pending_count , accept : results2[0].accepted_count , reject : results3[0].rejected_count });
  } catch (err) {
    
    res.status(500).json({ error: err.message });
  }
});



// Route to get individual blogs

app.get("/blogs/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const query = `SELECT b.id , b.author_name ,  b.blog_title, b.blog_content , b.deleted_at ,b.image_url , b.created_at ,  b.status , b.author_id , u.profile_img ,  u.designation  FROM blogs b JOIN users u ON u.id = b.author_id WHERE b.id = ?`;
    const [results] = await db.execute(query, [id] ) 
      res.json({ blog: results[0] });
  
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: "Server error" });
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


// Route to update Blog

app.put('/blogs/:id', multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  })
}).single('image_url'), async (req, res) => {
  try {
    const blogId = req.params.id;

    const { author_name, blog_title, blog_content, status, author_id, tags } = req.body;

    // Check if file was uploaded
    const image_url = req.file ? `uploads/${req.file.filename}` : '';

    // Validate if cover image is mandatory
    if (req.body.image_url === 'rem' || !image_url) {
      return res.status(400).json({ error: "Cover Image is Mandatory!" });
    }

    // Prepare blog data
    const blogData = {
      author_name,
      blog_title,
      blog_content,
      status,
      image_url,
      author_id
    };

    // Parse tags
    const tagsArray = Array.isArray(tags) ? tags : JSON.parse(tags || '[]');
    
    console.log(`Updating blog with ID: ${blogId}`, blogData);

    // Update blog
    const result = await updateBlog(blogId, blogData, tagsArray);

    res.status(200).json(result);
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

    if(status == "Accept"){
      const query = `UPDATE blogs SET status = ?, remarks = ? , published_at = ? WHERE id = ?`;
      const [results] = await db.execute(query, [status, remarks, new Date() , id]);
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      res.json({ message: 'Status updated successfully' });
    }else{
      const query = `UPDATE blogs SET status = ?, remarks = ?  WHERE id = ?`;
      const [results] = await db.execute(query, [status, remarks , id]);
  
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
  
      res.json({ message: 'Status updated successfully' });
    }
  
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

// Route to get latest 3 posts

app.get('/blogs/latest', async (req, res) => {
  try {
    const query = `
      SELECT * FROM blogs
      ORDER BY published_at DESC
      LIMIT 3;
    `;

    const [blogs] = await db.execute(query);

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Get blogs by tag name

app.get('/blogs/tag/:tagName', async (req, res) => {
  try {
    const tagName = req.params.tagName;

    const query = `
      SELECT b.id, b.blog_title, b.author_name, b.blog_content, b.image_url
      FROM blogs b
      JOIN blog_tags bt ON b.id = bt.blog_id
      JOIN tags t ON bt.tag_id = t.id
      WHERE t.name = ?;
    `;

    const [blogs] = await db.execute(query, [tagName]);

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Get tags of each blog

app.get('/blogs/tags/:blogId', async (req, res) => {
  try {
    const blogId = req.params.blogId;
    console.log('Fetching tags for blogId:', blogId);

    // SQL Query to fetch tags
    const query = `
      SELECT t.name 
      FROM blogs b 
      JOIN blog_tags bt ON b.id = bt.blog_id 
      JOIN tags t ON bt.tag_id = t.id 
      WHERE bt.blog_id = ?`;

    // Execute the query
    const [rows] = await db.execute(query, [blogId]);

    console.log('Tags found:', rows);

    // Return the tags as JSON (even if empty)
    res.json(rows);
  } catch (err) {
    console.error('Error fetching tags:', err.message);
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
app.use('/uploads/blogs', express.static(path.join('uploads')));
app.use('/profile', express.static(path.join(__dirname, 'profile')));
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


