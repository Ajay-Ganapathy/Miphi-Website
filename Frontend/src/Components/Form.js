import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextEditor from './TextEditor';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Form = () => {
  const [title, setTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        MySwal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error fetching user details',
        });
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
      const response = await axios.post('http://10.20.1.101:5000/blogs', formData, {
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
      setImage(null);
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
    <div className="container mx-auto p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">Write Your Blog Post</h1>
        <form className="bg-white shadow-md rounded-lg p-8" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="title"
              name="title"
              type="text"
              placeholder="Enter the title of your blog post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="image_url">
              Image
            </label>
            <input
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="image_url"
              name="image_url"
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="blogcontent">
              Content
            </label>
            <TextEditor value={blogContent} onChange={setBlogContent} />
          </div>

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
            type="submit"
          >
            Publish
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
