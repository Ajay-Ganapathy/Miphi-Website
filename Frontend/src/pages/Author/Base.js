import React from 'react'
import Home from './Home'
import { Routes , Route } from 'react-router-dom'
import AuthorBlogs from './AuthorBlogs'
import { useEffect , useState } from 'react'
import axios from 'axios'
import BlogDetail from './BlogDetail'
import EditBlog from './EditBlog'
import Sidebar from '../../Components/Sidebar'
import Navbar from '../../Components/Navbar'
import ProfilePage from './ProfilePage'
import EditProfilePage from './EditProfilePage'
import BlogPostForm from '../../Components/BlogPostForm'
import Draft from './Draft'
import Preview from './Preview'
const Base = (props) => {

  const content = [
    ["Submit Blog" , "/author/submitblog"] ,
   ["Dashboard" , "/author"],
   ["Profile" , "/author/profile"] ,
   ["Drafts" , "/author/drafts"]
    
 ]

 

 const [isSideMenuOpen , setIsSideMenuOpen] = useState(false);
  return (

    <div>
      
      
    <div className={`flex h-screen bg-gray-800 ${isSideMenuOpen ? 'overflow-hidden' : ''}`}>
    
    
    <Sidebar content = {content}  />
    
    <div class="flex flex-col flex-1 w-full overflow-y-auto">
    
    <Navbar />
    <Routes>
      
    <Route path = "/" element = {<AuthorBlogs  />} />
    <Route path = "/submitblog" element = {<Home />} />
    
    <Route path = "/blogs/:id" element = {<BlogDetail  />} />
    <Route path = "/blogs/:id/edit" element = {<EditBlog />} />
    <Route path = "/profile" element = {<ProfilePage />} />
    <Route path = "/profile/edit" element = {<EditProfilePage />} />
    <Route path="/posts" element={<BlogPostForm />} />
    <Route path="/drafts" element={<Draft />} />
    <Route path="/blogs/preview" element={<Preview />} />
    
  </Routes>

  </div>
  </div>
  </div>
  )
}

export default Base