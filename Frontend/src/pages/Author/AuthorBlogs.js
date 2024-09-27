// import React from 'react'
// import Blogs from '../../Components/Blogs'
// import styles from "./AuthorBlogs.modules.css"
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Modal2 from '../../Components/Modal2';
// import { useState , useEffect } from 'react';

// const truncateContent = (content, length = 100) => {
//     if (content.length <= length) return content;
//     return content.slice(0, length) + '...';
// };

// const AuthorBlogs = (props) => {

//   const [approvedBlogs, setApprovedBlogs] = useState([]);
//     const [rejectedBlogs, setRejectedBlogs] = useState([]);
//     const [pendingBlogs, setPendingBlogs] = useState([]);
//     const [user, setUser] = useState(null);
//     const [blogs , setBlogs] = useState([])
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [modalInfo, setModalInfo] = useState({ isOpen: false, blogId: null });

//     useEffect(() => {
//         const fetchBlogs = async (userId) => {
//             try {
//                 const response = await axios.get('http://localhost:5000/blogs');
//                 const filteredApproved = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Accept');
//                 const filteredRejected = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Reject');
//                 const filteredPending = response.data.blogs.filter(blog => userId == blog.author_id && blog.status === 'Pending');
//                 setBlogs(response.data.blogs);
//                 setApprovedBlogs(filteredApproved);
//                 setRejectedBlogs(filteredRejected);
//                 setPendingBlogs(filteredPending);
//             } catch (error) {
//                 console.error('Error fetching blogs:', error);
//                 setError('Error fetching blogs');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const fetchUserDetails = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const response = await axios.get('http://localhost:5000/author/details', {
//                     headers: { Authorization: `Bearer ${token}` },
//                 });
//                 setUser(response.data);
//                 fetchBlogs(response.data.id); // Fetch blogs after user details are fetched
//             } catch (error) {
//                 setError(error.response?.data?.message || 'Error fetching user details');
//                 setLoading(false);
//             }
//         };

//         fetchUserDetails();
//     }, []);

//   return (
//     <div>
//       {/* <Blogs user = {props.user}/> */}
//       {console.log(blogs)}
//       <div id={"initiatives"}>
//       <section class="text-black mt-12">
//         <div class="max-w-screen-xl px-4 py-15 mx-auto sm:px-6 lg:px-8">
//        { 
//         approvedBlogs.length > 0 &&
//         <div class="max-w-lg mx-auto text-center">
          
//           <h1 className={styles.mainHeading+" mb-16 pb-2 font-bold sm:text-xl text-2xl md:text-3xl text-center"}>
//             Approved 
//             <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
//               Blogs
//             </span>
//             <div className={styles.bottomLine}></div>
//           </h1>
//         </div>}

//           <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">        
//           {
//              approvedBlogs.length > 0 &&
//              approvedBlogs.map((blog) => {
//               return(

            
             
//               <div className={styles.boxBorder+" block p-8 transition shadow-xl rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10"}>
               
//                 <img  src={`http://localhost:5000/${blog.image_url}`} alt=" Ariia img" style = {{height : "50%"}} />
//                 <h3 className="mt-4 text-xl font-bold text-center text-indblue">
//                  {blog.author_name}
//                 </h3>
//                 <div dangerouslySetInnerHTML={{ __html: truncateContent(blog.blog_content, 120) }}></div>
               
//                 <div className={styles.plusImage} >
//                 <a href={`/author/blogs/${blog.id}` } state = {{blog}} className="text-blue-500 hover:underline">Read More</a>
//                 </div>
//               </div>
  
            
  
              
  
             
//                 )
//              })
             
//           }

//       </div>    
         
        

//         </div>
//       </section>

//       <section class="text-black mt-12">
//         <div class="max-w-screen-xl px-4 py-15 mx-auto sm:px-6 lg:px-8">
//        { 
//         rejectedBlogs.length > 0 &&
//         <div class="max-w-lg mx-auto text-center">
          
//           <h1 className={styles.mainHeading+" mb-16 pb-2 font-bold sm:text-xl text-2xl md:text-3xl text-center"}>
//             Rejected 
//             <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
//               Blogs
//             </span>
//             <div className={styles.bottomLine}></div>
//           </h1>
//         </div>}

//           <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">        
//           {
//              rejectedBlogs.length > 0 &&
//              rejectedBlogs.map((blog) => {
//               return(

            
             
