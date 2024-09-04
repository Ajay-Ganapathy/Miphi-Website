// import React, { useState } from 'react';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';
// import { useNavigate } from 'react-router-dom';

// const MySwal = withReactContent(Swal);

// function Register() {
    // const [name, setName] = useState('');
    // const [password, setPassword] = useState('');
    // const [role, setRole] = useState(2);
    // const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await axios.post('http://localhost:5000/register', { name, password, role});
    //         MySwal.fire({
    //             icon: 'Success ',
    //             title: 'Registered Successfully!',
                
    //         }).then(navigate("/login"));
    //     } catch (error) {
    //         const errorMessage = error.response?.data?.message || 'Registration Failed';
    //         MySwal.fire({
    //             icon: 'error',
    //             title: 'Registration failed',
    //             text: errorMessage,
    //         });
    //     }
    // };

//     return (
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//             <div className="w-full max-w-xl">
//                 <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mt-8" onSubmit={handleSubmit}>
//                     <div>
//                         <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//                             Name
//                         </label>
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                             id="name"
//                             name="name"
//                             type="text"
//                             placeholder="User Name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="password">
//                             Password
//                         </label>
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                             id="password"
//                             name="password"
//                             type="password"
//                             placeholder="Enter password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>

//                     <button
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
//                         type="submit"
//                     >
//                         Submit
//                     </button>
//                 </form>
//                 <ToastContainer />
//             </div>
//         </div>
//     );
// }

// export default Register;

// // import React, { useState } from 'react';

// // const Register = () => {
// //   // State to track if the user is typing in the password field
// //   const [isTypingPassword, setIsTypingPassword] = useState(false);

// //   // State to track the length of the username input
// //   const [usernameLength, setUsernameLength] = useState(0);

// //   const handlePasswordFocus = () => setIsTypingPassword(true);
// //   const handlePasswordBlur = () => setIsTypingPassword(false);

// //   const handleUsernameChange = (event) => {
// //     setUsernameLength(event.target.value.length);
// //   };

// //   // Calculate rotation angle based on username length
// //   const rotationAngle = usernameLength * 5; // Adjust multiplier as needed

// //   return (
// //     <div style={{ textAlign: 'center', marginTop: '50px' }}>
// //       <div style={{ marginBottom: '20px' }}>
// //         {isTypingPassword ? (
// //           // Bear with closed eyes
// //           <svg
// //             width="100"
// //             height="100"
// //             viewBox="0 0 100 100"
// //             style={{ transform: `rotate(${rotationAngle}deg)`, transition: 'transform 0.3s' }}
// //           >
// //             <circle cx="50" cy="50" r="40" fill="#FFD700" />
// //             <circle cx="35" cy="40" r="5" fill="black" />
// //             <circle cx="65" cy="40" r="5" fill="black" />
// //             <rect x="30" y="60" width="40" height="5" fill="black" />
// //           </svg>
// //         ) : (
// //           // Bear with open eyes
// //           <div className="bear-container">
// //       <svg width="800px" height="800px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="iconify iconify--fxemoji" preserveAspectRatio="xMidYMid meet">
// //         <path fill="#AF773F" d="M505.769 339.18c0-79.323-66.074-89.722-67.631-128.426c-.052-4.03-.249-8.025-.56-11.988c29.177-13.125 49.505-42.427 49.505-76.495c0-46.314-37.545-83.86-83.86-83.86c-20.089 0-38.522 7.072-52.963 18.851C322.761 40.598 290.503 31 255.999 31c-35.799 0-69.181 10.33-97.338 28.167c-14.751-12.913-34.053-20.756-55.197-20.756c-46.314 0-83.86 37.545-83.86 83.86c0 36.043 22.743 66.768 54.658 78.626a184.139 184.139 0 0 0-.406 10.284c-1.963 37.891-65.001 48.714-66.53 125.162a132.16 132.16 0 0 0-1.096 16.982c0 72.27 58.586 130.856 130.856 130.856c.336 0 .686-.006 1.048-.016c13.734-.108 26.959-2.335 39.374-6.366c8.255-1.677 16.951-3.494 25.495-5.206c36.02 18.846 75.361 23.353 103.252 4.547c22.013 4.937 46.859 9.13 68.655 7.041c72.27 0 130.856-58.586 130.856-130.856c0-4.325-.216-8.6-.626-12.817c.41-.401.629-.842.629-1.328zM215.157 470.227c3.247-.61 6.424-1.185 9.497-1.71a56.977 56.977 0 0 1-9.497 1.71z"></path>
// //         <path className="eye-left" fill="#D19B61" d="M277.806 304.361s7.646 9.475 20.474 23.688c6.353 7.106 13.072 15.397 23.922 24.28c10.512 8.883 23.621 18.358 30.381 27.833c6.869 9.475 7.806 18.95 8.496 27.833c.347 8.883-1.352 17.174-4.29 24.28c-2.957 7.106-6.92 13.028-10.807 17.174c-3.471 4.145-6.726 6.514-6.726 6.514c-50.847 37.002-118.23 35.043-166.513 0c0 0-3.255-2.369-6.726-6.514c-3.888-4.145-7.85-10.067-10.808-17.174c-2.937-7.106-4.636-15.397-4.289-24.28c.69-8.883 1.628-18.358 8.495-27.833c6.759-9.475 19.869-18.95 30.381-27.833c10.851-8.883 17.569-17.174 23.922-24.28c12.83-14.212 20.475-23.688 20.475-23.688c9.718-12.043 27.359-13.928 39.402-4.21a29.552 29.552 0 0 1 4.211 4.21z"></path>
// //         <path className="eye-right" fill="#2B3B47" d="M145.578 241.842c15.148 0 27.428 12.28 27.428 27.428v33.716c0 15.148-12.28 27.428-27.428 27.428c-15.148 0-27.428-12.28-27.428-27.428V269.27c0-15.148 12.28-27.428 27.428-27.428zm220.844 0c-15.148 0-27.428 12.28-27.428 27.428v33.716c0 15.148 12.28 27.428 27.428 27.428c15.148 0 27.428-12.28 27.428-27.428V269.27c0-15.148-12.28-27.428-27.428-27.428z"></path>
// //         <path fill="#E583C9" d="M60.088 122.271c0-23.956 19.42-43.376 43.376-43.376a43.164 43.164 0 0 1 22.766 6.455c-20.32 20.633-35.755 46.084-44.439 74.488c-12.969-7.499-21.703-21.509-21.703-37.567zm369.215 34.659c10.504-7.916 17.296-20.493 17.296-34.659c0-23.956-19.42-43.376-43.376-43.376a43.17 43.17 0 0 0-19.341 4.552c20.552 20.265 36.308 45.377 45.421 73.483z"></path>
// //       </svg>
// //     </div>
// //         )}
// //       </div>
// //       <form>
// //         <div style={{ marginBottom: '10px' }}>
// //           <label>Username:</label>
// //           <input
// //             type="text"
// //             name="username"
// //             onChange={handleUsernameChange}
// //           />
// //         </div>
// //         <div style={{ marginBottom: '10px' }}>
// //           <label>Password:</label>
// //           <input
// //             type="password"
// //             name="password"
// //             onFocus={handlePasswordFocus}
// //             onBlur={handlePasswordBlur}
// //           />
// //         </div>
// //         <button type="submit">Register</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Register;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './form.module.css';
import Icon from '../../Components/Icon';

