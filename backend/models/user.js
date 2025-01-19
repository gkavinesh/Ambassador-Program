const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }, // Added email field
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student'], default: 'student' }
});

module.exports = mongoose.model('User', userSchema);

