import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BlogContent from '../../Components/BlogContent';

const BlogSingle = () => {
    const { id } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, [id]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/blogs');
            const filteredBlogs = response.data.blogs.filter((blog) => blog.id === Number(id));
            setBlogs(filteredBlogs);
        } catch (error) {
            setError('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (blogs.length === 0) return <p>No blog found</p>;

    return (
        <div className="max-w-screen-xl mx-auto px-4 lg:px-0">
            <main className="mt-12">
            <h1 className="text-center lg:text-left mb-8 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                    {blogs[0].blog_title}
                </h1>
                <div className="mb-4 md:mb-0 w-full lg:w-3/4 mx-auto lg:ml-0 relative" style={{ height: '24em' }}>
                    <div className="absolute left-0 bottom-0 w-full h-full z-10" style={{ backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))' }}></div>
                    <img
                        src={`http://localhost:5000/${blogs[0].image_url}`}
                        className="absolute left-0 top-0 w-full h-full z-0 object-cover"
                        alt="Blog cover"
                    />
                </div>

               

                <div className="mt-6">
                    <BlogContent blogContent={blogs[0].blog_content} author_name={blogs[0].author_name} />
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

export default BlogSingle;
