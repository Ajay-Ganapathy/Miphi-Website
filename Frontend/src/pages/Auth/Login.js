import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const Login = () => {
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
                        navigate('/author/home');
                    } else if (role === '2') {
                        navigate('/admin/');
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
                title: 'Error',
                text: errorMessage,
            });
        } finally {
            setLoading(false);
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
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Submit'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
