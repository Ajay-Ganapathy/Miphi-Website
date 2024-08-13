import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Base from './pages/Base';
import Navbar from './Components/Navbar';
const App = () => {
  return (
    <div>
    
    <BrowserRouter>
    <Navbar />
    <Routes>
      
      <Route path = "/*" element = {<Base />} />
      
    </Routes>
    
    </BrowserRouter>
 
  </div>
  )  
  
}

export default App