const exp=require("express")
const mongoose=require("mongoose")

const app=exp()
require('dotenv').config()
const cors=require('cors');
const TutorApp = require("./Apis/TutorApi");
const studentApp = require("./Apis/StudentApi");
app.use(cors())
app.use(exp.json())
const port=process.env.PORT || 5000

mongoose.connect(process.env.DBURL)
.then(()=>{
    app.listen(port,()=>console.log(`server working on port ${port}...`))
    console.log("database connection success")
})
.catch(err=>console.log("error occurred",err))

app.use('/tutor-api',TutorApp)
app.use('/student-api',studentApp)