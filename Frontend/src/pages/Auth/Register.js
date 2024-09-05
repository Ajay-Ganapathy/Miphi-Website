import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './form.module.css';
import Icon from '../../Components/Icon';

const Register = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const MySwal = withReactContent(Swal);
    const [username, setUserName] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(1); 
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(); 
            formData.append('username', username);
            formData.append('name', name);
            formData.append('password', password);
            formData.append('role', role);

            if (profile) {
                formData.append('profile', profile); 
            }

            
            await axios.post(`${apiUrl}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

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
        <div className={styles.main} style={{ background: "linear-gradient(to right, #FF7E5F, #FFB88C)", height: "100%" }}>
            <br />
            <br />
            <br />

            <div className="px-24 mb-11">
                <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-between flex-end">
                    <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                        <Icon />

                        <p className="text-3xl tracking-loose w-full text-gray-100 font-bold rounded-full tracking-wider">
                            Have an account?
                        </p>
                        <p className="text-3xl tracking-loose w-full text-gray-100 font-bold rounded-full tracking-wider">Register and start writing blogs</p>

                        <Link to="/login" className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                            Login Now
                        </Link>
                    </div>
                    <div className="w-70 mt-7 mb-10">
                        <div className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white">
                            <div className="p-5">
                                <div style={{ width: "25vw" }} className="m-8 w-full flex-1">
                                    <div>
                                        <div className="mt-3 text-3xl font-bold leading-8 mb-8">Register Now!</div>
                                        <form onSubmit={handleSubmit}>
                                            <div className='flex flex-row justify-between'>
                                                <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="username">
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
                                                <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="profile_img">
                                                    Profile Photo
                                                </label>
                                                <input
                                                    className={styles.formInput}
                                                    type="file"
                                                    id="profile_img"
                                                    onChange={(e) => setProfile(e.target.files[0])}
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
