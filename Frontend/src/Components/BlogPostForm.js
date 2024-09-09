import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import TagsInput from './TagsInput';
import TextEditor from './TextEditor';
import { useLocalContext } from '../Context/context';
import styles from "./BlogPostForm.modules.css";
import { Link, useLocation } from 'react-router-dom';

const MySwal = withReactContent(Swal);

function BlogPostForm() {
  const location  = useLocation();
  const {data} = location.state || {}
  const { user } = useLocalContext();
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [coverImage, setCoverImage] = useState(data && data.image ? data.image : null);
  const [image , setImage] = useState(data && data.image ? data.image : null);
  const [title, setTitle] = useState(data && data.title ? data.title : '');
  const fileInputRef = useRef(null); 
  const [blogContent, setBlogContent] = useState(data && data.blog_content ? data.blog_content : '');
  const prevBlogContent = ''
  const prevCoverImage = null;
  const prevTitle = ''
 
  
 

  const blog = {
    "author_name" : user.name
  }

  // if(data){
  //   setTitle(data.title);
  //   setBlogContent(data.blog_content);
  //   setCoverImage(data.image)
  // }

 
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const selectedTags = tags => {
    console.log(tags);
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

    const formData = new FormData();
    formData.append('author_name', user.name);
    formData.append('blog_title', title);
    addSrcToImages(blogContent)
    formData.append('blog_content', blogContent);
    formData.append('status', 'Pending');
    if (coverImage) {
      formData.append('image_url', coverImage);
    }
    formData.append('author_id', user.id);
    console.log(formData);

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/blogs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Blog submitted successfully!',
      });

      setTitle('');
      setBlogContent('');
      setCoverImage(null);
    } catch (error) {
      console.error('Error submitting blog:', error);

      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error submitting blog. Please try again.',
      });
    }
  };

  const handleDraft = async (e) => {
    e.preventDefault() ;
    const formData = new FormData();
    formData.append('author_name', user.name);
    formData.append('blog_title', title);
    formData.append('blog_content', blogContent);
    formData.append('status', 'Draft');
    if (coverImage) {
      formData.append('image_url', coverImage);
    }
    formData.append('author_id', user.id);
    console.log(formData);

    try {
      
      
      await axios.post(`${process.env.REACT_APP_API_URL}/blogs`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Blog saved as draft successfully!',
      }).then(() => {
        console.log("dRAFT SAVED")
      });

      setTitle('');
      setBlogContent('');
      setCoverImage(null);
    } catch (error) {
      console.error('Error submitting blog:', error);

      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error submitting blog. Please try again.',
      });
    }
  }

  return (
    <main className="">
      
      <div className="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-orange-400 w-100"
        style={{ height: coverImage ? "auto" : "100vh" }}>
        <div className="grid grid-cols-12 gap-6">
          <div className="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
            <div className="col-span-12 mt-8">
              <div className='bg-gray-100 flex flex-col justify-center items-center'
              >
                 
                <div style={{ width: "70vw", backgroundColor: "white" }} className='p-4 shadow-xl rounded-xl mx-auto border-solid'>
                

              <Link to={`/author/blogs/preview`} state={{  blog , image , title , blogContent }} className="btn bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded">
                    Preview
                  </Link>
                  <form onSubmit={handleSubmit}>
                    <div  >
                      {/* Cover Image */}
                      {!image && (
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

                      {image && (
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
                          required
                        />
                      </div>

                      <br />

                      {/* Tags Input Container */}
                      <div className="tags-container" style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
                        <TagsInput selectedTags={selectedTags} tags={['Nodejs', 'MongoDB']} />
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

                      <button
                        className="text-black font-semibold py-2 px-4 rounded-lg"
                        type="button"
                        onClick = {() => {

                          setTitle(prevTitle) ;
                          setBlogContent(prevBlogContent);
                          setCoverImage(prevCoverImage);
                        }
                      }
                      >
                        Revert new changes
                      </button>
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

export default BlogPostForm;
