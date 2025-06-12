import { Link, Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { StudentLoginContextObj } from './contexts/StudentLoginContext';
import { TutorLoginContextObj } from './contexts/TutorLoginContext';

function Rootlayout() {
  const { currentStudent } = useContext(StudentLoginContextObj);
  const { currentTutor } = useContext(TutorLoginContextObj);

  return (
    <div>
      <ul className="nav bg-light px-4 py-2 shadow-sm fw-bold">
        <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>

        {/* Show register links only if no one is logged in */}
        {!currentStudent && !currentTutor && (
          <>
            <li className="nav-item">
              <Link className="nav-link" to="registers">Register as student</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="registert">Register as tutor</Link>
            </li>
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

      {/* Renders child routes */}
      <div className="container mt-4">
        <Outlet />
      </div>
    </div>
  );
}

export default Rootlayout;
