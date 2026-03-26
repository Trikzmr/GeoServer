const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  qualification: {
    type: [String],
  },
  skills: {
    type: [String],
  },
  presentAddress: {
    type: String,
  },
  permanentAddress: {
    type: String,
  },
  role: {
    type: String,
    enum: ['admin', 'employ', 'manager'],
    default: 'employ',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'Terminated'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// ✅ Fix: Use correct variable name (UserSchema)
const User = mongoose.models.User || mongoose.model('User', UserSchema);
module.exports = User;
