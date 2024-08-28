import React, { useState } from 'react';
import axios from 'axios';
import TextEditor from './TextEditor';

const Form = () => {
  const [authorName, setAuthorName] = useState('');
  const [title, setTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [message, setMessage] = useState('');
  const [image , setImage] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('author_name', authorName);
    formData.append('blog_title', title);
    formData.append('blog_content', blogContent);
    formData.append('status', 'Pending');
    
    // Append the image file if it exists
    if (image) {
      formData.append('image_url', image);
    }
  
    try {
      const response = await axios.post('http://localhost:5000/blogs', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Blog submitted successfully:', response.data);
      setMessage('Blog submitted successfully!'); 
  
      setAuthorName('');
      setTitle('');
      setBlogContent('');
      setImage(null);
    } catch (error) {
      console.error('Error submitting blog:', error);
      setMessage('Error submitting blog. Please try again.');
    }
  };
  

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="w-full max-w-xl">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-8" onSubmit={handleSubmit}>
          <div>
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
          </div>
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
  );
};

export default Form;
