import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaUserGraduate, FaSchool, FaMapMarkerAlt, FaLock, FaSignInAlt } from 'react-icons/fa';

function Registers() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRegister(data) {
    setIsSubmitting(true);
    
    try {
      const response = await axios.post('http://localhost:7878/student-api/student', data);
      console.log(response.data);
      alert(`Registration successful, ${data.studentname}!`);
      navigate("/login");
    } catch (error) {
      console.error('Registration error:', error);
      alert(`Registration failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ 
      backgroundColor: "#f8f9fa"
    }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card shadow-sm border-0 overflow-hidden">
              <div className="row g-0">
                {/* Illustration Column - Hidden on mobile */}
                <div className="col-md-5 d-none d-md-flex align-items-center" style={{ backgroundColor: "#e9ecef" }}>
                  <div className="p-4 w-100 text-center">
                    <img 
                      src="https://cdn.creazilla.com/cliparts/3406427/female-student-girl-clipart-xl.png"
                      alt="Student Registration" 
                      className="img-fluid"
                      style={{ maxHeight: "400px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.05))" }}
                    />
                    <h5 className="mt-3 text-muted">Join Our Learning Community</h5>
                    <p className="text-muted small">Start your educational journey with us</p>
                  </div>
                </div>
                
                {/* Form Column */}
                <div className="col-md-7">
                  <div className="card-body p-4 p-md-5">
                    <div className="text-center mb-4">
                      <h3 className="text-dark mb-2">
                        <FaUserGraduate className="me-2" style={{ color: "#495057" }} />
                        Student Registration
                      </h3>
                      <p className="text-muted small">Fill in your details to create an account</p>
                    </div>
                    
                    <form onSubmit={handleSubmit(handleRegister)}>
                      <div className="mb-3">
                        <label htmlFor="studentname" className="form-label text-muted small fw-bold">
                          <FaUserGraduate className="me-1" /> Student Name
                        </label>
                        <input
                          type="text"
                          id="studentname"
                          {...register('studentname', { required: 'Student name is required' })}
                          className={`form-control ${errors.studentname ? 'is-invalid' : ''}`}
                          placeholder="Your full name"
                        />
                        {errors.studentname && (
                          <div className="invalid-feedback">
                            {errors.studentname.message}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="class" className="form-label text-muted small fw-bold">
                          <FaSchool className="me-1" /> Class/Grade
                        </label>
                        <input
                          type="text"
                          id="class"
                          {...register('class', { required: 'Class is required' })}
                          className={`form-control ${errors.class ? 'is-invalid' : ''}`}
                          placeholder="e.g. 5th, 10th"
                        />
                        {errors.class && (
                          <div className="invalid-feedback">
                            {errors.class.message}
                          </div>
                        )}
                      </div>

                      <div className="mb-3">
                        <label htmlFor="address" className="form-label text-muted small fw-bold">
                          <FaMapMarkerAlt className="me-1" /> Address
                        </label>
                        <input
                          type="text"
                          id="address"
                          {...register('address', { required: 'Address is required' })}
                          className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                          placeholder="Your full address"
                        />
                        {errors.address && (
                          <div className="invalid-feedback">
                            {errors.address.message}
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <label htmlFor="password" className="form-label text-muted small fw-bold">
                          <FaLock className="me-1" /> Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          {...register('password', { 
                            required: 'Password is required',
                            minLength: {
                              value: 6,
                              message: 'Password must be at least 6 characters'
                            }
                          })}
                          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                          placeholder="At least 6 characters"
                        />
                        {errors.password && (
                          <div className="invalid-feedback">
                            {errors.password.message}
                          </div>
                        )}
                      </div>

                      <div className="d-grid mb-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-outline-primary btn-sm py-2"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Registering...
                            </>
                          ) : (
                            <>
                              <FaSignInAlt className="me-2" />
                              Complete Registration
                            </>
                          )}
                        </button>
                      </div>
                      
                      <div className="text-center">
                        <p className="mb-0 small text-muted">
                          Already registered?{' '}
                          <Link to="/login" className="text-decoration-none" style={{ color: "#495057" }}>
                            Click here to login
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registers;