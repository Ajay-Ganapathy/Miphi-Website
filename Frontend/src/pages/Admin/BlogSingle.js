import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BlogContent from '../../Components/BlogContent';

// BlogContent component
// const BlogContent = ({ blogContent }) => {
//     // Function to add IDs to <p> tags
//     const addIdToParagraphs = (html) => {
//         // Create a temporary DOM element to manipulate the HTML
//         const tempDiv = document.createElement('div');
//         tempDiv.innerHTML = html;

//         // Find all <p> tags and add an ID
//         const paragraphs = tempDiv.querySelectorAll('b');
//         paragraphs.forEach((p, index) => {
//             p.id = `paragraph-${index}`;
//         });

//         return tempDiv.innerHTML;
//     };

//     const modifiedHtmlContent = addIdToParagraphs(blogContent);
//     const sanitizedHtmlContent = DOMPurify.sanitize(modifiedHtmlContent); // Sanitize HTML

//     return (
//         <div
//             className="px-4 lg:px-0 mt-12 text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed"
//             dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
//         ></div>
//     );
// };

// BlogSingle component
const BlogSingle = () => {
    const { id } = useParams();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBlogs();
    }, [id]); // Fetch when `id` changes

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
        <div>
            <div className="max-w-screen-xl mx-auto">
          

                <main className="mt-10">
                    <div className="mb-4 md:mb-0 w-90 max-w-screen-md ml-32 relative" style={{ height: '24em' }}>
                        <div className="absolute left-0 bottom-0 w-full h-full z-10" style={{ backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))' }}></div>
                        <img src={`http://localhost:5000/${blogs[0].image_url}`} className="absolute left-0 top-0 w-full h-full z-0 object-cover" alt="Blog cover" />
                        <div className="p-4 absolute bottom-0 left-0 z-20">
                            <a href="#" className="px-4 py-1 bg-black text-gray-200 inline-flex items-center justify-center mb-2">Domain</a>
                            <h2 className="text-4xl font-semibold text-gray-100 leading-tight">
                                {blogs[0].blog_title}
                            </h2>
                            <div className="flex mt-3">
                                <div>
                                    <p className="font-semibold text-gray-200 text-sm">{blogs[0].author_name}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <BlogContent blogContent={blogs[0].blog_content} />

                </main>

                <footer className="border-t mt-32 pt-12 pb-32 px-4 lg:px-0">
                    <div className="flex">
                        <div className="w-full md:w-1/3 lg:w-1/4">
                            <h6 className="font-semibold text-gray-700 mb-4">Company</h6>
                            <ul>
                                <li><a href="#" className="block text-gray-600 py-2">Team</a></li>
                                <li><a href="#" className="block text-gray-600 py-2">About us</a></li>
                                <li><a href="#" className="block text-gray-600 py-2">Press</a></li>
                            </ul>
                        </div>
                        <div className="w-full md:w-1/3 lg:w-1/4">
                            <h6 className="font-semibold text-gray-700 mb-4">Content</h6>
                            <ul>
                                <li><a href="#" className="block text-gray-600 py-2">Blog</a></li>
                                <li><a href="#" className="block text-gray-600 py-2">Privacy Policy</a></li>
                                <li><a href="#" className="block text-gray-600 py-2">Terms & Conditions</a></li>
                                <li><a href="#" className="block text-gray-600 py-2">Documentation</a></li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default BlogSingle;