//               <div className={styles.boxBorder+" block p-8 transition shadow-xl rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10"}>
               
//                 <img  src={`http://localhost:5000/${blog.image_url}`} alt=" Ariia img" />
//                 <h3 className="mt-4 text-xl font-bold text-center text-indblue">
//                  {blog.author_name}
//                 </h3>
//                 <div dangerouslySetInnerHTML={{ __html: truncateContent(blog.blog_content, 120) }}></div>
               
//                 <div className={styles.plusImage} >
//                 <Link to={`/author/blogs/${blog.id}` } state = {{blog}} className="text-blue-500 hover:underline">Read More</Link>
//                 <Link to={`/author/blogs/${blog.id}/edit` } state = {{blog}}  className="text-blue-500 hover:underline" >Edit </Link>
//                 </div>
//               </div>
  
            
  
              
  
             
//                 )
//              })
             
//           }

//       </div>    
         
        

//         </div>
//       </section>

//       <section class="text-black mt-12">
//         <div class="max-w-screen-xl px-4 py-15 mx-auto sm:px-6 lg:px-8">
//        { 
//         pendingBlogs.length > 0 &&
//         <div class="max-w-lg mx-auto text-center">
          
//           <h1 className={styles.mainHeading+" mb-16 pb-2 font-bold sm:text-xl text-2xl md:text-3xl text-center"}>
//             Pending
//             <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
//               Blogs
//             </span>
//             <div className={styles.bottomLine}></div>
//           </h1>
//         </div>}

//           <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-3">        
//           {
//              pendingBlogs.length > 0 &&
//              pendingBlogs.map((blog) => {
//               return(

            
             
//               <div className={styles.boxBorder+" block p-8 transition shadow-xl rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10"}>
               
//                 <img  src={`http://localhost:5000/${blog.image_url}`} alt=" Ariia img" />
//                 <h3 className="mt-4 text-xl font-bold text-center text-indblue">
//                  {blog.author_name}
//                 </h3>
//                 <div dangerouslySetInnerHTML={{ __html: truncateContent(blog.blog_content, 120) }}></div>
               
//                 <div className={styles.plusImage} >
//                 <Link to={`/author/blogs/${blog.id}` } state = {{blog}} className="text-blue-500 hover:underline">Read More</Link>
//                 </div>
//               </div>
  
            
  
              
  
             
//                 )
//              })
             
//           }

//       </div>    
         
        

//         </div>
//       </section>
//     </div>
//     </div>
//   )
// }

// export default AuthorBlogs


import React from 'react'

import { useState , useEffect } from 'react';
import Sidebar from '../../Components/Sidebar';
import { Link } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import axios from 'axios';
import styles from "./AuthorBlogs.modules.css";
import Modal2 from '../../Components/Modal2';
import { useLocalContext } from '../../Context/context';

// const truncateContent = (content, length = 100) => {
//   if (content.length <= length) return content;
//   return content.slice(0, length) + '...';
// };

const truncateContent = (content, length = 100) => {
  if (content.length <= length) return content;

  const words = content.split(' ');
  let truncated = '';
  
  for (const word of words) {
      // If adding the next word exceeds the length, break the loop
      if (truncated.length + word.length + 1 > length) {
          // Break long words if they exceed the max length
          if (word.length > length) {
              truncated += word.slice(0, length) + '...';
          } else {
              truncated += '...';
          }
          break;
      }
      
      // Add the word to the truncated string
      truncated += (truncated.length > 0 ? ' ' : '') + word;
  }
  
  return truncated;
};


