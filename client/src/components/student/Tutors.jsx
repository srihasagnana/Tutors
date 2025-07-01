import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Tutors() {
  const [tutors, setTutors] = useState([]);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMode, setSelectedMode] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [recommendedTutors, setRecommendedTutors]=useState([])

  async function handlerecommendedTutors(subject) {
  try {
    const response = await axios.post("http://localhost:5000/recommend", {
      subject: subject
    });
    setRecommendedTutors(response.data);
  } catch (error) {
    console.error("Error fetching recommended tutors:", error);
    setRecommendedTutors([]); // fallback
  }
}


  useEffect(() => {
    async function fetchTutors() {
      try {
        const response = await axios.get("http://localhost:7878/tutor-api/tutors");
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

  // Filter by mode + subject/address
  const filteredTutors = tutors.filter((tutor) => {
    const mode = tutor.mode?.toLowerCase() || "";
    const subject = tutor.schedule?.subject?.toLowerCase() || "";
    const address = tutor.address?.toLowerCase() || "";
    const search = searchTerm.toLowerCase();

    const matchesMode =
      selectedMode === "all" || mode === selectedMode || mode === "both";
    const matchesSubject = subject.includes(search);
    const matchesAddress = address.includes(search);

    return matchesMode && (searchTerm.trim() === "" || matchesSubject || matchesAddress);
  });

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4" style={{ color: "#2c3e50", fontWeight: "bold" }}>
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

        <div className="col-md-6">
          <input
            type="text"
            placeholder="Search by subject or address"
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
              <div
                className="card h-100 shadow-sm border-0 hover-shadow transition"
                style={{ cursor: "pointer" }}
                onClick={() => handleTutorClick(tutor)}
              >
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="card-title mb-0" style={{ color: "#3498db" }}>
                      {tutor.tutorname}
                    </h5>
                    <span className="badge bg-primary">class: {tutor.class}</span>
                  </div>
                  <h6 className="card-subtitle mb-2 text-muted">
                    <i className="bi bi-building me-2"></i>
                    {tutor.academyname}
                  </h6>
                  <p className="card-text text-truncate">
                    <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
                    {tutor.address}
                  </p>
                  <button
                    className="btn btn-sm btn-outline-primary mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTutorClick(tutor);
                    }}
                  >
                    View Details
                  </button>
                  
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
                {selectedTutor.tutorname}'s Profile
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mb-3">
                <h5 className="text-primary">{selectedTutor.tutorname}</h5>
                <h6 className="text-muted">
                  <i className="bi bi-building me-2"></i>
                  {selectedTutor.academyname}
                </h6>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong><i className="bi bi-telephone-fill me-2 text-success"></i>Contact:</strong> {selectedTutor.phno}
                  </p>
                  <p>
                    <strong><i className="bi bi-book me-2 text-info"></i>Class:</strong> {selectedTutor.class}
                  </p>
                  <p>
                    <strong><i className="bi bi-clock-history me-2 text-warning"></i>Experience:</strong> {selectedTutor.experience} years
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong><i className="bi bi-geo-alt-fill me-2 text-danger"></i>Address:</strong> {selectedTutor.address}
                  </p>
                  <p>
                    <strong><i className="bi bi-laptop me-2 text-secondary"></i>Mode:</strong> {selectedTutor.mode}
                  </p>
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

              <div className="mt-3">
                {recommendedTutors.length > 0 && (
                  <div className="mt-3">
                    <h6 className="text-primary">Recommended Tutors</h6>
                    <ul className="list-group">
                      {recommendedTutors.map((tutor, idx) => (
                        <li key={idx} className="list-group-item">
                          <strong>{tutor.tutorname}</strong> - {tutor.academyname}<br />
                          <em>{tutor.schedule?.subject}</em>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default Tutors;
