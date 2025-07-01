import axios from "axios";
import { createContext, useState } from "react";

export const StudentLoginContextObj = createContext();

function StudentLoginContext({ children }) {
  const [currentStudent, setCurrentStudent] = useState(null);

function handleLogin({ studentname, password }, navigate) {
  axios
    .get(`https://tutors-htxa.onrender.com/student/${studentname}`)
    .then((response) => {
      const student = response.data.payload; 
      console.log('Student data:', student);

      if (student && student.password === password) {
        setCurrentStudent(student);
        alert("Login successful");
        navigate('/tutors');
      } else {
        alert("Invalid password");
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      alert("Student not found");
    });
}

  return (
    <StudentLoginContextObj.Provider value={{ handleLogin, currentStudent }}>
      {children}
    </StudentLoginContextObj.Provider>
  );
}

export default StudentLoginContext;
