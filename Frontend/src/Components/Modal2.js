import React, { useState } from 'react';
import axios from 'axios';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function Modal2(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [remarks, setRemarks] = useState(props.remarks || '');

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleDelete = async (id) => {
    try {
     
      const response = await axios.delete(`http://10.20.1.101:5000/blogs/${id}`);
      MySwal.fire({
        icon: 'success',
        title: 'Deleted successful!',
    }).then(() => {
      props.setPendingBlogs(props.pendingBlogs.filter(blog => blog.id !== id));
      
      toggleModal();
    })
   
     
     
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
    
  };

  return (
    <>
      <button 
        onClick={toggleModal} 
        className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" 
        type="button"
      >
        {props.title}
      </button>

      {isOpen && (
        <div id="default-modal" tabIndex="-1" aria-hidden="true" className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {props.title || "Modal Title"}
              </h3>
              <button 
                type="button" 
                onClick={toggleModal} 
                className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 space-y-4">
           {
            props.title === "Delete" ? <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Are you sure to delete?
          </p>:
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                
                {remarks}
              </p>
           }   
            </div>
            <div className="flex items-center p-4 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button 
                onClick={props.title == "Delete" ?  () => handleDelete(props.id) : toggleModal} 
               
                type="button" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
               {props.title == "Delete" ? "Delete" : "Close"} 
              </button>
            
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal2;
