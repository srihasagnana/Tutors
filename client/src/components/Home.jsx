import { Link, Outlet } from 'react-router-dom';
import img from '../components/images/undraw_educator_6dgp.svg';
import { useContext } from 'react';
import { StudentLoginContextObj } from './contexts/StudentLoginContext';
import { TutorLoginContextObj } from './contexts/TutorLoginContext';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Home() {
  const { currentStudent } = useContext(StudentLoginContextObj);
  const { currentTutor } = useContext(TutorLoginContextObj);

  return (
    <div className="home-container" style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
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
              <li className="nav-item">
                <Link className="nav-link fw-medium" to="/" style={{
                  color: '#4e54c8',
                  position: 'relative',
                  padding: '0.5rem 1rem'
                }}>
                  <span className="nav-link-hover">Home</span>
                </Link>
              </li>

              {/* Always visible links */}
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
                      <span className="nav-link-hover">Current Courses</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to="histroy" style={{
                      color: '#4e54c8',
                      position: 'relative',
                      padding: '0.5rem 1rem'
                    }}>
                      <span className="nav-link-hover">History</span>
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
                      <span className="nav-link-hover">Add Schedule</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-medium" to="aboutus" style={{
                      color: '#4e54c8',
                      position: 'relative',
                      padding: '0.5rem 1rem'
                    }}>
                      <span className="nav-link-hover">About Us</span>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container my-5">
        <div className="row align-items-center">
          <div className="col-lg-6 order-lg-1 order-2">
            <h1 className="display-4 fw-bold mb-4" style={{
              color: '#4e54c8',
              lineHeight: '1.2'
            }}>
              Transforming Education <br />
              <span style={{ color: '#8f94fb' }}>One Connection at a Time</span>
            </h1>
            <p className="lead mb-4" style={{ color: '#666' }}>
              Connect with the best tutors or find passionate students to share your knowledge. 
              Our platform makes learning accessible to everyone.
            </p>
            <div className="d-flex gap-3">
              {!currentStudent && !currentTutor && (
                <>
                  <Link to="registers" className="btn btn-primary btn-lg px-4 py-2 rounded-pill shadow" style={{
                    background: '#4e54c8',
                    border: 'none',
                    transition: 'all 0.3s'
                  }}>
                    <i className="fa-solid fa-child me-2"></i>
                    I'm a Student
                  </Link>
                  <Link to="registert" className="btn btn-outline-primary btn-lg px-4 py-2 rounded-pill shadow" style={{
                    color: '#4e54c8',
                    borderColor: '#4e54c8',
                    transition: 'all 0.3s'
                  }}>
                    <i className="fa-solid fa-chalkboard-user me-2"></i>
                    I'm a Tutor
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="col-lg-6 order-lg-2 order-1 mb-5 mb-lg-0">
            <div style={{
              position: 'relative',
              animation: 'float 6s ease-in-out infinite'
            }}>
              <img
                src={img}
                alt="Education Illustration"
                className="img-fluid"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0 10px 20px rgba(78, 84, 200, 0.3))',
                  transition: 'transform 0.5s ease'
                }}
              />
              <div style={{
                position: 'absolute',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                background: 'rgba(143, 148, 251, 0.2)',
                top: '-20px',
                left: '-20px',
                zIndex: -1,
                animation: 'pulse 4s infinite'
              }}></div>
              <div style={{
                position: 'absolute',
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                background: 'rgba(143, 148, 251, 0.15)',
                bottom: '-10px',
                right: '-10px',
                zIndex: -1,
                animation: 'pulse 3s infinite 1s'
              }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating elements for background */}
      <div className="floating-elements">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="floating-element" style={{
            position: 'absolute',
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            background: 'rgba(78, 84, 200, 0.1)',
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite ${Math.random() * 5}s`,
            zIndex: -1
          }}></div>
        ))}
      </div>

      <Outlet />

      {/* Add these styles in your global CSS */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          
          @keyframes pulse {
            0% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.2); opacity: 0.7; }
            100% { transform: scale(1); opacity: 1; }
          }
          
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
          
          .btn-primary:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(78, 84, 200, 0.3) !important;
          }
          
          .btn-outline-primary:hover {
            transform: translateY(-3px);
            background-color: #4e54c8 !important;
            color: white !important;
            box-shadow: 0 10px 20px rgba(78, 84, 200, 0.3) !important;
          }
          
          img:hover {
            transform: scale(1.05);
          }
        `}
      </style>
    </div>
  );
}

export default Home;