const express = require('express');
const mysql = require('mysql2');
const cors = require('cors'); 

const app = express();
const port = 5000;


app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '', 
  database: 'blogDB'
});


db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});


app.post('/blogs', (req, res) => {
  const { author_name, blog_title, blog_content, status } = req.body;

  const query = `INSERT INTO blogs (author_name, blog_title, blog_content, status) VALUES (?, ?, ?, ?)`;

  db.query(query, [author_name, blog_title, blog_content, status], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: results.insertId });
  });
});


app.get('/blogs', (req, res) => {
  const query = `SELECT * FROM blogs`;

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ blogs: results });
  });
});


app.put('/blogs/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    const query = `UPDATE blogs SET status = ? WHERE id = ?`;
  
    db.query(query, [status, id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      res.json({ message: 'Status updated successfully' });
    });
  });
  

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
