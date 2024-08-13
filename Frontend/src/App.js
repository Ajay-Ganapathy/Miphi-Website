import React from 'react'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Base from './pages/Base';
const App = () => {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path = "/*" element = {<Base />} />
      
    </Routes>
    
    </BrowserRouter>
 
  </div>
  )  
  
}

export default App