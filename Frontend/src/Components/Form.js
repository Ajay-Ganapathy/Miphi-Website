import React from 'react';
import axios from 'axios';

const Form = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      author_name: formData.get('authorname'),
      blog_title: formData.get('title'),
      blog_content: formData.get('blogcontent'),
      status: 'Pending' // Initial status when the blog is submitted
    };

    console.log(data)

    try {
      const response = await axios.post('http://localhost:5000/blogs', data);
      console.log('Blog submitted successfully:', response.data);
      // Handle success (e.g., show a success message or redirect)
    } catch (error) {
      console.error('Error submitting blog:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="w-full max-w-xs">
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
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              required
            />
            <p className="text-red-500 text-xs italic">Title</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="blogcontent">
              Blog Content
            </label>
            <textarea
              id="blogcontent"
              name="blogcontent"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
              required
            ></textarea>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
