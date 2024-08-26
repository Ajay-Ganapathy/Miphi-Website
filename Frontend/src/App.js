import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Base from './pages/Base';
import Navbar from './Components/Navbar';
import Form from './Components/Form';
import Admin from './pages/Admin';
import BlogPage from './pages/BlogPage';
const App = () => {
  return (
    <div>
    
    <BrowserRouter>
    <Navbar />
    <Routes>
      
      <Route path = "/*" element = {<Form />} />
      <Route path = "/admin" element = {<Admin />} />
      <Route path = "/blogs" element = {<BlogPage />} />
      
    </Routes>
    
    </BrowserRouter>
 
  </div>
  )  
  
}

export default App