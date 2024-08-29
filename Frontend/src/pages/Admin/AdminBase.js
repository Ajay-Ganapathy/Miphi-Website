import React from 'react'
import {  Navigate, Route, Routes } from "react-router-dom";
import Admin from './Admin';

const AdminBase = (props) => {
  return (
    
    <Routes>
      

      <Route path = "/dashboard" element = {<Admin blogs = {props.blogs}  setBlogs = {props.setBlogs} />} />

     

      
    </Routes>
    
    
  )
}

export default AdminBase