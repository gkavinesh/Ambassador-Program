const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profilePic: { type: String },
  bootcamp: { type: String, required: true },
  linkedin: { type: String },
  amountEarned: { type: Number, default: 0 },
  referralsCount: { type: Number, default: 0 }
});

module.exports = mongoose.model('Student', studentSchema);
