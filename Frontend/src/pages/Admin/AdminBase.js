import React from 'react'
import {  Navigate, Route, Routes } from "react-router-dom";
import Admin from './Admin';

const AdminBase = () => {
  return (
    
    <Routes>
      

      <Route path = "/dashboard" element = {<Admin />} />

     

      
    </Routes>
    
    
  )
}

export default AdminBase