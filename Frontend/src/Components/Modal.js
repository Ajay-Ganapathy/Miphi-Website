// import React, { useState } from 'react';
// import axios from 'axios';

// function Modal({ id, title, author, blog_title, content, image, blogs, setBlogs }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [remarks, setRemarks] = useState(''); // State to store remarks

//   const toggleModal = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleUpdate = async (status) => {
//     try {
     
//       console.log(status === "Accept")
//       await axios.put(`http://localhost:5000/blogs/${id}/status`, { status, remarks });
//       console.log("Updated Success");

//       if(status === "Accept"){
//         setBlogs(
//           blogs.map(blog =>
//             blog.id === id ? { ...blog, status, remarks : " "} : blog
//           )
//         );
//       }else{
//         setBlogs(
//           blogs.map(blog =>
//             blog.id === id ? { ...blog, status, remarks } : blog
//           )
//         );
//       }
     
//     } catch (error) {
//       console.error('Error updating blog status:', error);
//     }
//     toggleModal(); // Close the modal after the update
//   };

//   return (
//     <>
//       <button
//         onClick={toggleModal}
//         className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//         type="button"
//       >
//         {title}
//       </button>

//       {isOpen && (
//         <div
//           id="default-modal"
//           tabIndex="-1"
//           aria-hidden="true"
//           className="fixed inset-0 z-50 flex items-center justify-center w-full h-full overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
//         >
//           <div className="relative w-full max-w-2xl max-h-full p-4">
//             <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
//               <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                
//                 <button
//                   type="button"
//                   className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
//                   onClick={toggleModal}
//                 >
//                   <svg
//                     className="w-3 h-3"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 14 14"
//                   >
//                     <path
//                       stroke="currentColor"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                     />
//                   </svg>
//                   <span className="sr-only">Close modal</span>
//                 </button>
//               </div>

              
             

//               <div className="flex flex-col p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">

//               <svg
//                   className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
//                   aria-hidden="true"
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
//                   />
//                 </svg>
//                 <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
//                   Remarks
//                 </h3>
//                 <textarea
//                   className="w-full p-2 border rounded-md dark:bg-gray-600 dark:text-white"
//                   placeholder="Enter remarks (optional)"
//                   value={remarks}
//                   onChange={(e) => setRemarks(e.target.value)}
//                 ></textarea>

//                 <div className="flex justify-end space-x-2 mt-4">
//                   <button
//                     className="bg-green-600 text-white p-2 m-2"
//                     onClick={() => handleUpdate('Accept')}
//                   >
//                     Accept
//                   </button>
//                   <button
//                     className="bg-red-700 text-white p-2 m-2"
//                     onClick={() => handleUpdate('Reject')}
//                   >
//                     Reject
//                   </button>
//                   <button
//                     onClick={toggleModal}
//                     className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Modal;

import { useState } from 'react';

const Modal = ({ isOpen, onClose, onConfirm, status }) => {
  const [remarks, setRemarks] = useState("");

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(remarks);
    setRemarks(""); // Clear remarks after confirming
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">
          {status === "Reject" ? "Do you want to Reject ? " : status === "Delete" ?  "Do you want to Delete? " : status === "Reject" ? "Do you want to Revert?" : "Do you want to Accept ? "}
        </h2>
        { (status === "Reject" || status === "Revert") && (
          <textarea
            placeholder="Enter your remarks here"
            className="w-full h-32 p-2 border border-gray-300 rounded mb-4"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {status === "Reject" ? "Reject" : status === "Revert" ? "Revert" : status === "Delete" ? "Delete" : "Accept"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

