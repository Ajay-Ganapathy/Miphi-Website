import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal2 from './Modal2';

const truncateContent = (content, length = 100) => {
    if (content.length <= length) return content;
    return content.slice(0, length) + '...';
};

const Blogs = () => {
    const [approvedBlogs, setApprovedBlogs] = useState([]);
    const [rejectedBlogs, setRejectedBlogs] = useState([]);
    const [pendingBlogs, setPendingBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async (userId) => {
            try {
                const response = await axios.get('http://localhost:5000/blogs');
                const filteredApproved = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Accept');
                const filteredRejected = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Reject');
                const filteredPending = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Pending');
                setApprovedBlogs(filteredApproved);
                setRejectedBlogs(filteredRejected);
                setPendingBlogs(filteredPending);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError('Error fetching blogs');
            } finally {
                setLoading(false);
            }
        };

        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/author/details', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
                fetchBlogs(response.data.id); // Fetch blogs after user details are fetched
            } catch (error) {
                setError(error.response?.data?.message || 'Error fetching user details');
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <section className="dark:bg-gray-100 dark:text-gray-800">
                <div className="p-6 space-y-2 lg:col-span-5">
                    <h1>Accepted Blogs</h1>
                    <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {approvedBlogs.length === 0 ? (
                            <p>No approved blogs available.</p>
                        ) : (
                            approvedBlogs.map((blog) => (
                                <div key={blog.id} className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
                                    <img
                                        role="presentation"
                                        className="object-cover w-full rounded h-44 dark:bg-gray-500"
                                        src={`http://localhost:5000/${blog.image_url}`}
                                        alt={blog.blog_title}
                                    />
                                    <div className="p-6 space-y-2">
                                        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                                            {blog.blog_title}
                                        </h3>
                                        <span className="text-xs dark:text-gray-600">{blog.author_name}</span>
                                        <div>
                                            <div dangerouslySetInnerHTML={{ __html: truncateContent(blog.blog_content, 120) }}></div>
                                            <Link to={`/author/blogs/${blog.id}` } state = {{blog}} className="text-blue-500 hover:underline">Read More</Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            <section className="dark:bg-gray-100 dark:text-gray-800">
                <h1>Rejected Blogs</h1>
                <div className="p-6 space-y-2 lg:col-span-5">
                    <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {rejectedBlogs.length === 0 ? (
                            <p>No rejected blogs available.</p>
                        ) : (
                            rejectedBlogs.map((blog) => (
                                <div key={blog.id} className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
                                    <img
                                        role="presentation"
                                        className="object-cover w-full rounded h-44 dark:bg-gray-500"
                                        src={`http://localhost:5000/${blog.image_url}`}
                                        alt={blog.blog_title}
                                    />
                                    <div className="p-6 space-y-2">
                                        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                                            {blog.blog_title}
                                        </h3>
                                        <span className="text-xs dark:text-gray-600">{blog.author_name}</span>
                                        <div>
                                            <div dangerouslySetInnerHTML={{ __html: truncateContent(blog.blog_content, 100) }}></div>
                                            <Link to={`/author/blogs/${blog.id}` } state = {{blog}}  className="text-blue-500 hover:underline">Read More</Link>
                                            <br />
                                           
                                            <Link to={`/author/blogs/${blog.id}/edit` } state = {{blog}}  className="text-blue-500 hover:underline" >Edit </Link>
                                         
                                            
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            
            <section className="dark:bg-gray-100 dark:text-gray-800">
                <h1>Pending Blogs</h1>
                <div className="p-6 space-y-2 lg:col-span-5">
                    <div className="grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {pendingBlogs.length === 0 ? (
                            <p>No Pending blogs available.</p>
                        ) : (
                            pendingBlogs.map((blog) => (
                                <div key={blog.id} className="max-w-sm mx-auto group hover:no-underline focus:no-underline dark:bg-gray-50">
                                    <img
                                        role="presentation"
                                        className="object-cover w-full rounded h-44 dark:bg-gray-500"
                                        src={`http://localhost:5000/${blog.image_url}`}
                                        alt={blog.blog_title}
                                    />
                                    <div className="p-6 space-y-2">
                                        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                                            {blog.blog_title}
                                        </h3>
                                        <span className="text-xs dark:text-gray-600">{blog.author_name}</span>
                                        <div>
                                            <div dangerouslySetInnerHTML={{ __html: truncateContent(blog.blog_content, 100) }}></div>
                                            <Link to={`/author/blogs/${blog.id}` } state = {{blog}}  className="text-blue-500 hover:underline">Read More</Link>
                                            <br />
                                           
                                            <Link to={`/author/blogs/${blog.id}/edit` } state = {{blog}}  className="text-blue-500 hover:underline" >Edit </Link>
                                         
                                            
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blogs;
