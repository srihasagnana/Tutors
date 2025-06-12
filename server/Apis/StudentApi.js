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

// post req
studentApp.post('/student',async(req,res)=>{
    const studentDetails=req.body
    const newStudent=new Student(studentDetails)
    const StudentObj=await newStudent.save()
    res.send({message:"new student added",payload:StudentObj})
})


module.exports=studentApp;