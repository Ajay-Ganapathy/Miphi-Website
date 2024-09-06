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
import { TagsInput } from "react-tag-input-component";
import "./BlogPostForm.css";
import { ReactTags } from 'react-tag-autocomplete'
import { useCallback } from 'react';


function BlogPostForm() {

  const sugg = ["react" , "node"]
 
  const suggestions = sugg.map((name, index) => ({ value: index, label: name }))





    const [content, setContent] = useState('');
    const [tags, setTags] = useState([]);
    const [coverImage, setCoverImage] = useState(null);
    const [title, setTitle] = useState('');
    const fileInputRef = useRef(null); // Reference to the hidden file input

    // Trigger file input click when button is clicked
    const handleButtonClick = () => {
        fileInputRef.current.click();
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
   

    const handleSubmit = () => {
        // Handle form submission
        console.log('Form submitted');
    };

    return (
        <div className='bg-gray-100 ' style = {{ height : "100vh" }}>
          <div style = {{width : "70vw" , height : "80vh" , backgroundColor : "white"}} className='m-8  shadow-xl  rounded-xl mx-auto border-solid border-2 border-indigo-600'>
          <div >
            <h2>Create a Blog Post</h2>

             {/* Button to trigger file input */}
             <button type="button" onClick={handleButtonClick} className='border border-black-800 p-3'>
                Add a Cover Image
            </button>

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
                <div>
                    <h3>Cover Image Preview:</h3>
                    <img src={coverImage} alt="Cover Preview" width="300" />
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
            
    
           
        </div>
            {/* Rich Text Editor */}
            <ReactQuill theme="snow" style={{ height: '30vh' , margin : '10px'  }} value={content} onChange={setContent} />

          

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
    );
}

export default BlogPostForm;

