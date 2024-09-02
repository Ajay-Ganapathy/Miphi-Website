import React from 'react'
import { useState , useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from '../../Components/Modal';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Sidebar from '../../Components/Sidebar';
const Dashboard2 = () => {

    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isOpens, setIsOpen] = useState(false);
  const [open , isOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpens);
  const [isItemOpen, setIsItemOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [actionType, setActionType] = useState('');
  

  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
  const toggleNotificationsMenu = () => setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleItemOpen = () => setIsItemOpen(!isItemOpen);
  const closeNotificationsMenu = () => setIsNotificationsMenuOpen(false);
  const closeProfileMenu = () => setIsProfileMenuOpen(false);
  const [remarks, setRemarks] = useState(''); 
  const [count , setCount] = useState([])
  const [error , setError] = useState('')

  const [blogs, setBlogs] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
    
  }, []);

  useEffect(() => {
    fetchCount();
    
  }, []);

 

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/blogs');
      setBlogs(response.data.blogs.sort((a,b) => b.id - a.id));
      //console.log(blogs)
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const fetchCount = async () => {
    try{
      const response = await axios.get("http://localhost:5000/blogs/count");
      console.log(response)
      setCount(response.data);
      

    }catch(error){
      console.log("Error occured " , error);
      setError("Error Fetching Count ! ");
    }
  }

  const handleAccept = async (id , status) => {
    try {
     
      console.log(status === "Accept")
      await axios.put(`http://localhost:5000/blogs/${id}/status`, { status, remarks });
      console.log("Updated Success");
      fetchCount();

      if(status === "Accept"){
        setBlogs(
          blogs.map(blog =>
            blog.id === id ? { ...blog, status, remarks : " "} : blog
          )
        );
      }else{
        setBlogs(
          blogs.map(blog =>
            blog.id === id ? { ...blog, status, remarks } : blog
          )
        );
      }
     
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
 
  };


  const handleReject = async (id , status , remarks) => {
    try {
     
  
      await axios.put(`http://localhost:5000/blogs/${id}/status`, { status, remarks });
      console.log("Updated Success" , remarks);
      fetchCount();

      if(remarks === ""){
        setBlogs(
          blogs.map(blog =>
            blog.id === id ? { ...blog, status, remarks : " "} : blog
          )
        );
      }else{
        setBlogs(
          blogs.map(blog =>
            blog.id === id ? { ...blog, status, remarks } : blog
          )
        );
      }
     
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
 
  };


  const openModal = (id, type) => {
    setCurrentBlogId(id);
    setActionType(type);
    setModalOpen(true);
  };

  const handleConfirm = (remarks) => {
    if (actionType === "Reject") {
      handleReject(currentBlogId, "Reject" , remarks);
    } else {
      handleAccept(currentBlogId , "Accept");
    }
    setModalOpen(false);
  };


  return (
    <div>
       

<div className={`flex h-screen bg-gray-800 ${isSideMenuOpen ? 'overflow-hidden' : ''}`}>

       
       <Sidebar />

      
      

        <div class="flex flex-col flex-1 w-full overflow-y-auto">

       <Navbar />
   
          
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
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-yellow-400"
                                                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path stroke-linecap="round" stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                <div
                                                    class="bg-yellow-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                    <span class="flex items-center">{ Math.round(((count.pending) / (count.pending + count.reject + count.accept) * 100),2)}%</span>
                                                </div>
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">{count.pending} </div>

                                                    <div class="mt-1 text-base text-gray-600">Pending</div>
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
                                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                                </svg>
                                                <div
                                                    class="bg-green-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                    <span class="flex items-center">{ Math.round(((count.accept) / (count.pending + count.reject + count.accept) * 100) , 2)}%</span>
                                                </div>
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">{count.accept}</div>

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
                                                    class="bg-red-500 rounded-full h-6 px-2 flex justify-items-center text-white font-semibold text-sm">
                                                    <span class="flex items-center">{ Math.round(((count.reject) / (count.pending + count.reject + count.accept) * 100))}%</span>
                                                </div>
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    <div class="mt-3 text-3xl font-bold leading-8">{count.reject}</div>

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
                                                    <span class="flex items-center">100%</span>
                                                </div>
                                            </div>
                                            <div class="ml-2 w-full flex-1">
                                                <div>
                                                    
                                                    <div class="mt-3 text-3xl font-bold leading-8">{count.pending + count.reject + count.accept}</div>

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
                                                                {
  blogs.map((blog) => {
    return (
      <tr key={blog.id}> {/* Ensure each row has a unique key */}
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
          <p>{blog.author_name}</p>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
          <p>{blog.blog_title}</p>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
        <Link to={`/admin/blogs/${blog.id}`} 
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      
      >
        View Blog
      </Link>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
       
           
            {blog.status === 'Accept' && <span className="text-green-600">
                <div className="flex text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
                Accepted
                </div>
                </span>}
                  {blog.status === 'Reject' &&<span className="text-red-600">
                <div className="flex text-red-500">
                <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5 mr-1"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M6 18L18 6M6 6l12 12"
  />
</svg>
                Rejected
                </div>
                </span>}
                  {blog.status === 'Pending' && <span className="text-yellow-600">
                <div className="flex text-yellow-500">
           <svg
  xmlns="http://www.w3.org/2000/svg"
  className="w-5 h-5 mr-1"
  fill="none"
  viewBox="0 0 24 24"
  stroke="currentColor"
>
  <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    d="M12 4v8m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
  />
</svg>
                Pending
                </div>
                </span>}
         
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
          <div className="flex space-x-4">
            <button onClick = {() => openModal(blog.id , "Accept")} className="text-green-500 hover:text-green-600">

            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.707 5.293a1 1 0 00-1.414 0L10 13.586 5.707 9.293a1 1 0 00-1.414 1.414l5.5 5.5a1 1 0 001.414 0l9-9a1 1 0 000-1.414z" fill="#4CAF50"/>
            </svg>
              <p>Accept</p>
            </button>
            <button onClick = {() => openModal(blog.id , "Reject")}  className="text-red-500 hover:text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-1 ml-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <p>Reject</p>
            </button>

            <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={handleConfirm}
            status={actionType}
        />
          </div>
        </td>
        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
          <p>{blog.remarks}</p>
        </td>
      </tr>
    );
  })
}
                                                          
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
 
    </div>
  )
}

export default Dashboard2