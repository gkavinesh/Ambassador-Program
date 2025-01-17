import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const role = localStorage.getItem('role');

  useEffect(() => {
    axios.get('http://localhost:5000/api/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddStudent = async (studentData) => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:5000/api/students', studentData, {
      headers: { Authorization: token }
    });
    window.location.reload();
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Student Leaderboard</h1>
      
      {/* Admin-only "+" Button */}
      {role === 'admin' && (
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded mb-4"
        >
          + Add Student
        </button>
      )}

      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Bootcamp</th>
            <th>LinkedIn</th>
            <th>Amount Earned ($)</th>
            <th>Referrals</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td><img src={student.profilePic} alt={student.name} className="h-10 w-10 rounded-full" /></td>
              <td>{student.name}</td>
              <td>{student.bootcamp}</td>
              <td>
                <a href={student.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-500">View</a>
              </td>
              <td>${student.amountEarned}</td>
              <td>{student.referralsCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Admin-only Modal to Add Student */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-4">Add New Student</h2>
            <AddStudentForm onSubmit={handleAddStudent} onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

const AddStudentForm = ({ onSubmit, onClose }) => {
  const [student, setStudent] = useState({
    name: '', profilePic: '', bootcamp: '', linkedin: '', amountEarned: 0, referralsCount: 0
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(student);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" onChange={handleChange} required />
      <input name="profilePic" placeholder="Profile Picture URL" onChange={handleChange} required />
      <input name="bootcamp" placeholder="Bootcamp" onChange={handleChange} required />
      <input name="linkedin" placeholder="LinkedIn URL" onChange={handleChange} required />
      <input name="amountEarned" type="number" placeholder="Amount Earned" onChange={handleChange} required />
      <input name="referralsCount" type="number" placeholder="Referrals" onChange={handleChange} required />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>
      <button type="button" onClick={onClose} className="ml-2 bg-gray-300 px-4 py-2 rounded">Cancel</button>
    </form>
  );
};

export default Leaderboard;

