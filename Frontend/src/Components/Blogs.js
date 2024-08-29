import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Blogs = () => {
    const [approvedBlogs, setApprovedBlogs] = useState([]);
    const [rejectedBlogs, setRejectedBlogs] = useState([]);

    useEffect(() => {
      fetchApprovedBlogs();
    }, []);
  
    const fetchApprovedBlogs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/blogs');
        console.log(response)
        const filteredBlogs = response.data.blogs.filter(blog => blog.status === 'Accept');
        setApprovedBlogs(filteredBlogs);
        const filteredBlogs2 = response.data.blogs.filter(blog => blog.status === 'Reject');
        setRejectedBlogs(filteredBlogs2);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
  return (
    <div>

      <section className="dark:bg-gray-100 dark:text-gray-800">
        <div className="p-6 space-y-2 lg:col-span-5">
            <h1> Accepted Blogs</h1>
          <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {approvedBlogs.map((blog) => (
              <a
                key={blog.id}  
                rel="noopener noreferrer"
                href="#"
                className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50"
              >
                <img
                  role="presentation"
                  className="object-cover w-full rounded h-44 dark:bg-gray-500"
                  src={`http://localhost:5000/${blog.image_url}`}
                  alt=""
                />
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                    {blog.blog_title}
                  </h3>
                  <span className="text-xs dark:text-gray-600">{blog.author_name}</span>
                  <div dangerouslySetInnerHTML={{ __html: blog.blog_content }}></div>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-50 dark:text-gray-600"
            >
              Load more posts...
            </button>
          </div>
        </div>
      </section>

      <section className="dark:bg-gray-100 dark:text-gray-800">
        <h1> Rejected Blogs</h1>
        <div className="p-6 space-y-2 lg:col-span-5">
          <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rejectedBlogs.map((blog) => (
              <a
                key={blog.id}  
                rel="noopener noreferrer"
                href="#"
                className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50"
              >
                <img
                  role="presentation"
                  className="object-cover w-full rounded h-44 dark:bg-gray-500"
                  src={`http://localhost:5000/${blog.image_url}`}
                  alt=""
                />
                <div className="p-6 space-y-2">
                  <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                    {blog.blog_title}
                  </h3>
                  <span className="text-xs dark:text-gray-600">{blog.author_name}</span>
                  <div dangerouslySetInnerHTML={{ __html: blog.blog_content }}></div>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-50 dark:text-gray-600"
            >
              Load more posts...
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
