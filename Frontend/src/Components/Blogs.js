import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Blogs = () => {
    const [approvedBlogs, setApprovedBlogs] = useState([]);
    const [rejectedBlogs, setRejectedBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user details
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/author/details', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                setError(error.response?.data?.message || 'Error fetching user details');
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    // Fetch blogs after user details are available
    useEffect(() => {
        if (user) {
            const fetchBlogs = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/blogs');
                    const filteredApproved = response.data.blogs.filter(blog => user.id == blog.author_id && blog.status === 'Accept');
                    const filteredRejected = response.data.blogs.filter(blog => user.id == blog.author_id && blog.status === 'Reject');
                    setApprovedBlogs(filteredApproved);
                    setRejectedBlogs(filteredRejected);
                } catch (error) {
                    console.error('Error fetching blogs:', error);
                }
            };

            fetchBlogs();
        }
    }, [user]);

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
                                        alt={blog.blog_title}
                                    />
                                    <div className="p-6 space-y-2">
                                        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                                            {blog.blog_title}
                                        </h3>
                                        <span className="text-xs dark:text-gray-600">{blog.author_name}</span>
                                        <div dangerouslySetInnerHTML={{ __html: blog.blog_content }}></div>
                                    </div>
                                </a>
                            ))
                        )}
                    </div>
                    <div className="flex justify-center">
                        {/* <button
                            type="button"
                            className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-50 dark:text-gray-600"
                        >
                            Load more posts...
                        </button> */}
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
                                        alt={blog.blog_title}
                                    />
                                    <div className="p-6 space-y-2">
                                        <h3 className="text-2xl font-semibold group-hover:underline group-focus:underline">
                                            {blog.blog_title}
                                        </h3>
                                        <span className="text-xs dark:text-gray-600">{blog.author_name}</span>
                                        <div dangerouslySetInnerHTML={{ __html: blog.blog_content }}></div>
                                    </div>
                                </a>
                            ))
                        )}
                    </div>
                    {/* <div className="flex justify-center">
                        <button
                            type="button"
                            className="px-6 py-3 text-sm rounded-md hover:underline dark:bg-gray-50 dark:text-gray-600"
                        >
                            Load more posts...
                        </button>
                    </div> */}
                </div>
            </section>
        </div>
    );
};

export default Blogs;
