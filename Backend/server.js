const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs')
const serverless = require('serverless-http');
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const blogRoutes = require('./Routes/blogs');
const  {User, Blog, Tag, BlogTag } = require('./models/models');
const multer = require('multer');
const jwt = require('jsonwebtoken'); 
// Create an Express app
const app = express();

// Middleware

app.use(bodyParser.json());
app.use('/blogs', blogRoutes);


// Connect to MongoDB
mongoose.connect('mongodb+srv://Subha-admin:8HwDCsK4EktIdnIa@cluster0.xhhtsqg.mongodb.net/miphiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const profilesDir = path.join(__dirname, 'profile');
if (!fs.existsSync(profilesDir)) {
  fs.mkdirSync(profilesDir);
}



  const multer = require('multer');
const path = require('path');

// Define storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // File naming
    }
});

const profileUpload = multer({ storage: storage });
// Define your routes here
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/register', profileUpload.single('profile_img'), async (req, res) => {
    const { username, name, password, designation } = req.body;
    const profileImg = req.file ? req.file.filename : '';

    // Log request body for debugging
    console.log(req.body);

    // Validation checks
    if (!name) return res.status(400).json({ message: 'Name is required' });
    if (!username || !password) return res.status(400).json({ message: 'Username and password are required' });

    try {
        // Check for existing user
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(409).json({ message: 'Username already exists' });

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            username,
            name,
            password: hashedPassword,
            profile_img: profileImg,
            designation
        });

        // Save the user to the database
        await user.save();

        // Generate a JWT token
        const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User registered successfully', token });

    } catch (error) {
        // Log and return server error
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

  // Route to handle login
  app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ message: 'Invalid credentials' });
  
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, role: user.role });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Error logging in', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.get('/blogs', async (req, res) => {
    try {
      const blogs = await Blog.find().populate('author_id');
      res.status(200).json(blogs);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
