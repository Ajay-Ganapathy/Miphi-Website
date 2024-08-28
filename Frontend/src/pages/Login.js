// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//     const [name, setName] = useState('');
//     const [password, setPassword] = useState('');
//     const [message, setMessage] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
        
//         e.preventDefault();
        
//         try {
            
//             const response = await axios.post('http://localhost:5000/login', {
//                 name,
//                 password
//             });
//             console.log("Clicked")
//             console.log(response.status)
//             if (response.status === 200) {
//                 navigate('/admin/home'); // Redirect to /admin on successful login
//             }
//         } catch (error) {
//             if (error.response) {
//                 setMessage(error.response.data.message);
//             } else {
//                 setMessage('An error occurred. Please try again.');
//             }
//         }
//     };

//     return (

        
       
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//       <div className="w-full max-w-xl">
//         <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-8" onSubmit={handleSubmit}>
//           <div>
//             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="authorname">
//               Name
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//               id="name"
//               name="name"
//               type="text"
//               placeholder="User Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="title">
//               Title
//             </label>
//             <input
//               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//               id="password"
//               name="password"
//               type="password"
//               placeholder="Enter password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//             type="submit"
//           >
//             Submit
//           </button>

        
//         </form>
//       </div>
//     </div>
    
//     );
// };

// export default Login;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/login', {
        name,
        password: pass
      });
  
      console.log('Login submitted successfully:', response.data);
      setMessage('Login successfully!');
      setName('');
      setPass('');
      if (response.status === 200) {
       
            localStorage.setItem('isAuthenticated', 'true');

            navigate('/admin/dashboard');
    }
    } catch (error) {
      console.error('Error logging in', error);
      setMessage('Error logging in');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="w-full max-w-xl">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-8" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              name="name"
              type="text"
              placeholder="User Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="pass">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="pass"
              name="pass"
              type="password"
              placeholder="Enter password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>

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

export default Login;
