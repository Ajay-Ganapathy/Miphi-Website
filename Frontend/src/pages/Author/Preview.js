import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import BlogContent from '../../Components/BlogContent';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import { Link } from 'react-router-dom';

const Preview = () => {
    const { id } = useParams();
    const location = useLocation();
    const { blog , user , title , image , blogContent , tags } = location.state || {};

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const data = {
        "blog_content" : blogContent ,
        "title" : title ,
        
        "image" : image
        
       
    }


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
          {console.log(tags)}
                <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-orange-400 w-100 h-100" >
                    <div className='flex justify-end'>

                    {

                        !blog.id ?
                            <Link to={`/author/posts`} state={{ data ,  tags }} className="btn  text-black  py-2 px-4 rounded">
                            Edit
                        </Link>
                        :

                       
                        <Link to={`/author/blogs/${blog.id}/edit`} state={{ blog , data , tags}} className="btn text-black py-2 px-4 rounded">
                        Edit

                        { console.log(data) }
                        </Link>
                    } 


                    </div>
                  
                       
               

            
                <div className="max-w-screen-xl mx-3 px-4 lg:px-0 ">
                    <main className="mt-12">
                    <h1 className="text-center lg:text-left mb-8 text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
                            {title}
                        </h1>
                    <div>

                    {
                            image && image != ' ' &&  
                        <div className="mb-4 md:mb-0 w-full lg:w-3/4  lg:ml-0 relative" style={{ height: '24em' }}>
                            <div className="absolute left-0 top-0 w-full h-full z-0 object-cover rounded-lg shadow-lg max-w-3xl" style={{ backgroundImage: 'linear-gradient(180deg,transparent,rgba(0,0,0,.7))' }}></div>
                             <img
                                src={`${image}`}
                                className="absolute left-0 top-0 w-full h-full z-0 object-cover rounded-lg shadow-lg max-w-3xl "
                                alt="Blog cover"
                            />

                        </div>
}
                        <div className="mt-6">
                        <BlogContent blogContent={blogContent} author_name={blog.author_name} blogId = {blog.id} tags = {tags} state = {{user}} />
                        </div>

                    </div>

                    </main>
                </div>
                </div>
            </div>
        
    );
};

export default Preview;
