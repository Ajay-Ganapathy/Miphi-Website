import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Admin = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/blogs');
      setBlogs(response.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const updateBlogStatus = async (id, status) => {
    const message = status === 'Accept' 
    ? 'Do you want to accept this blog post?' 
    : 'Do you want to reject this blog post?';

  if (window.confirm(message)) {
    try {
      await axios.put(`http://localhost:5000/blogs/${id}/status`, { status: status });
      setBlogs(blogs.map(blog => 
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
                Accept / Reject
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b border-gray-200">{blog.author_name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{blog.blog_title}</td>
                <td className="py-2 px-4 border-b border-gray-200">{blog.blog_content}</td>
                <td className="py-2 px-4 border-b border-gray-200">
                  {blog.status === 'Pending' && (
                    <div className="flex space-x-2">
                      <button
                        className="bg-green-600 text-white p-2 m-2"
                        onClick={() => {
                            console.log(blog.id)
                            updateBlogStatus(blog.id, 'Accept')
                        }}
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-700 text-white p-2 m-2"
                        onClick={() => updateBlogStatus(blog.id, 'Reject')}
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {blog.status === 'Accept' && <span className="text-green-600">Accepted</span>}
                  {blog.status === 'Reject' && <span className="text-red-600">Rejected</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
