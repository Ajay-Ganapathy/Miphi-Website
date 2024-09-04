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

const EditBlog = () => {

    const location = useLocation();
    const {blog } = location.state || {}
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

    const [authorName, setAuthorName] = useState(blog.author_name);
    const [title, setTitle] = useState(blog.blog_title);
    const [blogContent, setBlogContent] = useState(blog.blog_content);
    const [message, setMessage] = useState('');
    const [image , setImage] = useState(null);
  
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

   
    
    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get('http://10.20.1.101:5000/author/details', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
          
        } catch (error) {
          setError(error.response?.data?.message || 'Error fetching user details');
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserDetails();
    }, []);
  
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
    
      const formData = new FormData();
      formData.append('author_name', user.name);
      formData.append('blog_title', title);
      formData.append('blog_content', blogContent);
      formData.append('status', 'Pending');
      
      
      if (image) {
        formData.append('image_url', image);
      }
  
      formData.append('author_id', user.id);
    
      try {
        const response = await axios.put(`http://10.20.1.101:5000/blogs/${blog.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        MySwal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Blog Updated successfully!',
        }).then(
          navigate("/author")
        );
  
        // setTitle('');
        // setBlogContent('');
        // setImage(null);
        //setMessage('Blog submitted successfully!'); 
    
        setAuthorName('');
        setTitle('');
        setBlogContent('');
        setImage(null);
      } catch (error) {
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error submitting blog. Please try again.',
        });
        console.error('Error submitting blog:', error);
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

        <h1 className="block text-gray-700 text-center text-sm font-bold uppercase mb-2 mt-2">Edit your Blog</h1>
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
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blogcontent">
            Blog Content
          </label>

          
          <TextEditor value={blogContent} onChange={setBlogContent} />

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            type="submit"
          >
            Submit
          </button>

          {message && (
            <div className="mt-4 text-center">
              <p className={`text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                {message}
              </p>
            </div>
          )}
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

export default EditBlog