import React, { useState } from 'react';
import axios from 'axios';

function Modal2(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [remarks, setRemarks] = useState(props.remarks ? props.remarks : '');

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

 

  const handleDelete = async (id) => {
    try {
      console.log("clicked ww")
      toggleModal();
      
      const response = await axios.delete(`http://localhost:5000/blogs/${id}`);
      console.log("Deleted Successfully" , response);
      props.setBlogs(props.blogs.filter(blog => blog.id !== id));
      
     
  
      
      
    } catch (error) {
      console.error('Error deleting blog:', error);
      
    }
  };
  

  return (
    <>
      <button 
        onClick={toggleModal} 
        className="block text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
        type="button"
      >
        Delete
      </button>

      {isOpen && (
        <div 
          id="popup-modal" 
          className="fixed top-0 right-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full bg-white rounded-lg shadow dark:bg-gray-700">
            <button 
              type="button" 
              onClick={toggleModal} 
              className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Delete this blog ?</h3>
              
           
              <button 
                onClick={() => handleDelete(props.id)} 
                type="button" 
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center ms-3"
              >
                Delete
              </button>
              <button 
                onClick={toggleModal} 
                type="button" 
                className="text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 py-2.5 px-5 ms-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal2;