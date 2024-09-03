import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import BlogContent from '../../Components/BlogContent';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';

const BlogDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const { blog } = location.state || {};

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    // Handle loading and error states here (if fetching data from an API)
    useEffect(() => {
        if (!blog) {
            // Simulate a delay and setting error
            setLoading(false);
            setError('Blog not found.');
        } else {
            setLoading(false);
        }
    }, [blog]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div >
          
                <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400 w-100 h-100" >
                <div className="max-w-screen-xl mx-auto px-4 lg:px-0 ">
                    <main className="mt-12">
                    <h1 className="text-center lg:text-left mb-8 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                            {blog.blog_title}
                        </h1>
                    <div>

                        <div className="mb-4 md:mb-0 w-full lg:w-3/4  lg:ml-0 relative" style={{ height: '24em' }}>
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

                    </div>

                    </main>
                </div>
                </div>
            </div>
        
    );
};

export default BlogDetail;
