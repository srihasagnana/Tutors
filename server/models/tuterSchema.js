const mongoose=require('mongoose')

const TuterSchema = new mongoose.Schema({
    tutorname: {
        type: String,
        required: true
    },
    phno:{
        type:Number,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    academyname: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true,
        enum: ['online', 'offline', 'both'] // optional improvement
    },
    password: {
        type: String,
        required: true
    },
    feedback: {
        type: [Object], // better to use array of objects
        default: []
    },
    payment: {
        type: [Object], // list of payments
        default: []
    },
    schedule: {
        day: String,
        time: String,
        subject: String
    },
    about: {
        type: String,
        required: true,
        default: "No description provided"
    },
    verified: {
        type: Boolean,
        default: false // added for admin verification
    },
    joinedStudents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        default: []
    }]
});
module.exports=mongoose.model('Tuter',TuterSchema)