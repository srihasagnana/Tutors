import axios from "axios";
import { createContext, useState } from "react";

export const TutorLoginContextObj = createContext();

function TutorLoginContext({ children }) {
  const [currentTutor, setCurrentTutor] = useState(null);

function handleLogin({ tutorname, password }, navigate) {
  axios
    .get(`https://tutors-htxa.onrender.com/tutor/${tutorname}`)
    .then((response) => {
      const tutor = response.data.payload; 
      console.log('tutor data:', tutor);

      if (tutor && tutor.password === password) {
        setCurrentTutor(tutor);
        alert("Login successful");
        navigate('/addschedule');
      } else {
        alert("Invalid password");
      }
    })
    .catch((error) => {
      console.error("Login error:", error);
      alert("Tutor not found");
    });
}

  return (
    <TutorLoginContextObj.Provider value={{ handleLogin, currentTutor }}>
      {children}
    </TutorLoginContextObj.Provider>
  );
}

export default TutorLoginContext;
