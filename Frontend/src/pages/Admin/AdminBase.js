import React from 'react'
import {  Navigate, Route, Routes } from "react-router-dom";
import Admin from './Admin';

import BlogSingle from './BlogSingle';
import Dashboard from './Dashboard';
import Dashboard2 from './Dashboard2';

const AdminBase = (props) => {
  return (
    
    <Routes>
      

      {/* <Route path = "/" element = {<Admin blogs = {props.blogs}  setBlogs = {props.setBlogs} />} /> */}

      <Route path = "/" element = {<Dashboard2 />} />
      <Route path = "/blogs/:id" element = {<BlogSingle blogs = {props.blogs}  setBlogs = {props.setBlogs} />} />

      
    </Routes>
    
    
  )
}

export default AdminBase