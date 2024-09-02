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

import { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import { Link } from 'react-router-dom';
import Form from '../../Components/Form';

const AuthorBlogs = () => {

  const [modalOpen, setModalOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  return (
    <div>
      
      
<div className={`flex h-screen bg-gray-800 ${isSideMenuOpen ? 'overflow-hidden' : ''}`}>


<Sidebar />

      {/* <main class="">
          
          <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400 w-100 h-100">
          <div class="grid grid-cols-12 gap-6">
                        <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                          
                            <div class="col-span-12 mt-8">
                            <Form />
                                <div class="flex items-center h-10 intro-y">
                                    
                                </div>
                            </div>
                        </div>
            </div>
            </div>
      </main> */}

<main class="">
          
          <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400">

              <div class="grid grid-cols-12 gap-6">
                  <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                      <div class="col-span-12 mt-8">
                          <div class="flex items-center h-10 intro-y">
                              <h2 class="mr-5 text-lg font-medium truncate">Dashboard</h2>
                          </div>
                          <div class="grid grid-cols-12 gap-6 mt-5">
                              <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                  href="#">
                                  <div class="p-5">
                                      <div class="flex justify-between">
                                          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-blue-400"
                                              fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="2"
                                                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                          </svg>
                                          <div
                                              class="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                              <span class="flex items-center">30%</span>
                                          </div>
                                      </div>
                                      <div class="ml-2 w-full flex-1">
                                          <div>
                                              <div class="mt-3 text-3xl font-bold leading-8">4.510</div>

                                              <div class="mt-1 text-base text-gray-600">Pending</div>
                                          </div>
                                      </div>
                                  </div>
                              </a>
                              <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                  href="#">
                                  <div class="p-5">
                                      <div class="flex justify-between">
                                          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-yellow-400"
                                              fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path stroke-linecap="round" stroke-linejoin="round"
                                                  stroke-width="2"
                                                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                          </svg>
                                          <div
                                              class="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                              <span class="flex items-center">30%</span>
                                          </div>
                                      </div>
                                      <div class="ml-2 w-full flex-1">
                                          <div>
                                              <div class="mt-3 text-3xl font-bold leading-8">4.510</div>

                                              <div class="mt-1 text-base text-gray-600">Accepted</div>
                                          </div>
                                      </div>
                                  </div>
                              </a>
                              <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                  href="#">
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
                                              class="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                              <span class="flex items-center">30%</span>
                                          </div>
                                      </div>
                                      <div class="ml-2 w-full flex-1">
                                          <div>
                                              <div class="mt-3 text-3xl font-bold leading-8">4.510</div>

                                              <div class="mt-1 text-base text-gray-600">Rejected</div>
                                          </div>
                                      </div>
                                  </div>
                              </a>
                              <a class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                  href="#">
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
                                              <span class="flex items-center">30%</span>
                                          </div>
                                      </div>
                                      <div class="ml-2 w-full flex-1">
                                          <div>
                                              <div class="mt-3 text-3xl font-bold leading-8">4.510</div>

                                              <div class="mt-1 text-base text-gray-600">Total</div>
                                          </div>
                                      </div>
                                  </div>
                              </a>
                          </div>
                      </div>
                      {/* <div class="col-span-12 mt-5">
                          <div class="grid gap-2 grid-cols-1 lg:grid-cols-2">
                              <div class="bg-white shadow-lg p-4" id="chartline"></div>
                              <div class="bg-white shadow-lg" id="chartpie"></div>
                          </div>
                      </div> */}
                      <div class="col-span-12 mt-5">
                          <div class="grid gap-2 grid-cols-1 lg:grid-cols-1">
                              <div class="bg-white p-4 shadow-lg rounded-lg">
                                  <h1 class="font-bold text-base">Blogs Submitted </h1>
                                  <div class="mt-4">
                                      <div class="flex flex-col">
                                          <div class="-my-2 overflow-x-auto">
                                              <div class="py-2 align-middle inline-block min-w-full">
                                                  <div
                                                      class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                                                      <table class="min-w-full divide-y divide-gray-200">
                                                          <thead>
                                                              <tr>
                                                                  <th
                                                                      class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                      <div class="flex cursor-pointer">
                                                                          <span class="mr-2">AUTHOR NAME</span>
                                                                      </div>
                                                                  </th>
                                                                  <th
                                                                      class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                      <div class="flex cursor-pointer">
                                                                          <span class="mr-2">BLOG TITLE</span>
                                                                      </div>
                                                                  </th>
                                                                  <th
                                                                      class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                      <div class="flex cursor-pointer">
                                                                          <span class="mr-2">BLOG CONTENT</span>
                                                                      </div>
                                                                  </th>
                                                                  
                                                                  <th
                                                                      class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                      <div class="flex cursor-pointer">
                                                                          <span class="mr-2">STATUS</span>
                                                                      </div>
                                                                  </th>
                                                                  <th
                                                                      class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                      <div class="flex cursor-pointer">
                                                                          <span class="mr-2">ACTION</span>
                                                                      </div>
                                                                  </th>
                                                                  <th
                                                                      class="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                                      <div class="flex cursor-pointer">
                                                                          <span class="mr-2">REMARKS</span>
                                                                      </div>
                                                                  </th>
                                                              </tr>
                                                          </thead>
                                                          <tbody class="bg-white divide-y divide-gray-200">
                                                         
                                                    
                                                          </tbody>
                                                      </table>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </main>
  
        </div>
      </div>
  )
}

export default AuthorBlogs