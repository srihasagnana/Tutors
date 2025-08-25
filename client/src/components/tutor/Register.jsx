import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FaChalkboardTeacher, FaSchool, FaPhone, FaMapMarkerAlt, FaLock, FaUserGraduate } from 'react-icons/fa';

function Registert() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedName, setSubmittedName] = useState('');

  async function handleRegister(data) {
    setIsSubmitting(true);
    setSubmittedName(data.tutorname);
    
    try {
      const response = await axios.post('http://localhost:7878/tutor-api/tutor', data);
      console.log(response.data);
      alert(`Registration successful, ${data.tutorname}!`);
      navigate("/logint");
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
                      src="https://wallpapers.com/images/high/educator-giving-lecture-illustration-nomivdttrz0fo7tb.png"
                      alt="Tutor Registration" 
                      className="img-fluid"
                      style={{ maxHeight: "400px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.05))" }}
                    />
                    <h5 className="mt-3 text-muted">Join Our Teaching Community</h5>
                    <p className="text-muted small">Share your knowledge with students</p>
                  </div>
                </div>
                
                {/* Form Column */}
                <div className="col-md-7">
                  <div className="card-body p-4 p-md-5">
                    <div className="text-center mb-4">
                      <h3 className="text-dark mb-2">
                        <FaChalkboardTeacher className="me-2" style={{ color: "#495057" }} />
                        Tutor Registration
                      </h3>
                      <p className="text-muted small">Fill in your details to create an account</p>
                    </div>
                    
                    <form onSubmit={handleSubmit(handleRegister)}>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="tutorname" className="form-label text-muted small fw-bold">
                            <FaChalkboardTeacher className="me-1" /> Tutor Name
                          </label>
                          <input
                            type="text"
                            id="tutorname"
                            {...register('tutorname', { required: 'Tutor name is required' })}
                            className={`form-control ${errors.tutorname ? 'is-invalid' : ''}`}
                            placeholder="Your full name"
                          />
                          {errors.tutorname && (
                            <div className="invalid-feedback">
                              {errors.tutorname.message}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="class" className="form-label text-muted small fw-bold">
                            <FaUserGraduate className="me-1" /> Classes
                          </label>
                          <input
                            type="text"
                            id="class"
                            {...register('class', { required: 'Class is required' })}
                            className={`form-control ${errors.class ? 'is-invalid' : ''}`}
                            placeholder="e.g. 5-8, 9-10"
                          />
                          {errors.class && (
                            <div className="invalid-feedback">
                              {errors.class.message}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="phno" className="form-label text-muted small fw-bold">
                            <FaPhone className="me-1" /> Phone Number
                          </label>
                          <input
                            type="text"
                            id="phno"
                            {...register('phno', { 
                              required: 'Phone number is required',
                              pattern: {
                                value: /^[0-9]{10}$/,
                                message: 'Please enter a valid 10-digit phone number'
                              }
                            })}
                            className={`form-control ${errors.phno ? 'is-invalid' : ''}`}
                            placeholder="10-digit number"
                          />
                          {errors.phno && (
                            <div className="invalid-feedback">
                              {errors.phno.message}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 mb-3">
                          <label htmlFor="academyname" className="form-label text-muted small fw-bold">
                            <FaSchool className="me-1" /> Academy Name
                          </label>
                          <input
                            type="text"
                            id="academyname"
                            {...register('academyname', { required: 'Academy name is required' })}
                            className={`form-control ${errors.academyname ? 'is-invalid' : ''}`}
                            placeholder="Your academy name"
                          />
                          {errors.academyname && (
                            <div className="invalid-feedback">
                              {errors.academyname.message}
                            </div>
                          )}
                        </div>
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

                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <label htmlFor="mode" className="form-label text-muted small fw-bold">
                            Teaching Mode
                          </label>
                          <select 
                            id="mode"
                            {...register('mode', { required: 'Mode is required' })}
                            className={`form-select ${errors.mode ? 'is-invalid' : ''}`}
                          >
                            <option value="">Select mode</option>
                            <option value="online">Online</option>
                            <option value="offline">Offline</option>
                            <option value="both">Both</option>
                          </select>
                          {errors.mode && (
                            <div className="invalid-feedback">
                              {errors.mode.message}
                            </div>
                          )}
                        </div>

                        <div className="col-md-6 mb-4">
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
                      </div>

                      <div className="d-grid mb-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-outline-dark btn-sm py-2"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Registering...
                            </>
                          ) : (
                            <>
                              Complete Registration
                            </>
                          )}
                        </button>
                      </div>
                      
                      <div className="text-center">
                        <p className="mb-0 small text-muted">
                          Already registered?{' '}
                          <Link to="../logint" className="text-decoration-none" style={{ color: "#495057" }}>
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

export default Registert;