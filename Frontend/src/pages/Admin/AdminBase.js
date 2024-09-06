import React from 'react'
import {  Navigate, Route, Routes } from "react-router-dom";
import Admin from './Admin';

import BlogSingle from './BlogSingle';
import Dashboard from './Dashboard';
import Dashboard2 from './Dashboard2';
import Sidebar from '../../Components/Sidebar';
import { useState } from 'react';
import Navbar from '../../Components/Navbar';
import Register from '../Auth/Register';
import AddUser from './AddUser';
import DeletedBlogs from './DeletedBlogs';


const AdminBase = (props) => {

  const [isSideMenuOpen , setIsSideMenuOpen] = useState(false);
  
  const content = [
   
   ["Dashboard" , "/admin"],
   ["Add User" , "/admin/register"] ,
   ["Deleted Blogs " , "/admin/deletedblogs"]
    
 ]
  return (

    <div className={`flex h-screen bg-gray-800 ${isSideMenuOpen ? 'overflow-hidden' : ''}`}>
    
    
    <Sidebar content = {content} />
    
    <div class="flex flex-col flex-1 w-full overflow-y-auto">
    
    <Navbar />
    
    <Routes>
      

      {/* <Route path = "/" element = {<Admin blogs = {props.blogs}  setBlogs = {props.setBlogs} />} /> */}

      <Route path = "/" element = {<Dashboard2 />} />
      <Route path = "/blogs/:id" element = {<BlogSingle blogs = {props.blogs}  setBlogs = {props.setBlogs} />} />
      <Route path = "/register" element = {<AddUser />} />
      <Route path = "/deletedblogs" element = {<DeletedBlogs />} />

      
    </Routes>

    </div>
    </div>
    
    
  )
}

export default AdminBase