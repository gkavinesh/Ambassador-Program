import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaPlus, FaLinkedin } from 'react-icons/fa';
import Navbar from './Navbar';
import './Leaderboard.css'
import { FaSearch, FaFire, FaBolt } from 'react-icons/fa';
import { images } from '../assets/assets'; // Import images

const Leaderboard = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const studentsPerPage = 5;
  const role = localStorage.getItem('role');

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data.sort((a, b) => b.amountEarned - a.amountEarned)))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddStudent = async (studentData) => {
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/students', studentData, {
        headers: { Authorization: token }
      });
      setStudents(prevStudents => [...prevStudents, studentData]);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setCurrentPage(1);
  };


  const filteredStudents = students.filter(student =>
    (activeFilter === 'All' || student.bootcamp === activeFilter) &&
    student.name.toLowerCase().includes(searchTerm.toLowerCase())  // 🔥 Search applied here
  );
  

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className=" bg-gray-100 min-h-screen">
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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}  // 🔥 Added to handle search
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>


        {/* Icons */}
        <div className="flex items-center space-x-6 py-2">
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

      {/* Filter Buttons */}
      <div className="flex justify-center mb-6">
        {['All', 'Web3 Solidity', 'Full Stack', 'Web3 Beginner'].map((category) => (
          <button
            key={category}
            onClick={() => handleFilterChange(category)}
            className={`px-6 py-2 mx-2 rounded-full border ${activeFilter === category ? 'bg-lime-400 text-white' : 'bg-white text-gray-700'
              } shadow-md hover:bg-lime-400 hover:text-white transition duration-300`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Admin-only "+" Button */}
      {role === 'admin' && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-green-500 text-white px-4 py-2 rounded-full flex items-center shadow-md hover:bg-green-600"
          >
            <FaPlus className="mr-2" /> Add Student
          </button>
        </div>
      )}

      {/* Top 3 Students */}
      <div className="top-three-container">
        {filteredStudents.slice(0, 3).map((student, index) => (
          <div key={student._id} className={`profile-card rank-${index + 1}`}>
            <div className="card-header">
              <img src={student.profilePic} alt={student.name} className="profile-img" />
            </div>
            <div className="card-body">
              <h2 className="student-name">{student.name}</h2>
              <p className="student-bootcamp">
                <i className="fas fa-trophy"></i> {student.bootcamp}
              </p>
              <a href={student.linkedin} target="_blank" rel="noopener noreferrer" className="hover-btn">
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>


      {/* Remaining Students */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="py-4 px-4">Rank</th>
              <th className="py-4 px-4">Profile</th>
              <th className="py-4 px-4">Name</th>
              <th className="py-4 px-4">Bootcamp</th>
              <th className="py-4 px-4">LinkedIn</th>
              <th className="py-4 px-4">Amount Earned ($)</th>
              <th className="py-4 px-4">Referrals</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents.map((student, index) => (
              <tr key={student._id} className="text-center border-b hover:bg-gray-100">
                <td className="py-4">{indexOfFirstStudent + index + 1}</td>
                <td>
                  <img src={student.profilePic} alt={student.name} className="h-10 w-10 rounded-full mx-auto" />
                </td>
                <td className="py-4">{student.name}</td>
                <td className="py-4">{student.bootcamp}</td>
                <td>
                  <a href={student.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                    <FaLinkedin />
                  </a>
                </td>
                <td className="py-4">${student.amountEarned}</td>
                <td className="py-4">{student.referralsCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-600">Results: {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length}</span>
        <div className="flex">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 mx-1 rounded-lg ${currentPage === i + 1 ? 'bg-lime-400 text-white' : 'bg-gray-200 text-gray-700'
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;






