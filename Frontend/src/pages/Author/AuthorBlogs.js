import React from 'react'
import Blogs from '../../Components/Blogs'
import styles from "./AuthorBlogs.modules.css"
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal2 from '../../Components/Modal2';
import { useState , useEffect } from 'react';

const truncateContent = (content, length = 100) => {
    if (content.length <= length) return content;
    return content.slice(0, length) + '...';
};

const AuthorBlogs = (props) => {

  const [approvedBlogs, setApprovedBlogs] = useState([]);
    const [rejectedBlogs, setRejectedBlogs] = useState([]);
    const [pendingBlogs, setPendingBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [blogs , setBlogs] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalInfo, setModalInfo] = useState({ isOpen: false, blogId: null });

    useEffect(() => {
        const fetchBlogs = async (userId) => {
            try {
                const response = await axios.get('http://localhost:5000/blogs');
                const filteredApproved = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Accept');
                const filteredRejected = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Reject');
                const filteredPending = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Pending');
                setBlogs(response.data.blogs);
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

  return (
    <div>
      {/* <Blogs user = {props.user}/> */}
      {console.log(blogs)}
      <div id={"initiatives"}>
      <section class="text-black mt-12">
        <div class="max-w-screen-xl px-4 py-15 mx-auto sm:px-6 lg:px-8">
       { 
        approvedBlogs.length > 0 &&
        <div class="max-w-lg mx-auto text-center">
          
          <h1 className={styles.mainHeading+" mb-16 pb-2 font-bold sm:text-xl text-2xl md:text-3xl text-center"}>
            Approved 
            <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              Blogs
            </span>
            <div className={styles.bottomLine}></div>
          </h1>
        </div>}

          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">        
          {
             approvedBlogs.length > 0 &&
             approvedBlogs.map((blog) => {
              return(

            
             
              <div className={styles.boxBorder+" block p-8 transition shadow-xl rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10"}>
               
                <img  src={`http://localhost:5000/${blog.image_url}`} alt=" Ariia img" />
                <h3 className="mt-4 text-xl font-bold text-center text-indblue">
                 {blog.author_name}
                </h3>
                <div dangerouslySetInnerHTML={{ __html: truncateContent(blog.blog_content, 120) }}></div>
               
                <div className={styles.plusImage} >
                <a href={`/author/blogs/${blog.id}` } state = {{blog}} className="text-blue-500 hover:underline">Read More</a>
                </div>
              </div>
  
            
  
              
  
             
                )
             })
             
          }

      </div>    
         
        

        </div>
      </section>

      <section class="text-black mt-12">
        <div class="max-w-screen-xl px-4 py-15 mx-auto sm:px-6 lg:px-8">
       { 
        rejectedBlogs.length > 0 &&
        <div class="max-w-lg mx-auto text-center">
          
          <h1 className={styles.mainHeading+" mb-16 pb-2 font-bold sm:text-xl text-2xl md:text-3xl text-center"}>
            Rejected 
            <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              Blogs
            </span>
            <div className={styles.bottomLine}></div>
          </h1>
        </div>}

          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">        
          {
             rejectedBlogs.length > 0 &&
             rejectedBlogs.map((blog) => {
              return(

            
             
              <div className={styles.boxBorder+" block p-8 transition shadow-xl rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10"}>
               
                <img  src={`http://localhost:5000/${blog.image_url}`} alt=" Ariia img" />
                <h3 className="mt-4 text-xl font-bold text-center text-indblue">
                 {blog.author_name}
                </h3>
                <div dangerouslySetInnerHTML={{ __html: truncateContent(blog.blog_content, 120) }}></div>
               
                <div className={styles.plusImage} >
                <Link to={`/author/blogs/${blog.id}` } state = {{blog}} className="text-blue-500 hover:underline">Read More</Link>
                <Link to={`/author/blogs/${blog.id}/edit` } state = {{blog}}  className="text-blue-500 hover:underline" >Edit </Link>
                </div>
              </div>
  
            
  
              
  
             
                )
             })
             
          }

      </div>    
         
        

        </div>
      </section>

      <section class="text-black mt-12">
        <div class="max-w-screen-xl px-4 py-15 mx-auto sm:px-6 lg:px-8">
       { 
        pendingBlogs.length > 0 &&
        <div class="max-w-lg mx-auto text-center">
          
          <h1 className={styles.mainHeading+" mb-16 pb-2 font-bold sm:text-xl text-2xl md:text-3xl text-center"}>
            Pending
            <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              Blogs
            </span>
            <div className={styles.bottomLine}></div>
          </h1>
        </div>}

          <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">        
          {
             pendingBlogs.length > 0 &&
             pendingBlogs.map((blog) => {
              return(

            
             
              <div className={styles.boxBorder+" block p-8 transition shadow-xl rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10"}>
               
                <img  src={`http://localhost:5000/${blog.image_url}`} alt=" Ariia img" />
                <h3 className="mt-4 text-xl font-bold text-center text-indblue">
                 {blog.author_name}
                </h3>
                <div dangerouslySetInnerHTML={{ __html: truncateContent(blog.blog_content, 120) }}></div>
               
                <div className={styles.plusImage} >
                <Link to={`/author/blogs/${blog.id}` } state = {{blog}} className="text-blue-500 hover:underline">Read More</Link>
                </div>
              </div>
  
            
  
              
  
             
                )
             })
             
          }

      </div>    
         
        

        </div>
      </section>
    </div>
    </div>
  )
}

export default AuthorBlogs