// // src/components/BlogPostForm.js
// import React, { useState } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // Import Quill styles
// import axios from 'axios';

// const BlogPostForm = () => {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       await axios.post('/api/blogs', {
//         title,
//         content
//       });
//       alert('Blog posted successfully!');
//     } catch (error) {
//       alert('Error posting blog.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="title">Title:</label>
//         <input
//           type="text"
//           id="title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//       </div>
//       <div>
//         <label>Content:</label>
//         <ReactQuill
//           value={content}
//           onChange={setContent}
//           modules={modules}
//           formats={formats}
//           style={{ height: '400px' }}
//         />
//       </div>
//       <button type="submit">Post Blog</button>
//     </form>
//   );
// };

// const modules = {
//   toolbar: [
//     [{ 'header': '1'}, { 'header': '2' }],
//     [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//     ['bold', 'italic', 'underline'],
//     [{ 'font': [] }],
//     [{ 'size': [] }],
//     [{ 'color': [] }, { 'background': [] }],
//     [{ 'align': [] }],
//     ['link', 'image']
//   ],
// };

// const formats = [
//   'header', 'list', 'bullet', 'bold', 'italic', 'underline',
//   'font', 'size', 'color', 'background', 'align', 'link', 'image'
// ];

// export default BlogPostForm;

import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useRef } from 'react';
import TagsInput from './TagsInput';
import { ReactTags } from 'react-tag-autocomplete'
import { useCallback } from 'react';
import styles from "./BlogPostForm.modules.css"
import TextEditor from './TextEditor';
import { useLocalContext } from '../Context/context';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

function BlogPostForm() {

  const {user} = useLocalContext();

  const sugg = ["react" , "node"]
 
  const suggestions = sugg.map((name, index) => ({ value: index, label: name }))





    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [coverImage, setCoverImage] = useState(null);
    const [title, setTitle] = useState('');
    const fileInputRef = useRef(null); // Reference to the hidden file input
    const [blogContent , setBlogContent] = useState('')

    // Trigger file input click when button is clicked
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const selectedTags = tags => {
      console.log(tags);
    };

    // Handle image change
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setCoverImage(URL.createObjectURL(e.target.files[0]));
        }
    };

    const [selected, setSelected] = useState([])

  const onAdd = useCallback(
    (newTag) => {
      setSelected([...selected, newTag])
    },
    [selected]
  )

  const onDelete = useCallback(
    (tagIndex) => {
      setSelected(selected.filter((_, i) => i !== tagIndex))
    },
    [selected]
  )
   

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('author_name', user.name);
    formData.append('blog_title', title);
    formData.append('blog_content', blogContent);
    formData.append('status', 'Pending');
    if (coverImage) {
      formData.append('image_url', coverImage);
    }
    formData.append('author_id', user.id);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/blogs`, formData, {
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

    return (

      <main class="">
          
          <div class="grid mb-4 pb-10 px-8 mx-4 rounded-3xl bg-gray-100 border-4 border-green-400 w-100 h-100">
          <div class="grid grid-cols-12 gap-6">
                        <div class="grid grid-cols-12 col-span-12 gap-6 xxl:col-span-9">
                          
                            <div class="col-span-12 mt-8">
                             
                            <div className='bg-gray-100 ' style = {{ height : "100vh" ,  display : "flex" , flexDirection : "column" , alignItems : "flexStart" , justifyContent : "center"}}>
          <div style = {{width : "70vw" , height : "80vh" , backgroundColor : "white" }} className=' p-8 shadow-xl  rounded-xl mx-auto border-solid '>
          <div >
          

             {/* Button to trigger file input */}
             <form>
              
             </form>
             {
              !coverImage && <button type="button" onClick={handleButtonClick} className='border border-black-800 p-3'>
              Add a Cover Image
          </button>
             }
             

            {/* Hidden file input */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleImageChange}
                accept="image/*"
            />

            {/* Cover Image Preview */}
            {coverImage && (
                <div >
                    <h3>Cover Image Preview:</h3>
                    <div className='flex flex-row '>

                    <img src={coverImage} alt="Cover Preview"  height = "200"  width="200" />
                    
                    <div className='flex flex-row content-center'>
                    <button
                    onClick={handleButtonClick}
            className="bg-blue-600 hover:bg-blue-700 w-40 h-10 text-white font-semibold m-3 py-2 px-2  rounded-lg"
            type="submit"
          >
            Change
          </button>

          <button
            className="  text-red-400 w-40 h-10  font-semibold py-2 px-4 rounded-lg m-3"
            onClick={() => setCoverImage(null)}
          >
            Remove
          </button>
          </div>

          </div>

                </div>
            )}

            <div className="title-input-container">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter the blog title...."
                className="title-input ml-3"
            />
        </div>

          {/* Tags Input */}
          <br />
            
      <TagsInput selectedTags={selectedTags}  tags={['Nodejs', 'MongoDB']} />
      <br />
           
        </div>
            {/* Rich Text Editor */}

            <TextEditor style={{ height: '30vh', margin: '10px' }} value={blogContent} onChange={setBlogContent} />
            {/* <ReactQuill 
  theme="snow" 
  className="custom-quill" 
  style={{ height: '30vh', margin: '10px' }} 
  value={content} 
  onChange={setContent} 
/> */}

          

            <br />
            <br />

            {/* <TagsInput
  value={selected}
  onChange={setSelected}
  name="tags"
  placeHolder="Enter tags"
  className="tags-input-container"
  inputProps={{
    className: 'tags-input-tag'
  }}
/> */}


            {/* Buttons */}
           

          </div>

          <div className='m-8'>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            type="submit"
            
          >
            Publish
          </button>

          <button
            className="  text-black font-semibold py-2 px-4 rounded-lg"
            type="submit"
          >
            Save Draft
          </button>

          <button
            className="text-black font-semibold py-2 px-4 rounded-lg"
            type="submit"
          >
            Revert new changes
          </button>

          </div>

         
           
            
        </div>
                                <div class="flex items-center h-10 intro-y">
                                    
                                </div>
                            </div>
                        </div>
            </div>
            </div>
      </main>
       
    );
}

export default BlogPostForm;

