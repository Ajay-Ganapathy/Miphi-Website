import React, { useState } from 'react';
import axios from 'axios';
import Form from './Form';

function Modal2(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [remarks, setRemarks] = useState(props.remarks ? props.remarks : ''); // State to store remarks
  //console.log(remarks)

  const toggleModal = () => {
    setIsOpen(!isOpen);
    
  };

  const handleUpdate = async (id, status) => {
    try {
    setRemarks('')
    console.log(status)
      await axios.put(`http://localhost:5000/blogs/${id}/status`, { status , remarks});
      console.log("Updated Success");
      props.setBlogs(props.blogs.map(blog => 
        blog.id === id ? { ...blog, status  , remarks} : blog
      ));
    } catch (error) {
      console.log(id)
      console.error('Error updating blog status:', error);
    }
    toggleModal();
  };

  const handleReject = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/blogs/${id}/status`, { status, remarks });
      console.log("Updated Success");
      props.setBlogs(props.blogs.map(blog => 
        blog.id === id ? { ...blog, status, remarks } : blog
      ));
    } catch (error) {
      console.log(remarks);
      console.log(id , status)
      console.error('Error updating blog status:', error);
    }
    toggleModal();
  };

  return (
    <>
      <button
        onClick={toggleModal}
        data-modal-target="default-modal"
        data-modal-toggle="default-modal"
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        {props.title}
      </button>

      {isOpen && (
        <div
          id="default-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
        >
          <div className="relative w-full max-w-2xl max-h-full p-4">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {props.blog_title} - {props.author}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={toggleModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              {props.image && (
                <img 
                  src={`http://localhost:5000/${props.image}`} 
                  className="card-img-top rounded-4" 
                  alt={`http://localhost:5000/${props.image}`} 
                />
              )}

              <div className="p-4 md:p-5 space-y-4" dangerouslySetInnerHTML={{ __html: props.content }}>
              </div>
              <Form />

              <div className="flex flex-col p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              
                <textarea
                  className="w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white"
                  placeholder="Enter remarks (optional)"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                ></textarea>

                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    className="bg-green-600 text-white p-2 m-2"
                    onClick={() => handleUpdate(props.id, 'Accept')}
                  >
                    Accept
                  </button>
                  <button
                    className="bg-red-700 text-white p-2 m-2"
                    onClick={() => handleReject(props.id, 'Reject')}
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal2;
