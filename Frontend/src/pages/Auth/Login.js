import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './form.module.css';
import Icon from '../../Components/Icon';
import Bear from '../../Components/Bear';

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
            const response = await axios.post('http://10.20.1.101:5000/login', {
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
        <div className={styles.main} style={{ background: "linear-gradient(to right, #FF7E5F, #FFB88C)" , height : "100%"}}>
            <br />
            <br />
            <br />
            <br />
            <div className="px-24 mb-11">
                <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-between flex-end">
                    <div className="flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                        {/* <p className="text-3xl tracking-loose w-full text-gray-100 font-bold rounded-full tracking-wider">Login and Start writing blogs</p> */}
                        {/* <h1 className="my-4 text-5xl font-bold leading-tight">
                            Welcome to Miphi
                        </h1> */}
                         <Icon /> 
                        
                        <p className="text-3xl tracking-loose w-full text-gray-100 font-bold rounded-full tracking-wider">
                            Haven't registered yet ?
                        </p>
                        <p className="text-3xl tracking-loose w-full text-gray-100 font-bold rounded-full tracking-wider">Register and Start writing blogs</p>

                        <Link to="/register" className="mx-auto lg:mx-0 hover:underline bg-white text-gray-800 font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out">
                            Register Now
                        </Link>
                  

                        
                    </div>
                    <div className="w-70 mt-7 mb-10">
                        <div style={{ width: "30vw", textAlign: "center" }} className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white">
                            <div className="p-5">
                                <div className={`${styles.formContainer}`}>
                                    <div>
                                        <div className="mt-3 mb-2 text-3xl font-bold leading-8 mb-4">Login Now !</div>
                                        <div className="mt-1 text-base text-gray-600">
                                            <form onSubmit={handleSubmit}>
                                                <div className='mb-4'>
                                                    <label className={styles.formLabel}>User Name</label>
                                                    <input
                                                        className={styles.formInput}
                                                        type="text"
                                                        placeholder="User Name"
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <div className='mb-4'>
                                                    <label className={styles.formLabel}>Password</label>
                                                    <input
                                                        className={styles.formInput}
                                                        type="password"
                                                        placeholder="Password"
                                                        value={pass}
                                                        onChange={(e) => setPass(e.target.value)}
                                                        required
                                                    />
                                                </div>

                                                <button
                                                    className={styles.formButton}
                                                    type="submit"
                                                    disabled={loading}
                                                >
                                                    {loading ? 'Logging in...' : 'Login'}
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
