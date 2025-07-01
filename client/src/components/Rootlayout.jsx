import { Link, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { StudentLoginContextObj } from './contexts/StudentLoginContext';
import { TutorLoginContextObj } from './contexts/TutorLoginContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Rootlayout() {
  const { currentStudent } = useContext(StudentLoginContextObj);
  const { currentTutor } = useContext(TutorLoginContextObj);

  return (
    <div className="home-container" style={{
      minHeight: '100vh',
      fontFamily: "'Poppins', sans-serif"
    }}>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white px-4 py-3 shadow-sm" style={{
        borderBottom: '3px solid #4e54c8'
      }}>
        <div className="container-fluid">
          <Link className="navbar-brand fw-bold" to="/" style={{
            color: '#4e54c8',
            fontSize: '1.5rem',
            display: 'flex',
            alignItems: 'center'
          }}>
            <i className="fas fa-graduation-cap me-2"></i>
            EduConnect
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">

              {/* Show register links only if no one is logged in */}
              {!currentStudent && !currentTutor && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to="registers" style={{
                      color: '#4e54c8',
                      position: 'relative',
                      padding: '0.5rem 1rem'
                    }}>
                      <i className="fa-solid fa-child me-2"></i>
                      <span className="nav-link-hover">Register as student</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to="registert" style={{
                      color: '#4e54c8',
                      position: 'relative',
                      padding: '0.5rem 1rem'
                    }}>
                      <i className="fa-solid fa-chalkboard-user me-2"></i>
                      <span className="nav-link-hover">Register as tutor</span>
                    </Link>
                  </li>
                </>
              )}

              {/* Student-only links */}
              {currentStudent && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to="courses" style={{
                      color: '#4e54c8',
                      position: 'relative',
                      padding: '0.5rem 1rem'
                    }}>
                      <i className="fa-solid fa-book me-2"></i>
                      <span className="nav-link-hover">Current Courses</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to="histroy" style={{
                      color: '#4e54c8',
                      position: 'relative',
                      padding: '0.5rem 1rem'
                    }}>
                      <i className="fa-solid fa-clock-rotate-left me-2"></i>
                      <span className="nav-link-hover">History</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to="tutors" style={{
                      color: '#4e54c8',
                      position: 'relative',
                      padding: '0.5rem 1rem'
                    }}>
                      <i className="fa-solid fa-chalkboard-user me-2"></i>
                      <span className="nav-link-hover">Find Tutors</span>
                    </Link>
                  </li>
                </>
              )}

              {/* Tutor-only links */}
              {currentTutor && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to="addschedule" style={{
                      color: '#4e54c8',
                      position: 'relative',
                      padding: '0.5rem 1rem'
                    }}>
                      <i className="fa-solid fa-calendar-plus me-2"></i>
                      <span className="nav-link-hover">Add Schedule</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to="aboutus" style={{
                      color: '#4e54c8',
                      position: 'relative',
                      padding: '0.5rem 1rem'
                    }}>
                      <i className="fa-solid fa-circle-info me-2"></i>
                      <span className="nav-link-hover">About Us</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Renders child routes */}
      <div className="container mt-4">
        <Outlet />
      </div>

      {/* Add these styles in your global CSS */}
      <style>
        {`
          .nav-link-hover::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: #8f94fb;
            transition: width 0.3s ease;
          }
          
          .nav-link-hover:hover::after {
            width: 100%;
          }
        `}
      </style>
    </div>
  );
}

export default Rootlayout;