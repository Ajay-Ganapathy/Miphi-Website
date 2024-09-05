import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogPage = () => {
  const [approvedBlogs, setApprovedBlogs] = useState([]);

  useEffect(() => {
    fetchApprovedBlogs();
  }, []);

  const fetchApprovedBlogs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs`);
      console.log(response)
      const filteredBlogs = response.data.blogs.filter(blog => blog.status === 'Accept');
      setApprovedBlogs(filteredBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  return (
    <div className="blog-page">
      <h1 className="text-2xl font-bold mb-4">Approved Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {approvedBlogs.map((blog) => (
          <div key={blog.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">{blog.blog_title}</h2>
            <p className="text-gray-700 mb-4">{blog.blog_content}</p>
            <p className="text-sm text-gray-500">By: {blog.author_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
