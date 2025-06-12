const mongoose=require('mongoose');
const studentApp = require('../Apis/StudentApi');

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
    default: 'online' // or remove `required`
  },
  tutorname: {
    type: String,
    default: 'Not Assigned' // or remove `required`
  },
  password: {
    type: String,
    required: true,
  },
  trialStatus: {
    type: Boolean,
    default: true,
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports=mongoose.model('Student',StudentSchema)