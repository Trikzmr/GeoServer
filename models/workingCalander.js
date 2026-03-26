const mongoose = require('mongoose');

const workingCalendarSchema = new mongoose.Schema({
year: { 
    type: Number,
    required: true
  }, 
  month: {
    type: String,
    required: true
  },
  dayCalander: [
    {
      date: {
        type: Date,
      },
      dayType: {
          type: Number,
          enum : [0, 1],
      },

      title: {
        type: String
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('WorkingCalendar', workingCalendarSchema);
