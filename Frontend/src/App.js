import React, { useState, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Form from './Components/Form';
import Admin from './pages/Admin/Admin';
import BlogPage from './pages/BlogPage';
import Login from './pages/Auth/Login';
import AdminBase from './pages/Admin/AdminBase';
import Register from './pages/Auth/Register';
import ResetPassword from './pages/Auth/ResetPassword';
import Base from './pages/Author/Base';
import axios from 'axios';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    // Log the blogs whenever they change
    console.log(blogs);
  }, [blogs]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/blogs');
      setBlogs(response.data.blogs.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const authStatus = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/admin/*" element={<AdminBase blogs={blogs} setBlogs={setBlogs} />} />
          <Route path="/author/*" element={<Base />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />

          <Route path="/" element={<Form />} />

          {authStatus && <Route path="/admin/dashboard" element={<Admin />} />}

          <Route path="/blogs" element={<BlogPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
