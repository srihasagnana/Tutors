const express=require('express')
const TutorApp=express.Router()
const Tutor=require('../models/tuterSchema')

// get details
TutorApp.get('/tutors',async(req,res)=>{
    const details=await Tutor.find()
    res.send({message:"tutors are",payload:details})
})

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

// update req
TutorApp.put('/tutorupdate/:_id', async (req, res) => {
  const _id = req.params._id; 
  const updatedData = req.body;

  try {
    const updatedTutor = await Tutor.findByIdAndUpdate(_id, updatedData, { new: true });
    res.send({ message: "Tutor updated successfully", payload: updatedTutor });
  } catch (err) {
    res.status(500).send({ message: "Error updating tutor", error: err.message });
  }
});

// delete req
TutorApp.delete('/tutordelete/:tutorname',async(req,res)=>{
    const TutorDetails=req.params.tutorname
    const DeleteTutor=await Tutor.deleteOne({tutorname:TutorDetails})
    res.send({message:"tutor deleted",payload:DeleteTutor})
})

module.exports=TutorApp;