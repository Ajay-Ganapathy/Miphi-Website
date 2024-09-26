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


const BlogContent = ({ blogContent, author_name , blogId , tags , profile_img }) => {
    const location = useLocation();

    const [user, setUser] = useState({
        profile_img : ''
});




  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //const [tag , setTags] = useState(tags.tags ? tags.tags.map((tag) => tag) :  []) ;
  

  
//   const fetchTags = async (id) => {
//       try {
//           const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs/tags/${id}`);
        
//           setTags(response.data);
          
//       } catch (error) {
//           console.error('Error fetching blogs:', error);
//           setError('Error fetching blogs');
//       } finally {
//           setLoading(false);
//       }
//     };
  
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

    // useEffect(() => {
    //     fetchTags(blogId)
    // }, []);

   
    

    return (
        <div className="flex flex-col lg:flex-row lg:justify-start">
           
            <div style={{ width: '40vw' }} className="flex-1 px-4 lg:px-0 mt-12 mb-12 text-gray-700 max-w-screen-md text-lg leading-relaxed lg:mr-48">
                <div
                    dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}

                    
                ></div>

<h4 className="text-lg font-semibold mb-2 mt-4"> Tags </h4>
    <div className="flex flex-wrap items-start space-x-4"> 

    {/* <div className="flex flex-col items-start space-y-4"> 
  {
    tags.length > 0 &&
    tags.map((ta, index) => (
      <div key={index} className="mb-4"> 
        <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-2 rounded dark:bg-green-900 dark:text-green-300">
          {ta}
        </span>
      </div>
    ))
  }
</div> */}

      
    {
  tags.length > 0 &&
    tags.map((ta, index) => (
      <div key={index} className="mb-4"> 
        <span
          className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-2 rounded dark:bg-green-900 dark:text-green-300"
        >
          {ta}
        </span>
      </div>
    ))
}
    </div>
            </div>

            
            <div  style={{ width: '15vw' }} className="flex flex-col lg:fixed lg:top-44 lg:right-16 w-full lg:w-60 mt-8 mb-4 lg:mt-12 h-[80vh] ">
                <nav className="flex-1 overflow-y-auto pr-2 scrollbar-hidden">
               
                    <strong className="text-2xl mb-8 block text-center lg:text-left top-0  z-10">Highlights</strong>
                   
                    <ul className="mt-4 space-y-2 text-center lg:text-left h-[20vh]">
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

                  
                </nav>

                <div className="mt-4 mb-12 text-center lg:text-left">
    <hr className="my-4" />
   
    </div>

    

              

           
                <div className="mt-4 mb-32 text-center lg:text-left">
    <hr className="my-4" />
    <h4 className="text-lg font-semibold mb-2">Author</h4>
    <div className="flex items-center space-x-4">  
        <h3 className="text-sm font-medium">{author_name}</h3> 
        <img
            src={`${process.env.REACT_APP_API_URL}/${profile_img}`}
            alt=""
            className="w-12 h-12 rounded-full dark:bg-gray-500 aspect-square"
        />
    </div>
</div>

            </div>
        </div>
    );
};

export default BlogContent;
