// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content';

// const MySwal = withReactContent(Swal);

// const Login = () => {
//     const [name, setName] = useState('');
//     const [pass, setPass] = useState('');
//     const [loading, setLoading] = useState(false);

//     const navigate = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);

    //     try {
    //         const response = await axios.post('http://localhost:5000/login', {
    //             name,
    //             password: pass,
    //         });

    //         const { token, role } = response.data;

    //         if (token) {
    //             localStorage.setItem('token', token);
    //             localStorage.setItem('role', role);

    //             MySwal.fire({
    //                 icon: 'success',
    //                 title: 'Login successful!',
    //             }).then( role === '1' ? navigate("/author") : navigate("/admin")
    //         );

    //         } else {
    //             MySwal.fire({
    //                 icon: 'error',
    //                 title: 'Login failed',
    //                 text: 'No token received.',
    //             });
    //         }

    //         setName('');
    //         setPass('');
    //     } catch (error) {
    //         console.error('Error logging in', error);
    //         const errorMessage = error.response?.data?.message || 'Error logging in';
    //         MySwal.fire({
    //             icon: 'error',
    //             title: 'Invalid Credentials',
    //             text: errorMessage,
    //         });
    //     } finally {
    //         setLoading(false);
    //     }
    // };

//     return (
//         <div className='flex flex-col'>
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
//                         <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="pass">
//                             Password
//                         </label>
//                         <input
//                             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
//                             id="pass"
//                             name="pass"
//                             type="password"
//                             placeholder="Enter password"
//                             value={pass}
//                             onChange={(e) => setPass(e.target.value)}
//                             required
//                         />
//                     </div>

                    // <button
                    //     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                    //     type="submit"
                    //     disabled={loading}
                    // >
                    //     {loading ? 'Logging in...' : 'Submit'}
                    // </button>
//                 </form>

               
//             </div>
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
//   <path fill="#ff5500" fill-opacity="1" d="M0,128L48,144C96,160,192,192,288,202.7C384,213,480,203,576,181.3C672,160,768,128,864,117.3C960,107,1056,117,1152,128C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
// </svg>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './form.module.css';

const Login = () => {
    const MySwal = withReactContent(Swal);
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/login', {
                name,
                password: pass,
            });

            const { token, role } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);

                MySwal.fire({
                    icon: 'success',
                    title: 'Login successful!',
                }).then(() => {
                    if (role === '1') {
                        navigate("/author");
                    } else {
                        navigate("/admin");
                    }
                });

            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Login failed',
                    text: 'No token received.',
                });
            }

            setName('');
            setPass('');
        } catch (error) {
            console.error('Error logging in', error);
            const errorMessage = error.response?.data?.message || 'Error logging in';
            MySwal.fire({
                icon: 'error',
                title: 'Invalid Credentials',
                text: errorMessage,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.main} style={{ background: "linear-gradient(to right, #FF7E5F, #FFB88C)" }}>
            <br />
            <br />
            <br />
            <br />
            <div className="px-24 mb-11">
                <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-between flex-end">
                    <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                        <p className="text-3xl tracking-loose w-full text-gray-100 font-bold rounded-full tracking-wider">Login and Start writing blogs</p>
                        <h1 className="my-4 text-5xl font-bold leading-tight">
                            Welcome to Miphi
                        </h1>
                        <p className="leading-normal text-2xl tracking-loose w-full">
                            Haven't registered yet ?
                        </p>
                        <Link to="/register" className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                            Register Now
                        </Link>
                    </div>
                    <div className="w-70 mt-7 mb-10">
                        <div className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white">
                            <div className="p-5">
                                <div className="m-8  w-full flex-1">
                                    <div>
                                        <div className="mt-3 text-3xl font-bold leading-8 mb-4">Login Now !</div>
                                        <div className="mt-1 text-base text-gray-600">
                                            <form onSubmit={handleSubmit}>
                                                <p>User Name</p>
                                                <input
                                                    className={styles.formInput}
                                                    type="text"
                                                    placeholder="User Name"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    required
                                                />
                                                <br />
                                                <br />
                                                <p>Password</p>
                                                <input
                                                    className={styles.formInput}
                                                    type="password"
                                                    placeholder="Password"
                                                    value={pass}
                                                    onChange={(e) => setPass(e.target.value)}
                                                    required
                                                />
                                                <br />
                                                <br />
                                                <br />
                                                <button
                                                    className="text-center mx-auto lg:mx-0 hover:underline bg-blue text-center text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"
                                                    type="submit"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Logging in...' : 'Submit'}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <div className="relative -mt-20 lg:-mt-24">
                <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
                    <defs>
                        <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
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

export default Login;

