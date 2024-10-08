import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import BlogContent from '../../Components/BlogContent';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';

const BlogDetail = () => {
    const { id } = useParams();
    const location = useLocation();
    const { blog , user } = location.state || {};

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [tag , setTags] = useState([]);

    const fetchTags = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs/tags/${id}`);
          
            setTags(response.data.map((val) => val.name));
            
        } catch (error) {
            console.error('Error fetching blogs:', error);
            setError('Error fetching blogs');
        } finally {
            setLoading(false);
        }
      };
  
      useEffect(() => {
        fetchTags(blog.id);
  }, [])
  
  

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
        <div className = 'min-h-screen'>
          
                <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-orange-400 w-100  min-h-screen" >
                <div className="max-w-screen-xl mx-3 px-4 lg:px-0 ">
                    <main className="mt-12">
                    <h1 className="text-center lg:text-left mb-8 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800" style = {{fontFamily : 'Roboto Slab'}}>
                            {blog.blog_title}
                        </h1>
                    <div>
                        {

                        blog.image_url &&
                        <div className="mb-4 md:mb-0 w-full lg:w-3/4  lg:ml-0 relative" style={{ height: '24em' }}>
                            <div className="absolute left-0 top-0 w-full h-full z-0 object-cover rounded-lg shadow-lg max-w-3xl" style={{ backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))' }}></div>
                           <img
                                src={`${process.env.REACT_APP_API_URL}/${blog.image_url}`}
                                className="absolute left-0 top-0 w-full h-full z-0 object-cover rounded-lg shadow-lg max-w-3xl "
                                alt="Blog cover"
                            />
                        </div>

                        }

                        {console.log(tag)}
                        <div className="mt-6">
                        <BlogContent blogContent={blog.blog_content} author_name={blog.author_name} profile_img = {blog.profile_img} tags = {tag} blogId = {blog.id} state = {{user }} />
                        </div>

                    </div>

                    </main>
                </div>
                </div>
            </div>
        
    );
};

export default BlogDetail;
