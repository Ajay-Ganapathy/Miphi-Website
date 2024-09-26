// import React from 'react'
// import { useState , useEffect } from 'react';
// import axios from 'axios';
// import TextEditor from '../../Components/TextEditor';
// import { useLocation } from 'react-router-dom';
// import Sidebar from '../../Components/Sidebar';
// import Navbar from '../../Components/Navbar';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content'; 
// import { useNavigate } from 'react-router-dom';

// const MySwal = withReactContent(Swal);

// const EditBlog = () => {

//     const location = useLocation();
//     const {blog } = location.state || {}
//     const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

//     const [authorName, setAuthorName] = useState(blog.author_name);
//     const [title, setTitle] = useState(blog.blog_title);
//     const [blogContent, setBlogContent] = useState(blog.blog_content);
//     const [message, setMessage] = useState('');
//     const [image , setImage] = useState(null);
  
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const navigate = useNavigate()

   
    
//     useEffect(() => {
//       const fetchUserDetails = async () => {
//         try {
//           const token = localStorage.getItem('token');
//           const response = await axios.get(`${process.env.REACT_APP_API_URL}/author/details`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           setUser(response.data);
          
//         } catch (error) {
//           setError(error.response?.data?.message || 'Error fetching user details');
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchUserDetails();
//     }, []);
  
  
  
//     const handleSubmit = async (e) => {
//       e.preventDefault();
    
//       const formData = new FormData();
//       formData.append('author_name', user.name);
//       formData.append('blog_title', title);
//       formData.append('blog_content', blogContent);
//       formData.append('status', 'Pending');
      
      
//       if (image) {
//         formData.append('image_url', image);
//       }
  
//       formData.append('author_id', user.id);
    
//       try {
//         const response = await axios.put(`${process.env.REACT_APP_API_URL}/blogs/${blog.id}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
    
//         MySwal.fire({
//           icon: 'success',
//           title: 'Success',
//           text: 'Blog Updated successfully!',
//         }).then(
//           navigate("/author")
//         );
  
//         // setTitle('');
//         // setBlogContent('');
//         // setImage(null);
//         //setMessage('Blog submitted successfully!'); 
    
//         setAuthorName('');
//         setTitle('');
//         setBlogContent('');
//         setImage(null);
//       } catch (error) {
//         MySwal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Error submitting blog. Please try again.',
//         });
//         console.error('Error submitting blog:', error);
//         //setMessage('Error submitting blog. Please try again.');
//       }
//     };

//   return (
//     <div>

            

// <main class="">
          
//           <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400 w-100 h-100">
//           <div class="grid grid-cols-12 gap-6">
//                         <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                          
//                             <div class="col-span-12 mt-8">
                             
                            
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <div className="w-full max-w-xl">
//         <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-8" onSubmit={handleSubmit}>

//         <h1 className="block text-gray-700 text-center text-sm font-bold uppercase mb-2 mt-2">Edit your Blog</h1>
//           {/* <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="authorname">
//               Author Name
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="authorname"
//               name="authorname"
//               type="text"
//               placeholder="Author Name"
//               value={authorName}
//               onChange={(e) => setAuthorName(e.target.value)}
//               required
//             />
//           </div> */}
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="title">
//               Title
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="title"
//               name="title"
//               type="text"
//               placeholder="Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="title">
//               Image
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="image_url"
//               name="image_url"
//               type="file"
//               onChange={(e) => setImage(e.target.files[0])} 
//             />

//           </div>

//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blogcontent">
//             Blog Content
//           </label>

          
//           <TextEditor value={blogContent} onChange={setBlogContent} />

//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//             type="submit"
//           >
//             Submit
//           </button>

//           {message && (
//             <div className="mt-4 text-center">
//               <p className={`text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
//                 {message}
//               </p>
//             </div>
//           )}
//         </form>
//       </div>
//     </div>
//                                 <div class="flex items-center h-10 intro-y">
                                    
//                                 </div>
//                             </div>
//                         </div>
//             </div>
//             </div>
//       </main>
          
       
//     </div>


     
//   )
// }

// export default EditBlog

