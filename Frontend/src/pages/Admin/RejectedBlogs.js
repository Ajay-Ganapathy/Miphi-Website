import React from 'react'
import { useState , useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from '../../Components/Modal';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar';
import Sidebar from '../../Components/Sidebar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { useLocalContext } from '../../Context/context';
import Card from '../../Components/Card';
import Table from '../../Components/Table';

const MySwal = withReactContent(Swal);
const RejectedBlogs = () => {

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
 
  const [loading, setLoading] = useState(false);
  

  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
  const toggleNotificationsMenu = () => setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);
  const toggleItemOpen = () => setIsItemOpen(!isItemOpen);
  const closeNotificationsMenu = () => setIsNotificationsMenuOpen(false);
  const closeProfileMenu = () => setIsProfileMenuOpen(false);
  const [remarks, setRemarks] = useState(''); 
  
  const [error , setError] = useState('')

  const {approvedBlogs , rejectedBlogs , pendingBlogs , revertedBlogs , fetchBlogs , blogs , fetchCount , setBlogs, setApprovedBlogs, setPendingBlogs, user , count } = useLocalContext();

  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
    
  }, []);

  useEffect(() => {
    fetchCount();
    
  }, []);

 

  



  const handleAccept = async (id , status) => {
    try {
     
      
      await axios.put(`${process.env.REACT_APP_API_URL}/blogs/${id}/status`, { status, remarks });
      console.log("Updated Success");
      fetchCount();
      fetchBlogs();

    
        MySwal.fire({
          icon: 'success',
          title: 'Blog Accepted!',
      }).then(
        
        setApprovedBlogs(
          blogs.filter(blog =>
            blog.id === id && blog.status === "Accept" ? { ...blog, status, remarks : " "} : blog
          )
        )
      )
        
      
     
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
 
  };


  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/blogs/${id}/soft-delete`);
      console.log("Deleted successfully", remarks);
      fetchCount();
      fetchBlogs();
      
      MySwal.fire({
        icon: 'success',
        title: 'Blog Deleted!',
      });
    } catch (error) {
      console.error('Error updating blog status:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id , status , remarks) => {
    try {
     
  
      await axios.put(`${process.env.REACT_APP_API_URL}/blogs/${id}/status`, { status, remarks });
      console.log("Updated Success" , remarks);
      fetchCount();
      fetchBlogs();

      if(remarks === ""){
        MySwal.fire({
          icon: 'success',
          title: 'Blog Rejected!',
      })

      }else{
        MySwal.fire({
          icon: 'success',
          title: 'Blog Rejected!',
      })
        
      }
     
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
 
  };

  const handleRevert = async (id , status , remarks) => {
    try {
     
  
      await axios.put(`${process.env.REACT_APP_API_URL}/blogs/${id}/status`, { status, remarks });
      console.log("Updated Success" , remarks);
      fetchCount();
      fetchBlogs();

      if(remarks === ""){
        MySwal.fire({
          icon: 'success',
          title: 'Blog Reverted!',
      })

      }else{
        MySwal.fire({
          icon: 'success',
          title: 'Blog Reverted!',
      })
        
      }
     
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
 
  };


  
  const handleConfirm = (remarks) => {
    if (actionType === "Reject") {
      handleReject(currentBlogId, "Reject" , remarks);
    }else if(actionType === "Delete"){
      handleDelete(currentBlogId , "Delete") ;
    }
    else if(actionType === "Revert"){
      handleRevert(currentBlogId , "Revert" , remarks);
    }
    else {
      handleAccept(currentBlogId , "Accept");
    }
    setModalOpen(false);
  };

  const smoothScrollTo = (id) => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};





  return (
    <div>
       


       
            <main class="">
          
                <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400">
               
                    <div class="grid grid-cols-12 gap-6">
                        <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                            <div class="col-span-12 mt-8">
                                <div class="flex items-center h-10 intro-y">
                                    <h2 class="mr-5 text-lg font-medium truncate">Dashboard</h2>
                                </div>
                                <div class="grid grid-cols-12 gap-6 mt-5">
                                    <Link class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        to ="/admin/pendingblogs">
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
                                    </Link>
                                 

                                    <Link class="transform   hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        to="/admin/approvedblogs">
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
                                    </Link>

                                   
                                   
                                    <Link class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        to="/admin/rejectedblogs">
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
                                    </Link>
                                    <Link class="transform  hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white"
                                        to="/admin">
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
                                    </Link>
                                </div>
                               
                               
                               <section id = "rejected" className='mt-12'>
                                <Table title = "Rejected" modalOpen = {modalOpen} setModalOpen = {setModalOpen} handleConfirm = {handleConfirm}  actionType = {actionType} />
                              </section>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
   
  )
}

export default RejectedBlogs