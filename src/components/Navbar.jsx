import React from 'react';
import { FaSearch, FaFire, FaBolt } from 'react-icons/fa';
import { images } from '../assets/assets'; // Import images

const Navbar = () => {
    return (
        <nav className="w-full bg-transparent py-2 px-10 flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex justify-start">
                <img src={images.logo} alt="Logo" className="w-48 h-auto" />
            </div>

            <div className="flex items-center w-2/5">
                <div className="relative w-full">
                    <input
                        type="text"
                        placeholder="Enter Student's Name"
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </div>


            {/* Icons */}
            <div className="flex items-center space-x-6">
                {/* Fire Icon */}
                <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                    <FaFire className="text-orange-500" />
                </button>

                {/* Bolt Icon */}
                <button className="bg-gray-100 p-2 rounded-full hover:bg-gray-200">
                    <FaBolt className="text-blue-500" />
                </button>

                {/* Profile Picture */}
                <div className="relative">
                    <img
                        src="https://www.gstatic.com/webp/gallery/1.jpg" // Replace with user profile image
                        alt="User Profile"
                        className="w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer"
                    />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
