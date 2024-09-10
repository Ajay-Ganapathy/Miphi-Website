import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const addIdToParagraphs = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const strongTags = tempDiv.querySelectorAll('strong');
    const ids = [];

    strongTags.forEach((strong, index) => {
        const id = `strong-${index}`;
        strong.id = id;
        ids.push({
            id: id,
            content: strong.textContent
        });
    });

    return { html: tempDiv.innerHTML, ids };
};


const BlogContent = ({ blogContent, author_name , blogId }) => {

    const [user, setUser] = useState({
        profile_img : ''
});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [tags , setTags] = useState([]);

  
  const fetchTags = async (id) => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs/tags/${id}`);
        
          setTags(response.data);
          
      } catch (error) {
          console.error('Error fetching blogs:', error);
          setError('Error fetching blogs');
      } finally {
          setLoading(false);
      }
    };
  
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/author/details`, {
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

    const { html: modifiedHtmlContent, ids } = addIdToParagraphs(blogContent);
    const sanitizedHtmlContent = DOMPurify.sanitize(modifiedHtmlContent);

    const [highlightedId, setHighlightedId] = useState(null);

    useEffect(() => {
        const handleScroll = () => {
            const paragraphs = ids.map(({ id }) => document.getElementById(id));
            const inView = paragraphs.find(p => {
                if (!p) return false;
                const rect = p.getBoundingClientRect();
                return rect.top >= 0 && rect.bottom <= window.innerHeight;
            });
            setHighlightedId(inView ? inView.id : null);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [ids]);

    useEffect(() => {
        fetchTags(blogId)
    }, []);

    const location = useLocation();
    

    return (
        <div className="flex flex-col lg:flex-row lg:justify-start">
           
            <div style={{ width: '40vw' }} className="flex-1 px-4 lg:px-0 mt-12 mb-12 text-gray-700 max-w-screen-md text-lg leading-relaxed lg:mr-40">
                <div
                    dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
                ></div>
            </div>

            
            <div  style={{ width: '20vw' }} className="flex flex-col lg:fixed lg:top-44 lg:right-16 w-full lg:w-60 mt-8 mb-4 lg:mt-4 h-[80vh] ">
                <nav className="flex-1 overflow-y-auto pr-2 scrollbar-hidden">
               
                    <strong className="text-2xl mb-8 block text-center lg:text-left top-0  z-10">Highlights</strong>
                   
                    <ul className="mt-4 space-y-2 text-center lg:text-left">
                        {ids.map(({ id, content }) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    className={`transition-colors duration-500 ease-in-out ${highlightedId === id ? 'text-purple-900 font-bold' : 'text-gray-600'}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                                        setHighlightedId(id);
                                    }}
                                >
                                    {content}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {
                        tags.map((tag) => {
                            return(
                                <>
                                <h1><span class="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-2 mb-4 rounded dark:bg-green-900 dark:text-green-300">{tag.name}</span></h1> 
                                <br />
                                </>
                            )
                          
                        })
                    }
                </nav>

                {/* Author Info at the Bottom */}
                <div className="mt-4 mb-12 text-center lg:text-left">
    <hr className="my-4" />
    <h4 className="text-lg font-semibold mb-2">Author</h4>
    <div className="flex items-center space-x-4">  {/* Align image and text */}
        <h3 className="text-xl font-medium">{author_name}</h3>  {/* Adjust font size */}
        <img
            src={`${process.env.REACT_APP_API_URL}/${user.profile_img}`}
            alt=""
            className="w-24 h-24 rounded-full dark:bg-gray-500 aspect-square"
        />
    </div>
</div>

            </div>
        </div>
    );
};

export default BlogContent;
