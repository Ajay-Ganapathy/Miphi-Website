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

const MySwal = withReactContent(Swal);
const DeletedBlogs = () => {

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
  const [approvedBlogs , setApprovedBlogs] = useState([]);
  const [rejectedBlogs , setRejectedBlogs] = useState([]);
  const [pendingBlogs , setPendingBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  

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

 

 

  const fetchBlogs = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/deletedblogs`);
      setBlogs(response.data.blogs.sort((a,b) => b.id - a.id));

    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };



  const handleRestore = async (id , status ) => {
    try {
     
  
      await axios.put(`${process.env.REACT_APP_API_URL}/blogs/${id}/restore`);
      console.log("Updated Success" , remarks);
      
      fetchBlogs();

      if(remarks === ""){
        MySwal.fire({
          icon: 'success',
          title: 'Blog Restored!',
      })

      }else{
        MySwal.fire({
          icon: 'success',
          title: 'Blog Revstored!',
      })
        
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
   
    if(actionType === "Restore"){
      handleRestore(currentBlogId , "Restore" );
    }
    
    setModalOpen(false);
  };
 


  return (
    <div>
       


       <main class="">
          
          <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400 w-100 h-100">
          <div class="grid grid-cols-12 gap-6">
                        <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                          
                          
                             
                            
                                
                                         

                            {
                              blogs.length > 0 &&
                              <div class="col-span-12 mt-5">
                              <div class="grid gap-2 grid-cols-1 lg:grid-cols-1">
                                  <div class="bg-white p-4 shadow-lg rounded-lg">
                                      <h1 class="font-bold text-base">Deleted Blogs </h1>
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
    <tr key={blog.id}> 
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
        <p>{blog.author_name}</p>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
        <p>{blog.blog_title}</p>
      </td>
      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
      <Link to={`/admin/blogs/${blog.id}`} state = {{blog}} 
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
          <button onClick = {() => openModal(blog.id , "Restore")} className="text-green-500 hover:text-green-600">

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path d="M12 4V1L8 5l4 4V6.5C14.33 6.5 16.5 8.67 16.5 11s-2.17 4.5-4.5 4.5S7.5 13.33 7.5 11h-2c0 4.14 3.36 7.5 7.5 7.5 4.14 0 7.5-3.36 7.5-7.5S16.64 4 12 4z" fill="#00FF00"/>
</svg>


            <p>Restore</p>
          </button>
          {/* <button onClick = {() => openModal(blog.id , "Reject")}  className="text-red-500 hover:text-red-600">
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
          </button> */}

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
                            }
                                </div>
                            </div>
                        </div>
            
      </main>
        </div>
   
  )
}

export default DeletedBlogs;