const express = require('express');
const router = express.Router();
const Student = require('../models/student');

// Get all students for the leaderboard
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ amountEarned: -1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new student (Admin-only)
router.post('/', async (req, res) => {
  const { name, profilePic, bootcamp, linkedin, amountEarned, referralsCount } = req.body;
  const newStudent = new Student({ name, profilePic, bootcamp, linkedin, amountEarned, referralsCount });
  try {
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
