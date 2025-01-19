import React, { useState, useEffect } from 'react';
import { images } from '../assets/assets';
import Preloader from '../components/preloader/preloader';
import axios from 'axios'; // Import axios

const Register = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
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

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setMessage(response.data.message); // Success message from backend
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-gray-200 flex flex-col justify-center items-start p-16 relative">
        {/* Logo at the top-left */}
        <div className="absolute top-6 left-6 p-12">
          <img
            src={images.logo}
            alt="Platform Logo"
            className="w-56 h-auto"
          />
        </div>

        {/* Content Section */}
        <div className="max-w-2xl mt-16">
          <h1 className="text-6xl font-bold leading-tight mb-16 text-gray-800">
            Become an Ambassador and Inspire Others! 🌟
          </h1>
          <p className="text-lg text-gray-600 mb-16">
            Join our program, empower students, and earn rewards by connecting them with our bootcamps.
          </p>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <img
              src="https://randomuser.me/api/portraits/women/45.jpg"
              alt="Ambassador"
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-sm text-gray-800 font-semibold">
                "Joining this program has been life-changing. I’ve helped others while growing personally!"
              </p>
              <p className="text-xs text-gray-500 mt-1">- Jane Doe, Metana Ambassador</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-white flex flex-col justify-center items-center">
        <div className="max-w-xl w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">Register for Metana's Ambassador Program</h2>
          <p className="text-center text-gray-500 mb-6">Create your account to get started.</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* Username Input */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Enter your username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 block w-full rounded-md p-4 border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="YourUsername"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

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

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm your password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="mt-1 block w-full rounded-md p-4 border-2 border-gray-300 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="ConfirmPassword123"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            {/* Message */}
            {message && <p className="text-center text-red-500">{message}</p>}

            {/* Continue Button */}
            <button
              type="submit"
              className="w-full bg-lime-400 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition duration-200 flex items-center justify-center"
            >
              Register →
            </button>
          </form>

          {/* Already Have an Account */}
          <p className="text-center text-gray-500 mt-6">
            Already have an account?{' '}
            <a href="/login" className="text-blue-700 font-medium hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;

