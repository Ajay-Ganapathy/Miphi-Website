import React from 'react'
import Home from './Home'
import { Routes , Route } from 'react-router-dom'
import AuthorBlogs from './AuthorBlogs'
import { useEffect , useState } from 'react'
import axios from 'axios'
import BlogDetail from './BlogDetail'
import EditBlog from './EditBlog'

const Base = (props) => {


  return (
    <Routes>
      

    <Route path = "/" element = {<Home user = {props.user} />} />
    <Route path = "/blogs" element = {<AuthorBlogs user = {props.user} />} />
    <Route path = "/blogs/:id" element = {<BlogDetail user = {props.user} />} />
    <Route path = "/blogs/:id/edit" element = {<EditBlog user = {props.user} />} />
   

    
  </Routes>
  )
}

export default Base