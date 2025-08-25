import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { TutorLoginContextObj } from "../contexts/TutorLoginContext";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function EnrollStudents() {
  const { currentTutor } = useContext(TutorLoginContextObj);
  const tutorEnrolledStudentsid = currentTutor.joinedStudents.join(",");
  const [studentList, setStudentList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsList = await axios.get(
        `http://localhost:7878/student-api/studentid/${tutorEnrolledStudentsid}`
      );
      setStudentList(studentsList.data.payload);
    };
    fetchStudents();
  }, [currentTutor]);

  async function handleViewDetails(studentname) {
    try {
      const response = await axios.get(
        `http://localhost:7878/student-api/student/${studentname}`
      );
      setSelectedStudent(response.data.payload);
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching student details:", error);
      alert("Failed to fetch student details.");
    }
  }

  return (
    <div className="container mt-4">
      <h3>Student List</h3>
      <table className="table table-bordered">
        <thead className="text-center">
          <tr>
            <th>Student Name</th>
            <th>Join Date</th>
            <th>Trial Status</th>
            <th>Details</th>
            <th>Days left for trial</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {studentList.map((student) => (
            <tr key={student._id}>
              <td>{student.studentname}</td>
              <td>{student.joinDate}</td>
              <td>
                {student.trialStatus ? "Trial Started" : "No Trial Yet"}
              </td>
              
              <td>
                <button
                  onClick={() => handleViewDetails(student.studentname)}
                  className="btn btn-info btn-sm"
                >
                  View Details
                </button>
              </td>
              <td>
                {(() => {
                    const joinTime = new Date(student.joinDate).getTime();
                    const currentTime = new Date().getTime();
                    const timeDiff = currentTime - joinTime;
                    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;

                    const remainingTime = sevenDaysInMs - timeDiff;

                    if (remainingTime > 0) {
                        const days = Math.floor(remainingTime / (24 * 60 * 60 * 1000));
                        const hours = Math.floor((remainingTime % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
                        const minutes = Math.floor((remainingTime % (60 * 60 * 1000)) / (60 * 1000));

                        return `${days}d ${hours}h ${minutes}m left`;
                    } else {
                        return "Trial Done";
                    }
                    })()}
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for student details */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStudent ? (
            <ul>
              <li>
                <strong>Name:</strong> {selectedStudent.studentname}
              </li>
              <li>
                <strong>Join Date:</strong> {selectedStudent.joinDate}
              </li>
              <li>
                <strong>Trial Status:</strong>{" "}
                {selectedStudent.trialStatus ? "Trial Started" : "No Trial Yet"}
              </li>
              <li>
                <strong>Class:</strong> {selectedStudent.class}
              </li>
              <li>
                <strong>Address:</strong> {selectedStudent.address}
              </li>
              <li>
                <strong>Mode:</strong> {selectedStudent.mode}
              </li>
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EnrollStudents;
