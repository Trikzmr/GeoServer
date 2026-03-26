const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: [String],
    enum: ['check-in', 'check-out'],
    required: true,
  },
  time: {
    type: [String],
    required: true,
  },
  locationLogs: [
    {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      }
    }
  ],
  locationName: {
    type: String,
  },
  month: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
});

const Attendance = mongoose.model('Attendance', AttendanceSchema);
module.exports = Attendance;
