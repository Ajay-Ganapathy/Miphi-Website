import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Modal from './Modal';
import { useLocalContext } from '../Context/context';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import axios from 'axios';
import styles from "./table.modules.css"
import BlogContent from './BlogContent';

const MySwal = withReactContent(Swal);
const Table = (props) => {
    
    const [data , setData] = useState([]);
    const [isItemOpen, setIsItemOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [currentBlogId, setCurrentBlogId] = useState(null);
    const [actionType, setActionType] = useState('');
    const [remarks, setRemarks] = useState(''); 
    const [title , setTitle] = useState(props.title)
    const [loading, setLoading] = useState(false);
    const {approvedBlogs , rejectedBlogs , pendingBlogs , revertedBlogs , fetchBlogs , blogs , fetchCount , setBlogs, setApprovedBlogs, setPendingBlogs, user , count } = useLocalContext();
    
    const [blogContent , setBlogContent] = useState('')


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


  const openModal = (id, type) => {
    setCurrentBlogId(id);
    setActionType(type);
    setModalOpen(true);
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
 

  

    const blogData = {
        'Pending': pendingBlogs || [],
        'Approved': approvedBlogs  || [],
        'Rejected': rejectedBlogs  || [],
        'Reverted': revertedBlogs  || [],
      }|| [];

      {console.log(blogData[props.title], props.title) }

  return (

    <div>
         {  blogData[props.title].length === 0 &&  <div class="max-w-lg mx-auto text-center">
          
          <h1 className={styles.mainHeading+"mt-16 mb-16 pb-2 font-bold sm:text-xl text-2xl md:text-3xl text-center"}>
          No Pending
            <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
              Blogs
            </span>
            <div className={styles.bottomLine}></div>
          </h1>
        </div>}
      <div className="grid grid-cols-12 gap-6">
        <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
           
          
          {
            blogData[props.title].length > 0 && (
              <div className="col-span-12 mt-5">
                <div className="grid gap-2 grid-cols-1 lg:grid-cols-1">
                  <div className="bg-white p-4 shadow-lg rounded-lg">
                    <h1 className="font-bold text-base">{props.title} Blogs</h1>
                    <div className="mt-4">
                      <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto">
                          <div className="py-2 align-middle inline-block min-w-full">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg bg-white">
                              <table className="min-w-full divide-y divide-gray-200">
                                <thead>
                                  <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Author Name</th>
                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Blog Title</th>
                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Blog Content</th>
                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                    <th className="px-6 py-3 bg-gray-50 text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                                  </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                  {
                                    blogData[[props.title]].map((blog) => (
                                      <tr key={blog.id}>
                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">{blog.author_name}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">{blog.blog_title}</td>
                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                          <Link to={`/admin/blogs/${blog.id}`} state={{ blog  }} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
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
                                                      {
                                                        props.title === 'Rejected' ?  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                        <div className="flex space-x-4">
                                                          <button onClick = {() => openModal(blog.id , "Delete")} className="text-red-500 hover:text-red-600">
                                                
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
                                                            <p>Delete</p>
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
                                                      </td> : props.title === 'Approved' ?    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                        <div className="flex space-x-4">
                                                        
                                                          <button onClick = {() => openModal(blog.id , "Revert")}  className="text-yellow-500 hover:text-yellow-600">
                                                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
<path d="M12 4V1L8 5l4 4V6.5C14.33 6.5 16.5 8.67 16.5 11s-2.17 4.5-4.5 4.5S7.5 13.33 7.5 11H6.5c0 4.14 3.36 7.5 7.5 7.5 4.14 0 7.5-3.36 7.5-7.5S16.64 4 12 4z" fill="#F59E0B"/>
</svg>

                                                            <p>Revert</p>
                                                          </button>

                                                          <Modal
                                                          isOpen={modalOpen}
                                                          onClose={() => setModalOpen(false)}
                                                          onConfirm={handleConfirm}
                                                          status={actionType}
                                                      />
                                                        </div>
                                                      </td> :  <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
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
                                                      }
                                                   
                                                      <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">
                                                        <p>{blog.remarks}</p>
                                                      </td>
                                      </tr>
                                    ))
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
            )
          }
        </div>
      </div>
    </div>
  )
}

export default Table