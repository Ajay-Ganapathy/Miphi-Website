import React from 'react'
import { useState , useEffect } from 'react';
import axios from 'axios';
import TextEditor from '../../Components/TextEditor';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'; 
import { useNavigate } from 'react-router-dom';

const MySwal = withReactContent(Swal);

const EditProfilePage = () => {

    const location = useLocation();
    const {user } = location.state || {}

    {console.log(user)}
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const [name, setName] = useState(user.name);
   const [userName, setUserName] = useState(user.username);
    const [image , setImage] = useState(null);
  
   
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

   
    
   
  
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      
      formData.append('name', name);
  
      
      if (image) {
        formData.append('profile_img', image);
      }
  
    
      try {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/profile/edit/${user.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        MySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Blog Updated successfully!',
        }).then(
          navigate("/author/profile")
        );
  
        // setTitle('');
        // setBlogContent('');
        // setImage(null);
        //setMessage('Blog submitted successfully!'); 
    
       
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error Updating Details. Please try again.',
        });
        console.error('Error Updating details:', error);
        //setMessage('Error submitting blog. Please try again.');
      }
    };

  return (
    <div>

            

<main class="">
          
          <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400 w-100 h-100">
          <div class="grid grid-cols-12 gap-6">
                        <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                          
                            <div class="col-span-12 mt-8">
                             
                            
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="w-full max-w-xl">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-8" onSubmit={handleSubmit}>

        <h1 className="block text-gray-700 text-center text-sm font-bold uppercase mb-2 mt-2">Edit Profile </h1>
          {/* <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="authorname">
              Author Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="authorname"
              name="authorname"
              type="text"
              placeholder="Author Name"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
            />
          </div> */}
          

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="username">
              User Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              name="username"
              type="text"
              placeholder="Title"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
              disabled
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="title">
              Image
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="image_url"
              name="image_url"
              type="file"
              onChange={(e) => setImage(e.target.files[0])} 
            />

          </div>

          

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            type="submit"
          >
            Submit
          </button>

         
        </form>
      </div>
    </div>
                                <div class="flex items-center h-10 intro-y">
                                    
                                </div>
                            </div>
                        </div>
            </div>
            </div>
      </main>
          
       
    </div>


     
  )
}

export default EditProfilePage