import React, { useState, useRef, useCallback, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import TagsInput from '../../Components/TagsInput';
import TextEditor from '../../Components/TextEditor';
import { useLocalContext } from '../../Context/context';
import styles from "./EditBlog.modules.css";
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
const MySwal = withReactContent(Swal);


function EditBlog() {

 
  const location = useLocation();
  const {blog , data } = location.state || {}
  const [tags, setTags] = useState( location.state.tags || []);
  const { user } = useLocalContext();
  const [content, setContent] = useState('');

 


 
  const [error , setError] = useState([]);
  const [loading , setLoading] = useState([])
  const [coverImage, setCoverImage] = useState(data ? (data.image && data.image ) : (blog.image_url ? `${process.env.REACT_APP_API_URL}/${blog.image_url}` : null ));
  const [image , setImage] = useState(data ? (data.image && data.image ) : (blog.image_url ? `${process.env.REACT_APP_API_URL}/${blog.image_url}` : null ) );
  const [title, setTitle] = useState( data ? data.title ? data.title :  blog.blog_title :  blog.blog_title);
  const fileInputRef = useRef(null); 

  const [blogContent, setBlogContent] = useState(data ? data.blog_content ? data.blog_content  :  blog.blog_content  :  blog.blog_content );
  const navigate = useNavigate()


  const prevBlogContent = blog.blog_content;
  let prevCoverImage = null;
  if(blog.image_url != ' '){
     prevCoverImage = `${process.env.REACT_APP_API_URL}/${blog.image_url}`;
  }
  const prevTitle = blog.blog_title;


 
  useEffect(() => {
    // This function will only be called once when the component mounts
    const fetchTags = async (id) => {
      try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/blogs/tags/${id}`);
          if(tags.length == 0 ){
            setTags(response.data.map((data) => data.name));
          }
         
          
      } catch (error) {
          console.error('Error fetching blogs:', error);
          setError('Error fetching blogs');
      } finally {
          setLoading(false);
         
      }
    };
  
    fetchTags(blog.id);

    // Optionally, you can return a cleanup function if needed
    return () => {
      // Cleanup logic if needed
    };
  }, []);
  

 
   



 

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const selectedTags = tags => {
    //console.log(tags.name);
  };


  const handleImageChange = (e) => {
    
      setImage(URL.createObjectURL(e.target.files[0]));
      setCoverImage(e.target.files[0])
    
  };
  

  

  const addSrcToImages = (html) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const imageTags = tempDiv.querySelectorAll('img');
  

    imageTags.forEach((image , index) => {
        const src = `image-${index}`;
        image.src = src;
        
    });

    setBlogContent(tempDiv.innerHTML);
    console.log(blogContent , tempDiv)

    return { html: tempDiv.innerHTML};
};

  const [selected, setSelected] = useState([]);

  const onAdd = useCallback(
    (newTag) => {
      setSelected([...selected, newTag]);
    },
    [selected]
  );

  const onDelete = useCallback(
    (tagIndex) => {
      setSelected(selected.filter((_, i) => i !== tagIndex));
    },
    [selected]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Function to extract base64 images from blog content
    const extractBase64Images = (blogContent) => {
      const uniqueId = uuidv4();
      const base64ImageRegex = /<img[^>]+src="data:image\/[^"]+"[^>]*>/g;
      const base64Images = blogContent.match(base64ImageRegex) || [];
      return base64Images.map((imgTag, index) => {
        const srcMatch = imgTag.match(/src="(data:image\/[^"]+)"/);
        const base64String = srcMatch ? srcMatch[1] : null;
        if (base64String) {
          const mime = base64String.match(/data:(.*?);base64/)[1];
          const byteString = atob(base64String.split(',')[1]);
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const uintArray = new Uint8Array(arrayBuffer);
          for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
          }
          return new File([uintArray], `${uniqueId}_image_${index}.png`, { type: mime });
        }
        return null;
      }).filter(Boolean);
    };
  
    // Function to process images and replace base64 with URLs if needed
    const addSrcToImages = async (blogContent) => {
      const base64Images = extractBase64Images(blogContent);
  
      if (base64Images.length === 0) {
        return blogContent; // No images to upload, return content as is
      }
  
      // Create FormData to upload images
      const imageFormData = new FormData();
      base64Images.forEach((file, index) => {
        imageFormData.append(`images[]`, file);
      });
  
      // Upload images to backend
      const imageResponse = await fetch(`${process.env.REACT_APP_API_URL}/upload-images`, {
        method: 'POST',
        body: imageFormData,
      });
  
      const imageData = await imageResponse.json();
      if (!imageData.success) {
        throw new Error('Image upload failed');
      }
  
      const imageUrlArray = imageData.imageUrls;
  
      // Replace base64 src in blog content with actual image URLs
      return replaceBase64ImagesWithURLs(blogContent, imageUrlArray);
    };
  
    const replaceBase64ImagesWithURLs = (blogContent, imageUrlArray) => {
      let i = 0;
      return blogContent.replace(/<img[^>]+src="data:image\/[^"]+"[^>]*>/g, () => {
        const imageUrl = imageUrlArray[i++];
        return `<img src="${process.env.REACT_APP_API_URL}/uploads/${imageUrl}" />`;
      });
    };
  
    async function blobUrlToFile(blobUrl, fileName) {
      // Fetch the Blob data
      const response = await fetch(blobUrl);
      const blob = await response.blob();
  
      // Convert the Blob to a File
      return new File([blob], fileName, { type: blob.type });
    }
  
    // Start updating the blog
    const formData = new FormData();
    
    try {
      const updatedBlogContent = await addSrcToImages(blogContent); // Update content with image URLs
      formData.append('author_name', user.name);
      formData.append('blog_title', title);
      formData.append('blog_content', updatedBlogContent); // Use updated content with image URLs
      formData.append('status', 'Pending');
      formData.append('tags', JSON.stringify(tags));
  
      if (coverImage) {
        const file = await blobUrlToFile(coverImage, 'cover_image');
        formData.append('image_url', file); // Append cover image if updated
      }
  
      formData.append('author_id', user.id);
  
      console.log([...formData.entries()]); // Log FormData entries for debugging
  
      // Submit form data to backend (PUT request to update the blog)
      await axios.put(`${process.env.REACT_APP_API_URL}/blogs/${blog.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Blog updated successfully!',
      });
  
      setTitle('');
      setBlogContent('');
      setCoverImage(null);
    } catch (error) {
      console.error('Error updating blog:', error.response.data.error);
  
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.error,
      });
    }
  };
  

  const handleDraft = async (e) => {
    e.preventDefault();
  
    // Function to extract base64 images from blog content
    const extractBase64Images = (blogContent) => {
      const uniqueId = uuidv4();
      const base64ImageRegex = /<img[^>]+src="data:image\/[^"]+"[^>]*>/g;
      const base64Images = blogContent.match(base64ImageRegex) || [];
      return base64Images.map((imgTag, index) => {
        const srcMatch = imgTag.match(/src="(data:image\/[^"]+)"/);
        const base64String = srcMatch ? srcMatch[1] : null;
        if (base64String) {
          const mime = base64String.match(/data:(.*?);base64/)[1];
          const byteString = atob(base64String.split(',')[1]);
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const uintArray = new Uint8Array(arrayBuffer);
          for (let i = 0; i < byteString.length; i++) {
            uintArray[i] = byteString.charCodeAt(i);
          }
          return new File([uintArray], `${uniqueId}_image_${index}.png`, { type: mime });
        }
        return null;
      }).filter(Boolean);
    };
  
    // Function to process images and replace base64 with URLs if needed
    const addSrcToImages = async (blogContent) => {
      const base64Images = extractBase64Images(blogContent);
  
      if (base64Images.length === 0) {
        return blogContent; // No images to upload, return content as is
      }
  
      // Create FormData to upload images
      const imageFormData = new FormData();
      base64Images.forEach((file, index) => {
        imageFormData.append(`images[]`, file);
      });
  
      // Upload images to backend
      const imageResponse = await fetch(`${process.env.REACT_APP_API_URL}/upload-images`, {
        method: 'POST',
        body: imageFormData,
      });
  
      const imageData = await imageResponse.json();
      if (!imageData.success) {
        throw new Error('Image upload failed');
      }
  
      const imageUrlArray = imageData.imageUrls;
  
      // Replace base64 src in blog content with actual image URLs
      return replaceBase64ImagesWithURLs(blogContent, imageUrlArray);
    };
  
    const replaceBase64ImagesWithURLs = (blogContent, imageUrlArray) => {
      let i = 0;
      return blogContent.replace(/<img[^>]+src="data:image\/[^"]+"[^>]*>/g, () => {
        const imageUrl = imageUrlArray[i++];
        return `<img src="${process.env.REACT_APP_API_URL}/uploads/${imageUrl}" />`;
      });
    };
  
    async function blobUrlToFile(blobUrl, fileName) {
      // Fetch the Blob data
      const response = await fetch(blobUrl);
      const blob = await response.blob();
  
      // Convert the Blob to a File
      return new File([blob], fileName, { type: blob.type });
    }
  
    // Start updating the blog
    const formData = new FormData();
    
    try {
      const updatedBlogContent = await addSrcToImages(blogContent); // Update content with image URLs
      formData.append('author_name', user.name);
      formData.append('blog_title', title);
      formData.append('blog_content', updatedBlogContent); // Use updated content with image URLs
      formData.append('status', 'Draft');
      formData.append('tags', JSON.stringify(tags));
  
      if (coverImage) {
        const file = await blobUrlToFile(coverImage, 'cover_image');
        formData.append('image_url', file); // Append cover image if updated
      }
  
      formData.append('author_id', user.id);
  
      console.log([...formData.entries()]); // Log FormData entries for debugging
  
      // Submit form data to backend (PUT request to update the blog)
      await axios.put(`${process.env.REACT_APP_API_URL}/blogs/${blog.id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Blog updated successfully!',
      });
  
      setTitle('');
      setBlogContent('');
      setCoverImage(null);
    } catch (error) {
      console.error('Error updating blog:', error.response.data.error);
  
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.error,
      });
    }
  };
  

  return (
    <main className="">
     
      <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-orange-400 w-100"
        style={{ height: "auto" }}>
        <div className="grid grid-cols-12 gap-6">
          <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
            <div className="col-span-12 mt-8">
              <div className='bg-gray-100 flex flex-col justify-center items-center'>

              

            
              
                
                <div style={{ width: "70vw", backgroundColor: "white" }} className='p-4 shadow-xl rounded-xl mx-auto border-solid'>
                <div className='flex justify-end'>
                  {/* {console.log(tags)} */}

<Link to={`/author/blogs/preview`} state={{ blog , image , title , blogContent , tags  }} className="btn  text-black py-2 px-4 rounded">
    Preview
  </Link>

</div>
                  <form onSubmit={handleSubmit}>
                    <div  >
                    
                      {/* Cover Image */}
                      {/* {console.log(coverImage === prevCoverImage , coverImage , prevCoverImage) } */}
                     
                      { (!image ||   image ===  ' ') && (
                        <button type="button" onClick={handleButtonClick} className='border border-black-800 p-3'>
                          Add a Cover Image
                        </button>
                      )}

                      <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleImageChange}
                        accept="image/*"
                      />

                      { (image   &&   image !== ' ' )  && (
                        <div>
                          
                          <div className='flex flex-row'>
                            <img src={image} alt="Cover Preview" height="200" width="200" />
                            <div className='flex flex-row content-center'>
                              <button
                                onClick={handleButtonClick}
                                className="bg-blue-600 hover:bg-blue-700 w-40 h-10 text-white font-semibold m-3 py-2 px-2 rounded-lg"
                                type="button"
                              >
                                Change
                              </button>
                              <button
                                className="text-red-400 w-40 h-10 font-semibold py-2 px-4 rounded-lg m-3"
                                onClick={() => {setCoverImage(null) ; setImage(null)}}
                                type="button"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Title */}
                      <div className="title-input-container">
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter the blog title...."
                          className="title-input ml-3"
                          onKeyDown={(e) => (e.key === 'Enter') && e.preventDefault()}
                          required
                        />
                      </div>

                      <br />

                      {/* Tags Input Container */}
                   
                      <div className= "tags-container" style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
                      <TagsInput selectedTags={selectedTags}  tags={tags} setTags = {setTags} />

                      </div>

                      <br />

                      {/* Text Editor Container */}
                      <div className="text-editor-container" style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
                        <TextEditor style={{ height: '30vh', margin: '10px' }} value={blogContent} onChange={setBlogContent} />
                      </div>

                      <br />
                    </div>

                    <div className='m-8'>
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
                        type="submit"
                      >
                        Publish
                      </button>

                      <button
                        className="text-black font-semibold py-2 px-4 rounded-lg"
                        type="button"
                        onClick = {handleDraft}
                      >
                        Save Draft
                      </button>

                      {/* <button
                        className="text-black font-semibold py-2 px-4 rounded-lg"
                        type="button"
                        onClick = {() => {
                          
                          if(window.confirm("Do you want to revert new changes ? ")){
                            setTitle(prevTitle) ;
                          setBlogContent(prevBlogContent);
                          setCoverImage(prevCoverImage);
                          setImage(prevCoverImage);
                          }
                          
                        }
                      }
                      >
                        Revert new changes
                      </button> */}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}




export default EditBlog