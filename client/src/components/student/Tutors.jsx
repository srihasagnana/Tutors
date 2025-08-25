import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Badge } from "react-bootstrap";
import { useContext } from "react";
import { StudentLoginContextObj } from "../contexts/StudentLoginContext";
import {
  FaChalkboardTeacher,
  FaMapMarkerAlt,
  FaBuilding,
  FaClock,
  FaBook,
  FaPhone,
  FaUserTie,
  FaInfoCircle,
  FaPlus,
} from "react-icons/fa";

function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState("all");
  const [recommendedTutors, setRecommendedTutors] = useState([]);
  const { currentStudent } = useContext(StudentLoginContextObj);

  async function handlerecommendedTutors(subject) {
    try {
      const response = await axios.post("http://localhost:5000/recommend", {
        subject: subject,
      });
      setRecommendedTutors(response.data);
    } catch (error) {
      console.error("Error fetching recommended tutors:", error);
      setRecommendedTutors([]);
    }
  }

  async function handleTrial(data) {
    try {
      await axios.put(
        `http://localhost:7878/student-api/student/update/${currentStudent._id}`,
        {
          tutorname: data.tutorname,
          trialStatus: true,
        }
      );

      await axios.put(
        `http://localhost:7878/tutor-api/tutorupdate/${data._id}`,
        {
          joinedStudents: [currentStudent._id],
        }
      );

      alert("Successfully joined the course!");
    } catch (error) {
      console.error("Error joining course:", error);
      alert("Failed to join course. Please try again.");
    }
  }

  useEffect(() => {
    async function fetchTutors() {
      try {
        const response = await axios.get(
          "http://localhost:7878/tutor-api/tutors"
        );
        setTutors(response.data.payload);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    }

    fetchTutors();
  }, []);

  const handleTutorClick = (tutor) => {
    setSelectedTutor(tutor);
    setShowModal(true);

    if (tutor?.schedule?.subject) {
      handlerecommendedTutors(tutor.schedule.subject);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTutor(null);
  };

  const filteredTutors = tutors.filter((tutor) => {
    const mode = tutor.mode?.toLowerCase() || "";
    const matchesMode =
      selectedMode === "all" || mode === selectedMode || mode === "both";
    return matchesMode;
  });

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4" style={{ color: "#2c3e50", fontWeight: "bold" }}>
        <FaChalkboardTeacher className="me-2" />
        Our Expert Tutors
      </h1>

      {/* Filters */}
      <div className="row mb-4 justify-content-center">
        <div className="col-md-6 text-center mb-2">
          <div className="btn-group">
            <button
              className={`btn btn-outline-primary ${selectedMode === "all" ? "active" : ""}`}
              onClick={() => setSelectedMode("all")}
            >
              All
            </button>
            <button
              className={`btn btn-outline-primary ${selectedMode === "online" ? "active" : ""}`}
              onClick={() => setSelectedMode("online")}
            >
              Online
            </button>
            <button
              className={`btn btn-outline-primary ${selectedMode === "offline" ? "active" : ""}`}
              onClick={() => setSelectedMode("offline")}
            >
              Offline
            </button>
          </div>
        </div>
      </div>

      {/* Tutors List */}
      {filteredTutors.length === 0 ? (
        <div className="alert alert-info text-center">
          No tutors found matching your filters.
        </div>
      ) : (
        <div className="row">
          {filteredTutors.map((tutor) => (
            <div className="col-md-4 mb-4" key={tutor.tutorid}>
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0" style={{ color: "#3498db" }}>
                      <FaUserTie className="me-2" />
                      {tutor.tutorname}
                    </h5>
                    <Badge bg="primary" className="align-self-center">
                      Class: {tutor.class}
                    </Badge>
                  </div>

                  <div className="mb-2">
                    <FaBuilding className="me-2 text-muted" />
                    <span className="text-muted">{tutor.academyname}</span>
                  </div>

                  <div className="mb-2">
                    <FaMapMarkerAlt className="me-2 text-danger" />
                    <small className="text-truncate">{tutor.address}</small>
                  </div>

                  {tutor.schedule && (
                    <div className="mb-3">
                      <FaBook className="me-2 text-info" />
                      <span>{tutor.schedule.subject}</span>
                    </div>
                  )}

                  <div className="mt-auto d-flex justify-content-between align-items-center">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleTutorClick(tutor)}
                    >
                      View Details
                    </Button>

                    <Button
                      variant="success"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTrial(tutor);
                      }}
                      className="d-flex align-items-center"
                    >
                      <FaPlus className="me-1" />
                      Join Course
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tutor Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        {selectedTutor && (
          <>
            <Modal.Header closeButton className="bg-light">
              <Modal.Title style={{ color: "#2c3e50" }}>
                <FaChalkboardTeacher className="me-2" />
                {selectedTutor.tutorname}'s Profile
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="col-md-8">
                  <div className="mb-3">
                    <h4 className="text-primary">{selectedTutor.tutorname}</h4>
                    <h6 className="text-muted">
                      <FaBuilding className="me-2" />
                      {selectedTutor.academyname}
                    </h6>
                  </div>

                  <div className="mb-3">
                    <p>
                      <strong><FaPhone className="me-2 text-success" />Contact:</strong> {selectedTutor.phno}
                    </p>
                    <p>
                      <strong><FaBook className="me-2 text-info" />Class:</strong> {selectedTutor.class}
                    </p>
                    <p>
                      <strong><FaClock className="me-2 text-warning" />Experience:</strong> {selectedTutor.experience} years
                    </p>
                    <p>
                      <strong><FaMapMarkerAlt className="me-2 text-danger" />Address:</strong> {selectedTutor.address}
                    </p>
                    <p>
                      <strong><FaInfoCircle className="me-2 text-secondary" />Mode:</strong> {selectedTutor.mode}
                    </p>
                  </div>
                </div>
              </div>

              {selectedTutor.schedule && (
                <div className="mt-3 p-3 bg-light rounded">
                  <h6 className="text-primary mb-3">Schedule</h6>
                  <div className="d-flex flex-column">
                    <div className="mb-2">
                      <strong><i className="bi bi-calendar-day me-2"></i>Day:</strong> {selectedTutor.schedule.day}
                    </div>
                    <div className="mb-2">
                      <strong><i className="bi bi-clock me-2"></i>Time:</strong> {selectedTutor.schedule.time}
                    </div>
                    <div>
                      <strong><i className="bi bi-journal-bookmark me-2"></i>Subject:</strong> {selectedTutor.schedule.subject}
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-3">
                <h6 className="text-primary">About</h6>
                <p>{selectedTutor.about}</p>
              </div>

              {recommendedTutors.length > 0 && (
                <div className="mt-4">
                  <h6 className="text-primary">Recommended Tutors</h6>
                  <div className="row">
                    {recommendedTutors.map((tutor, idx) => (
                      <div key={idx} className="col-md-6 mb-3">
                        <div className="card h-100">
                          <div className="card-body">
                            <h6 className="card-title">
                              <FaUserTie className="me-2" />
                              {tutor.tutorname}
                            </h6>
                            <p className="card-text">
                              <FaBuilding className="me-2" />
                              {tutor.academyname}
                            </p>
                            {tutor.schedule?.subject && (
                              <Badge bg="info" className="mb-2">
                                <FaBook className="me-1" />
                                {tutor.schedule.subject}
                              </Badge>
                            )}
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="mt-2"
                              onClick={() => {
                                setSelectedTutor(tutor);
                                handlerecommendedTutors(tutor.schedule?.subject);
                              }}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  handleTrial(selectedTutor);
                  handleCloseModal();
                }}
              >
                <FaPlus className="me-1" />
                Join Course
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Tutors;
