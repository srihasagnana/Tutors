const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true
  },
  tutorName: {
    type: String,
    required: true
  },
  trialStatus: {
    type: Boolean,
    default: false
  },
  joinDate: {
    type: Date,
    default: Date.now
  }
});

const StudentSchema = new mongoose.Schema({
  studentname: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  mode: {
    type: String,
    enum: ['online', 'offline'],
    default: 'online'
  },
  password: {
    type: String,
    required: true,
  },
  courses: [CourseSchema], // <-- Array of course objects
});

module.exports = mongoose.model('Student', StudentSchema);
