const exp = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');

const app = exp();

const TutorApp = require("./Apis/TutorApi");
const studentApp = require("./Apis/StudentApi");

app.use(cors());
app.use(exp.json());

const port = process.env.PORT || 5000;

mongoose.connect(process.env.DBURL)
.then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}...`));
    console.log("Database connection success");
})
.catch(err => console.log("Error occurred", err));

app.use('/tutor-api', TutorApp);
app.use('/student-api', studentApp);