const Register = () => {
    const MySwal = withReactContent(Swal);
    const [username, setUserName] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(2);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/register', { username, name, password, role });
            MySwal.fire({
                icon: 'success',
                title: 'Registration successful!',
            }).then(() => navigate("/login"));
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Registration Failed';
            MySwal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.main} style={{ background: "linear-gradient(to right, #FF7E5F, #FFB88C)" , height : "100%"}}>
            <br />
            <br />
            <br />
            
            <div className="px-24 mb-11">
                <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-between flex-end">
                    <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                    <Icon />
                        
                        <p className="text-3xl tracking-loose w-full text-gray-100 font-bold rounded-full tracking-wider">
                            Have an account ?
                        </p>
                        <p className="text-3xl tracking-loose w-full text-gray-100 font-bold rounded-full tracking-wider">Register and Start writing blogs</p>

                        <Link to="/login" className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                            Login Now
                        </Link>
                    </div>
                    <div className="w-70 mt-7 mb-10">
                        <div className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white">
                            <div className="p-5">
                                <div style = {{width : "25vw"}} className="m-8 w-full flex-1">
                                    <div >
                                        <div className="mt-3 text-3xl font-bold leading-8 mb-8">Register Now!</div>
                                        <form onSubmit={handleSubmit}>
                                            <div className='flex flex-row justify-between'>

                                            <label className="block text-gray-700 text-sm font-bold mb-2  mt-2" htmlFor="username">
                                                User Name
                                            </label>
                                            <input
                                                className={styles.formInput}
                                                type="text"
                                                id="username"
                                                placeholder="User Name"
                                                value={username}
                                                onChange={(e) => setUserName(e.target.value)}
                                                required
                                            />

                                            </div>
                                           
                                            <br />
                                            <br />
                                            <div className='flex flex-row justify-between'>

                                            <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="name">
                                                Name
                                            </label>
                                            <input
                                                className={styles.formInput}
                                                type="text"
                                                id="name"
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                            </div>
                                            <br />
                                            <br />
                                            
                                            <div className='flex flex-row justify-between'>
                                            <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="password">
                                                Password
                                            </label>
                                            <input
                                                className={styles.formInput}
                                                type="password"
                                                id="password"
                                                placeholder="Password"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            </div>
                                            <br />
                                            
                                            <div className="flex justify-center">
                                                <button
                                                    className="flex flex-row content-center text-center mx-auto lg:mx-0 hover:underline bg-blue-500 text-white font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                                                    type="submit"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Registering...' : 'Register'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="relative -mt-20 lg:-mt-24">
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                    </defs>
                    <g className="parallax">
                        <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
                        <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
                        <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
                        <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
                    </g>
                </svg>
            </div>
        </div>
    );
}

export default Register;
