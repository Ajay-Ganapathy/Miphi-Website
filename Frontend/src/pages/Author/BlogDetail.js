import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import BlogContent from '../../Components/BlogContent';

const BlogDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const {blog } = location.state || {}
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    
    if (error) return <p>{error}</p>;
    // console.log(blog)
    // console.log(id)

    if (!blog) return <p>Blog not found.</p>;

    return (
        <div className="max-w-screen-xl mx-auto px-4 lg:px-0">
            <main className="mt-12">
            <h1 className="text-center lg:text-left mb-8 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                    {blog.blog_title}
                </h1>
                <div className="mb-4 md:mb-0 w-full lg:w-3/4 mx-auto lg:ml-0 relative" style={{ height: '24em' }}>
                    <div className="absolute left-0 bottom-0 w-full h-full z-10" style={{ backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))' }}></div>
                    <img
                        src={`http://localhost:5000/${blog.image_url}`}
                        className="absolute left-0 top-0 w-full h-full z-0 object-cover"
                        alt="Blog cover"
                    />
                </div>

               

                <div className="mt-6">
                    <BlogContent blogContent={blog.blog_content} author_name={blog.author_name} />
                </div>
            </main>

            {/* <footer className="border-t mt-12 pt-12 pb-32">
                <div className="flex flex-wrap justify-between">
                    <div className="w-full md:w-1/3 lg:w-1/4 mb-8">
                        <h6 className="font-semibold text-gray-700 mb-4">Company</h6>
                        <ul>
                            <li><a href="#" className="block text-gray-600 py-2">Team</a></li>
                            <li><a href="#" className="block text-gray-600 py-2">About us</a></li>
                            <li><a href="#" className="block text-gray-600 py-2">Press</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 lg:w-1/4 mb-8">
                        <h6 className="font-semibold text-gray-700 mb-4">Content</h6>
                        <ul>
                            <li><a href="#" className="block text-gray-600 py-2">Blog</a></li>
                            <li><a href="#" className="block text-gray-600 py-2">Privacy Policy</a></li>
                            <li><a href="#" className="block text-gray-600 py-2">Terms & Conditions</a></li>
                            <li><a href="#" className="block text-gray-600 py-2">Documentation</a></li>
                        </ul>
                    </div>
                    {/* Add more footer columns here if needed */}
                {/* </div>
            </footer> */} 
        </div>
    );
};

export default BlogDetail;
