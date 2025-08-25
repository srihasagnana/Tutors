const express=require('express')
const studentApp=express.Router()
const Student=require('../models/studentSchema')

// get req
studentApp.get('/students',async(req,res)=>{
    const studentDetails=await Student.find()
    res.send({message:"get req of student",payload:studentDetails})
})


// get req by student name
studentApp.get('/student/:studentname',async(req,res)=>{
    const StudentName=req.params.studentname
    const getStudent=await Student.findOne({studentname:StudentName})
    res.send({message:"student is",payload:getStudent})
})

// get req by student _id
studentApp.get('/studentid/:ids',async(req,res)=>{
    const ids=req.params.ids.split(',')
    const getStudent=await Student.find({_id:{$in:ids}})
    res.send({message:"student with _id is",payload:getStudent})
})

// post req
studentApp.post('/student',async(req,res)=>{
    const studentDetails=req.body
    const newStudent=new Student(studentDetails)
    const StudentObj=await newStudent.save()
    res.send({message:"new student added",payload:StudentObj})
})

// put req
studentApp.put('/student/update/:_id',async(req,res)=>{
    const StudentId=req.params._id
    const StudentDetails=req.body
    const updateDetails=await Student.findByIdAndUpdate(StudentId,{$set:StudentDetails},{new:true})
    res.send({message:"updated details are:",payload:updateDetails})
})


module.exports=studentApp;