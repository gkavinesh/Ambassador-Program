import React, { useState } from 'react';
import axios from 'axios';

const DataEntryForm = () => {
  const [student, setStudent] = useState({
    name: '',
    profilePic: '',
    bootcamp: '',
    linkedin: '',
    amountEarned: 0,
    referralsCount: 0
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/students', student, {
        headers: { Authorization: token }
      });
      alert('Student data added successfully!');
      setStudent({
        name: '',
        profilePic: '',
        bootcamp: '',
        linkedin: '',
        amountEarned: 0,
        referralsCount: 0
      });
    } catch (error) {
      alert('Error adding student data.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={student.name} onChange={handleChange} required className="w-full p-2 mb-2 border rounded" />
        <input name="profilePic" placeholder="Profile Picture URL" value={student.profilePic} onChange={handleChange} required className="w-full p-2 mb-2 border rounded" />
        <input name="bootcamp" placeholder="Bootcamp" value={student.bootcamp} onChange={handleChange} required className="w-full p-2 mb-2 border rounded" />
        <input name="linkedin" placeholder="LinkedIn URL" value={student.linkedin} onChange={handleChange} required className="w-full p-2 mb-2 border rounded" />
        <input name="amountEarned" type="number" placeholder="Amount Earned" value={student.amountEarned} onChange={handleChange} required className="w-full p-2 mb-2 border rounded" />
        <input name="referralsCount" type="number" placeholder="Referrals" value={student.referralsCount} onChange={handleChange} required className="w-full p-2 mb-4 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default DataEntryForm;
