import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Base from './pages/Base';
import Navbar from './Components/Navbar';
import Form from './Components/Form';
import Admin from './pages/Admin';
import BlogPage from './pages/BlogPage';
import Login from './pages/Login';
import { useState , useEffect} from 'react';
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
      
      <Route path = "/*" element = {<Form />} />
      <Route path = "/admin" element = {<Login  />} />
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