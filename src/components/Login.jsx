import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // For routing
import { images } from '../assets/assets';
import Preloader from '../components/preloader/preloader';
import axios from 'axios'; // For API requests

const Login = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // To redirect after login

    useEffect(() => {
        // Show preloader for 2 seconds
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer); // Clean up timer
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make a POST request to login endpoint
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);

            if (response.data.success) {
                // Store token and user role in local storage
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);

                // Redirect to homepage after successful login
                navigate('/');
            } else {
                setMessage(response.data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred during login.');
        }
    };

    if (isLoading) {
        return <Preloader />;
    }

    return (
        <div className="flex min-h-screen">
            {/* Left Section */}
            <div className="w-1/2 bg-gray-200 flex flex-col justify-center items-start p-16 relative">
                {/* Logo */}
                <div className="absolute top-6 left-6 p-12">
                    <img
                        src={images.logo} // Replace with your logo URL
                        alt="Platform Logo"
                        className="w-56 h-auto"
                    />
                </div>

                {/* Content */}
                <div className="max-w-2xl mt-16">
                    <h1 className="text-6xl font-bold leading-tight mb-16 text-gray-800">
                        Join Our Ambassador Program and Make a Difference! 🌟
                    </h1>
                    <p className="text-lg text-gray-600 mb-16">
                        Empower aspiring students and earn rewards by connecting them with the right opportunities in our bootcamps.
                    </p>
                    <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
                        <img
                            src="https://randomuser.me/api/portraits/men/45.jpg"
                            alt="Ambassador"
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <p className="text-sm text-gray-800 font-semibold">
                                "Being an ambassador has been incredibly fulfilling. I get to mentor others while earning rewards!"
                            </p>
                            <p className="text-xs text-gray-500 mt-1">- John Doe, Metana Ambassador</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 bg-white flex flex-col justify-center items-center">
                <div className="max-w-xl w-full">
                    <h2 className="text-2xl font-bold mb-4 text-center">Sign in to Metana's Ambassador Program</h2>
                    <p className="text-center text-gray-500 mb-6">
                        Welcome back! Please enter your login details.
                    </p>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Enter your email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="mt-1 block w-full rounded-md p-4 border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Enter your password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="mt-1 block w-full rounded-md p-4 border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="YourPassword123"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Error Message */}
                        {message && <p className="text-center text-red-500">{message}</p>}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-lime-400 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition duration-200 flex items-center justify-center"
                        >
                            Sign In →
                        </button>
                    </form>

                    {/* Create Account */}
                    <p className="text-center text-gray-500 mt-6">
                        Don't have an account?{' '}
                        <a href="/register" className="text-blue-700 font-medium hover:underline">
                            Create free account
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;



