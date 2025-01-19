import React from 'react';
import { images } from '../../assets/assets'; // Replace with your actual image import path

const Preloader = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="text-center">
        {/* Logo */}
        <img
          src={images.logo} // Replace with your logo URL
          alt="Platform Logo"
          className="w-48 h-auto mx-auto mb-8"
        />

        {/* Loader */}
        <div className="relative w-40 h-1 bg-gray-200 mx-auto rounded-full overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-full bg-lime-400 rounded-full animate-loader"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;