const Home = () => {
  const [approvedBlogs, setApprovedBlogs] = useState([]);
  const [rejectedBlogs, setRejectedBlogs] = useState([]);
  const [pendingBlogs, setPendingBlogs] = useState([]);
  const [revertedBlogs, setRevertedBlogs] = useState([]);
  const [draftedBlogs, setDraftedBlogs] = useState([]);
  const [userCount, setUserCount] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tag, setTags] = useState([]);
  const [userLoading, setUserLoading] = useState(true); // New loading state for user
  
  const { user } = useLocalContext();

  const fetchUserBlogs = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs`);
      const filteredApproved = response.data.blogs.filter(blog => userId === blog.author_id && blog.status === 'Accept');
      const filteredRejected = response.data.blogs.filter(blog => userId === blog.author_id && blog.status === 'Reject');
      const filteredPending = response.data.blogs.filter(blog => userId === blog.author_id && blog.status === 'Pending');
      const filteredReverted = response.data.blogs.filter(blog => userId === blog.author_id && blog.status === 'Revert');
      const filteredDrafts = response.data.blogs.filter(blog => userId === blog.author_id && blog.status === 'Draft');
      setBlogs(response.data.blogs);
      setApprovedBlogs(filteredApproved);
      setRejectedBlogs(filteredRejected);
      setPendingBlogs(filteredPending);
      setRevertedBlogs(filteredReverted);
      setDraftedBlogs(filteredDrafts);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Error fetching blogs');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserCount = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs/count/${userId}`);
      setUserCount(response.data);
    } catch (error) {
      console.error('Error fetching count:', error);
      setError('Error Fetching Count!');
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs/tags/${id}`);
      setTags(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
      setError('Error fetching tags');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && user.id) {
      setUserLoading(false); // Once user data is available, stop loading
    }
  }, [user]);

  useEffect(() => {
    if (!userLoading && user && user.id) {  // Ensure user data is ready
      fetchUserBlogs(user.id);
      fetchUserCount(user.id);
      fetchTags(user.id);
    }
  }, [userLoading, user]);



  const [modalOpen, setModalOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  return (
    <div>
      {console.log(user)}
      {
        loading ? (<div> Loading ... </div> ) : 
        <main class="">
                  
                  <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400 w-100 h-100">
                  <div class="grid grid-cols-12 gap-6">
                                <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                                  
                                    <div class="col-span-12 mt-8">
                                     
                                         <div>
        
                                         <div class="grid grid-cols-12 gap-6 mt-5">
                                        <Link class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                                to ="/author/pending">
                                                <div class="p-5">
                                                    <div class="flex justify-between">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-yellow-400"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                        </svg>
                                                        <div
                                                            class="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                            <span class="flex items-center">{ Math.round(((userCount.pending) / (userCount.pending + userCount.reject + userCount.accept) * 100),2)}%</span>
                                                        </div>
                                                    </div>
                                                    <div class="ml-2 w-full flex-1">
                                                        <div>
                                                            <div class="mt-3 text-3xl font-bold leading-8">{userCount.pending} </div>
        
                                                            <div class="mt-1 text-base text-gray-600">Pending</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                         
        
                                            <Link class="transform   hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                                to="/author/approved">
                                                <div class="p-5">
                                                    <div class="flex justify-between">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-400"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                        </svg>
                                                        <div
                                                            class="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                            <span class="flex items-center">{ Math.round(((userCount.accept) / (userCount.pending + userCount.reject + userCount.accept) * 100) , 2)}%</span>
                                                        </div>
                                                    </div>
                                                    <div class="ml-2 w-full flex-1">
                                                        <div>
                                                            <div class="mt-3 text-3xl font-bold leading-8">{userCount.accept}</div>
        
                                                            <div class="mt-1 text-base text-gray-600">Accepted</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
        
                                           
                                           
                                            <Link class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                                to="/author/rejected">
                                                <div class="p-5">
                                                    <div class="flex justify-between">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-pink-600"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                                                        </svg>
                                                        <div
                                                            class="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                            <span class="flex items-center">{ Math.round(((userCount.reject) / (userCount.pending + userCount.reject + userCount.accept) * 100))}%</span>
                                                        </div>
                                                    </div>
                                                    <div class="ml-2 w-full flex-1">
                                                        <div>
                                                            <div class="mt-3 text-3xl font-bold leading-8">{userCount.reject}</div>
        
                                                            <div class="mt-1 text-base text-gray-600">Rejected</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                            <Link class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                                to="/author">
                                                <div class="p-5">
                                                    <div class="flex justify-between">
                                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-green-400"
                                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                                stroke-width="2"
                                                                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                                                        </svg>
                                                        <div
                                                            class="bg-blue-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                            <span class="flex items-center">100%</span>
                                                        </div>
                                                    </div>
                                                    <div class="ml-2 w-full flex-1">
                                                        <div>
                                                            
                                                            <div class="mt-3 text-3xl font-bold leading-8">{userCount.pending + userCount.reject + userCount.accept}</div>
        
                                                            <div class="mt-1 text-base text-gray-600">Total</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                        
              {/* <Blogs user = {props.user}/> */}
        
             
        
              {
                (approvedBlogs.length == 0 && rejectedBlogs.length == 0 && pendingBlogs.length == 0) &&  <div class="max-w-lg mx-auto text-center">
                  
                <h1 className={styles.mainHeading+" mb-16 pb-2 font-bold sm:text-xl text-2xl md:text-3xl text-center"}>
                  You havent updated
                  <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
                    any Blogs yet
                  </span>
                  <div className={styles.bottomLine}></div>
                </h1>
              </div>
              }
               {console.log(blogs )}
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
        
                  <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-2">        
                  {
                     approvedBlogs.length > 0 &&
                     approvedBlogs.map((blog) => {
                      return(
        
                    
                     
                      <div className={styles.boxBorder+" block p-12 transition shadow-xl rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10"}>
                       
                        <img  src={`${process.env.REACT_APP_API_URL}/${blog.image_url}`} alt=" Ariia img" className="w-full h-auto rounded-t-xl" />
                        <h3 className="mt-4 text-xl font-bold text-center text-indigo-600">
                        {blog.blog_title}
                        </h3>
                        
                        {/* <div dangerouslySetInnerHTML={{ __html: truncateContent(blog.blog_content, 120) }} className = "h-20 word-wrap"></div> */}
                       
                        <div className="flex mt-2 justify-center ">
                          <Link to={`/author/blogs/${blog.id}`} state={{ blog , user}} className="btn bg-teal-500 text-white hover:bg-teal-600 py-2 px-4 rounded">
                            Read More
                          </Link>
                          
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
        
                  <div className="grid grid-cols-1 gap-8 mt-12 md:grid-cols-2 lg:grid-cols-2">        
                  {
                     rejectedBlogs.length > 0 &&
                     rejectedBlogs.map((blog) => {
                      return(
        
                    
                        <div className={`${styles.boxBorder} block h-50 p-8 transition-shadow shadow-xl rounded-xl w-full hover:shadow-pink-500/10 hover:border-pink-500/10`}>
                        <img src={`${process.env.REACT_APP_API_URL}/${blog.image_url}`} alt="Blog Image" className="  w-full  z-0 object-cover rounded-lg shadow-lg max-w-3xl" />
                      
                        
                        <h3 className="mt-4 text-xl font-bold text-center text-indigo-600">
                        {blog.blog_title}
                        </h3>
                        
                        {/* <div className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: truncateContent(blog.blog_content, 120) }}></div> */}
                        
                        <div className="mt-4 flex justify-between items-center">
                          <Link to={`/author/blogs/${blog.id}`} state={{ blog }} className="btn bg-teal-500 text-white hover:bg-teal-600 py-2 px-4 rounded">
                            Read More
                          </Link>
                          
                          <Link to={`/author/blogs/${blog.id}/edit`} state={{ blog , tag }} className="btn bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded">
                            Edit
                          </Link>
        
        
                          <Modal2 title = "Remarks" remarks = {blog.remarks}  />
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
        
                  <div className="grid grid-cols-12 gap-12 mt-12 md:grid-cols-2 lg:grid-cols-2">        
                  {
                     pendingBlogs.length > 0 &&
                     pendingBlogs.map((blog) => {
                      return(
        
                    
                     
                      <div className={styles.boxBorder+"   block p-8 transition shadow-xl rounded-xl hover:shadow-pink-500/10 hover:border-pink-500/10"} >
                       
                        <img  src={`${process.env.REACT_APP_API_URL}/${blog.image_url}`} alt=" Ariia img" className="w-full h-30 rounded-t-xl" />
                        <h3 className="mt-4 text-xl font-bold text-center text-indigo-600">
                        {blog.blog_title}
                        </h3>
                        
                        {/* <div dangerouslySetInnerHTML={{ __html: truncateContent(blog.blog_content, 100) }}  className = "h-20 word-wrap" ></div> */}
                       
                        <div className="mt-4 flex flex-start items-center">
                          <Link to={`/author/blogs/${blog.id}`} state={{ blog }}className="btn bg-teal-500 mr-3  text-white hover:bg-teal-600 py-1 px-4 rounded">
                            Read More
                          </Link>
        
                          <Modal2 title = "Delete" id = {blog.id} pendingBlogs = {pendingBlogs} setPendingBlogs = {setPendingBlogs}  />
                          
                       
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
                                        <div class="flex items-center h-10 intro-y">
                                            
                                        </div>
                                    </div>
                                </div>
                    </div>
                    </div>
              </main>

      }
      
      

          
       
    </div>


    
  )
}

export default Home;
