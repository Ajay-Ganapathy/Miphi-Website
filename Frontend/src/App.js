import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from './Components/Navbar';
import Form from './Components/Form';
import Admin from './pages/Admin/Admin';
import BlogPage from './pages/BlogPage';
import Login from './pages/Auth/Login';
import { useState , useEffect} from 'react';
import AdminBase from './pages/Admin/AdminBase';
import Register from './pages/Auth/Register';
import ResetPassword from './pages/Auth/ResetPassword';
const App = () => {

  //const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authStatus = localStorage.getItem('isAuthenticated') === 'true';

  useEffect(() => {
    
    
  }, []); 
  return (
    <div>
    
    <BrowserRouter>
    <Navbar  />
    <Routes>

      <Route path = "/admin/*" element = {<AdminBase />} />

      { /* Authentication Routes */}

      <Route path="/" element={<Navigate to={"/login"} />} />
       <Route path = "/login" element = {<Login  />} />
       <Route path = "/register" element = {<Register />} />
       <Route path = "/reset" element = {<ResetPassword />} />
       <Route path = "/reset/:token" element = {<ResetPassword />} />
      
      <Route path = "/*" element = {<Form />} />
      
      {
         authStatus &&  <Route path="/admin/dashboard" element = {<Admin />} />
      }
      
     
      <Route path = "/blogs" element = {<BlogPage />} />
      
    </Routes>
    
    </BrowserRouter>
 
  </div>
  )  
  
}

export default App