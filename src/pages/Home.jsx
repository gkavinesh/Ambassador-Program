import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaLinkedin } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Leaderboard from '../components/Leaderboard';


const Home = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const role = localStorage.getItem('role');

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Leaderboard />
    </div>
  );
};

export default Home;
