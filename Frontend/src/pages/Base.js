import React from 'react'
import {  Navigate, Route, Routes } from "react-router-dom";
import About from './About';
import Home from './Home';

const Base = () => {
  return (
    
    <Routes>

      <Route path = "/" element = {<Home />} />

      <Route path = "/about" element = {<About />} />
      
    </Routes>
    
    
  )
}

export default Base