const express=require('express')
const TutorApp=express.Router()
const Tutor=require('../models/tuterSchema')
const axios = require('axios');

// get details
TutorApp.get('/tutors',async(req,res)=>{
    const details=await Tutor.find()
    res.send({message:"tutors are",payload:details})
})
// get courses (updated route)
TutorApp.get('/tutor/recommend/:subject', async (req, res) => {
  const subject = req.params.subject;
  try {
    const response = await axios.post("http://localhost:7878/recommend", {
      subject: subject,
    });
    res.send({ message: "Recommended tutors", payload: response.data });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: "Flask server error" });
  }
});


// get name by tutor
TutorApp.get('/tutor/:tutorname',async(req,res)=>{
    const TutorName=req.params.tutorname
    const getTutor=await Tutor.findOne({tutorname:TutorName})
    if(getTutor)
        res.send({message:"tutors are",payload:getTutor})
    else
    res.send({message:"no tutor"})
})

// post req
TutorApp.post('/tutor',async(req,res)=>{
    const details=req.body
    const newtutor=new Tutor(details)
    const tutorobj=await newtutor.save()
    res.send({message:"tutor added",payload:tutorobj})
})

// put req
TutorApp.put('/tutorupdate/:_id',async(req,res)=>{
  const tutorId=req.params._id
  const details=req.body.joinedStudents
  const updatedDetails=await Tutor.findByIdAndUpdate(tutorId,{$addToSet:{joinedStudents:{$each:details}}},{new:true})
  res.send({message:"tutor updated..",payload:updatedDetails})
})

// get the student details
TutorApp.get('/student_tutor/:_id',async(req,res)=>{
  const details=req.params._id
  const studentDetails=await Tutor.findById(details).populate('joinedStudents')
  res.send({message:"students joined in the course are :",payload:studentDetails})
})


// delete req
TutorApp.delete('/tutordelete/:tutorname',async(req,res)=>{
    const TutorDetails=req.params.tutorname
    const DeleteTutor=await Tutor.deleteOne({tutorname:TutorDetails})
    res.send({message:"tutor deleted",payload:DeleteTutor})
})

module.exports=TutorApp;