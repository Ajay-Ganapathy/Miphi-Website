import React from 'react'
import {  Navigate, Route, Routes } from "react-router-dom";
import About from './About';
import Home from './Home';
import Products from './Products';
import Solutions from './Solutions';
import Contact from './Contact';

const Base = () => {
  return (
    
    <Routes>
      

      <Route path = "/" element = {<Home />} />

      <Route path = "/about" element = {<About />} />
      <Route path = "/products" element = {<Products />} />
      <Route path = "/solutions" element = {<Solutions />} />
      <Route path = "/contact" element = {<Contact />} />

      
    </Routes>
    
    
  )
}

export default Base