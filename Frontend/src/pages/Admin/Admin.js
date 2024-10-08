import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom' ;
import Modal from '../../Components/Modal';
import Modal2 from '../../Components/Modal2';
import { useLocalContext } from '../../Context/context';

const Admin = (props) => {
 
  

  const {approvedBlogs , rejectedBlogs , pendingBlogs , revertedBlogs , fetchBlogs , blogs , setBlogs, setPendingBlogs, user} = useLocalContext();

  useEffect(() => {
    fetchBlogs();
  }, []);

  

  const updateBlogStatus = async (id, status) => {
    const message = status === 'Accept' 
    ? 'Do you want to accept this blog post?' 
    : 'Do you want to reject this blog post?';

  if (window.confirm(message)) {
    try {
      await axios.put(`http://10.20.1.101:5000/blogs/${id}/status`, { status: status });
      props.setBlogs(props.blogs.map(blog => 
        blog.id === id ? { ...blog, status: status } : blog
      ));
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
  }
  };

  

  return (
    <div className="admin-panel">
      <h1 className="text-2xl font-bold mb-4 mt-4 text-center">Admin Panel</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Author Name
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Blog Content
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Action
              </th>

              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="py-2 px-4 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Remarksss
              </th>
            </tr>
          </thead>
          <tbody>

            {
              blogs.map((blog) => {
                console.log(blog)
              })
            }
            
            {blogs.map((blog) =>  (
              
              <tr key={blog.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">{blog.author_name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{blog.blog_title}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                <Link to={`/admin/blogs/${blog.id}`} state={{ blog }} 
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      
      >
        View Blog
      </Link>

      <Link to={`/admin/blogs/${blog.id}`} state={{ blog }} className="btn bg-teal-500 text-white hover:bg-teal-600 py-2 px-4 rounded">
                    Read More
                  </Link>
    
                </td>

                <td>

                 <Modal id = {blog.id} blogs = {blogs} setBlogs = {setBlogs} title = "Accept / Reject"  />

                </td>
             

                {/* <td className="py-2 px-4 border-b border-gray-200">{<>
                  <div
                 // dangerouslySetInnerHTML={ {__html : blog.blog_content}}
                  />

                  <Modal2 id = {blog.id} author = {blog.author_name} blog_title = {blog.blog_title} title = "View Blog" remarks = {blog.remarks} content = {blog.blog_content}  blogs = {props.blogs} setBlogs = {props.setBlogs} image = { blog.image_url } />
                </>}</td> */}
                <td className="py-2 px-4 border-b border-gray-200">
                 
                  {blog.status === 'Accept' && <span className="text-green-600">Accepted</span>}
                  {blog.status === 'Reject' && <span className="text-red-600">Rejected</span>}
                  {blog.status === 'Pending' && <span className="text-yellow-600">Pending</span>}
                </td>

                
                  <td className="py-2 px-4 border-b border-gray-200"> {blog.remarks}</td>
                
                
                

               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
