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
    <div>
      {/* Navigation Bar */}
      <ul className="nav bg-light px-4 py-2 shadow-sm fw-bold">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>

        {/* Always visible links */}
        {!currentStudent && !currentTutor && (
          <>
            <Link className="nav-link" to="registers">
              <i className="fa-solid fa-child me-2"></i>
              Register as student
            </Link>
            <Link className="nav-link" to="registert">
              <i className="fa-solid fa-chalkboard-user me-2"></i>
              Register as tutor
            </Link>

          </>
        )}

        {/* Student-only links */}
        {currentStudent && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="courses">Courses</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="histroy">Histroy</Link>
            </li>
          </>
        )}

        {/* Tutor-only links */}
        {currentTutor && (
        <>
          <li className="nav-item">
            <Link className="nav-link" to="addschedule">Add Schedule</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="aboutus">About Us</Link>
          </li>
        </>
      )}

      </ul>

      {/* Centered Image */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
      }}>
        <img
          src={img}
          alt="Centered"
          style={{
            width: '600px',
            height: 'auto',
            objectFit: 'contain',
            imageRendering: 'auto',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        />
      </div>

      

      <Outlet />
    </div>
  );
}

export default Home;
