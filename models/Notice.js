const mongoose = require('mongoose');

const noticeSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Notice = mongoose.model('Notice', noticeSchema);
module.exports = Notice;
