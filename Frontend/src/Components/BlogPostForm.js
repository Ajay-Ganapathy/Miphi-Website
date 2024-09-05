// src/components/BlogPostForm.js
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import axios from 'axios';

const BlogPostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('/api/blogs', {
        title,
        content
      });
      alert('Blog posted successfully!');
    } catch (error) {
      alert('Error posting blog.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Content:</label>
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          formats={formats}
          style={{ height: '400px' }}
        />
      </div>
      <button type="submit">Post Blog</button>
    </form>
  );
};

const modules = {
  toolbar: [
    [{ 'header': '1'}, { 'header': '2' }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ 'font': [] }],
    [{ 'size': [] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['link', 'image']
  ],
};

const formats = [
  'header', 'list', 'bullet', 'bold', 'italic', 'underline',
  'font', 'size', 'color', 'background', 'align', 'link', 'image'
];

export default BlogPostForm;
