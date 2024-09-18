import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import styles from './form.module.css';
import Icon from '../../Components/Icon';
import Bear from '../../Components/Bear';

const Login = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
   
  

    const MySwal = withReactContent(Swal);
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${apiUrl}/login`, {
                username : name,
                password: pass,
            });

            const { token, role } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                localStorage.setItem('role', role);

              
                    if (role === '1') {
                        navigate("/author");
                    } else {
                        navigate("/admin");
                    }
             

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
        <div className={styles.main} >
            <br />
            <br />
            <br />
            <br />

            <video autoPlay muted loop className="background-video">
        <source src="http://localhost:5000/uploads/bgvid3.mp4" type="video/mp4" />
       
      </video>


            <div className="px-24 mb-11 ">
                <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-between flex-end">
                    <div className=" move-text flex flex-col w-full md:w-2/5 justify-center items-start text-center md:text-left">
                         
                         <h1 className="my-4 text-5xl font-bold leading-tight ml-40 text-gray-100">
                            Welcome to Miphi
                        </h1>
                        <p className="text-3xl tracking-loose w-full text-gray-100 mb-8 ml-40  font-bold rounded-full tracking-wider">Login and Start writing blogs</p>
                         {/* <Icon />  */}
                         <br />
                        
                        <p className="text-3xl tracking-loose w-full text-gray-100 font-bold rounded-full tracking-wider">
                            
                        </p>
                        {/* <p className="text-3xl tracking-loose w-full text-gray-100 font-bold rounded-full tracking-wider">Login  and Start writing blogs</p> */}

                       
                  

                        
                    </div>
                    <div className="w-70 mt-7 mb-10">
                        <div style={{ width: "30vw", textAlign: "center" }} className=" zoom-delay transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white">
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
            
           
            {/* <div className="relative -mt-20 lg:-mt-24">
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
            </div> */}
        </div>
    );
}

export default Login;
