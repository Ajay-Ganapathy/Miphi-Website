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
    const [email , setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(1); 
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null); 
    const [designation , setDesignation]  = useState('');
    const [error , setError] = useState('')
    const navigate = useNavigate();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@miphi\.in$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(); 
            formData.append('email', email);
            formData.append('name', name);
            formData.append('password', password);
            formData.append('role', role);

            if (profile) {
                formData.append('profile', profile); 
            }

            formData.append('designation' , designation) ;

            
            await axios.post(`${apiUrl}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if(error != ''){
                MySwal.fire({
                    icon: 'error',
                    title: 'Enter the domain miphi.in',
                    text: error,
                });
                return;
            }

            MySwal.fire({
                icon: 'success',
                title: 'Registration successful!',
            });
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
        <div className={styles.main} style = {{display : "flex" , alignItems : "center" , justifyContent : "center"}} >
            <br />
            <br />
            <br />

            <div className="px-24 mb-11" >
                <div className="container px-3 mx-auto flex flex-wrap flex-col md:flex-row items-center justify-between flex-end">
                   
                    <div className="w-70 mt-7 mb-10" >
                        <div className="transform hover:scale-105 transition duration-300 shadow-xl rounded-lg col-span-12 sm:col-span-6 xl:col-span-3 intro-y bg-white">
                            <div className="p-5">
                                <div style={{ width: "25vw" }} className="m-8 w-full flex-1">
                                    <div>
                                        <div className="mt-3 text-3xl font-bold leading-8 mb-8" >Add Users</div>
                                        <form onSubmit={handleSubmit}>
                                            <div className='flex flex-row justify-between'>
                                                <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="email">
                                                    Email
                                                </label>
                                                <input
                                                    className={styles.formInput}
                                                    type="email"
                                                    id="email"
                                                    placeholder="User Name"
                                                    value={email}
                                                    onChange={(e) => {
                                                        setEmail( (e.target.value ).trim());
                                                        

                                                        if(!email.endsWith("miphi.in")){
                                                            setError('Enter miphi.in  domain')
                                                        }else{
                                                            setError('')

                                                        }

                                                        console.log(email.endsWith("miphi.in"))
                                                        
                                                      
                                                    }}
                                                    required
                                                />
                                            </div>



                                            <br />

                                            {error != ''  && <p style={{ color: 'red' }}>{error}</p>}

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
                                                <label className="block text-gray-700 text-sm font-bold mb-2 mt-2" htmlFor="designation">
                                                   Designation
                                                </label>
                                                <input
                                                    className={styles.formInput}
                                                    type="text"
                                                    id="designation"
                                                    placeholder="Designation"
                                                    value={designation}
                                                    onChange={(e) => setDesignation(e.target.value)}
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
                                                    {loading ? 'Adding User ...' : 'Add user'}
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
            
        </div>
    );
}

export default Register;
