import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
import ProtectedRoute from './Routes/ProtectedRoutes';
import "./App.css"
import BlogPostForm from './Components/BlogPostForm';
import Sample from './Components/Sample';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/blogs');
      setBlogs(response.data.blogs.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };



  return (
    <div>
      
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
        
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/reset/:token" element={<ResetPassword />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={[ '2']} />}>
            <Route path="/admin/*" element={<AdminBase blogs={blogs} setBlogs={setBlogs} />} />
            <Route path="/admin/dashboard" element={<Admin />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['1']} />}>
            <Route path="/author/*" element={<Base  />} />
          </Route>

          {/* Default Routes
          <Route path="/" element={<Form />} />
          <Route path="/blogs" element={<BlogPage />} /> */}



          {/* Redirect to login if not authenticated */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
