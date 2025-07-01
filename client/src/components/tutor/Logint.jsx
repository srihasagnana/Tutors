import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { TutorLoginContextObj } from "../contexts/TutorLoginContext";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaLock, FaSignInAlt } from "react-icons/fa";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleLogin } = useContext(TutorLoginContextObj);
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(data) {
    setIsSubmitting(true);
    try {
      await handleLogin(data, navigate);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ 
      backgroundColor: "#f8f9fa"
    }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0 overflow-hidden">
              <div className="row g-0">
                {/* Illustration Column - Hidden on mobile */}
                <div className="col-md-6 d-none d-md-flex align-items-center" style={{ backgroundColor: "#e9ecef" }}>
                  <div className="p-4 w-100 text-center">
                    <img 
                      src="https://wallpapers.com/images/high/educator-giving-lecture-illustration-nomivdttrz0fo7tb.png"
                      alt="Tutor Illustration" 
                      className="img-fluid"
                      style={{ maxHeight: "350px", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.05))" }}
                    />
                    <h5 className="mt-3 text-muted">Tutor Portal</h5>
                    <p className="text-muted small">Manage your teaching resources</p>
                  </div>
                </div>
                
                {/* Form Column */}
                <div className="col-md-6">
                  <div className="card-body p-4 p-md-5">
                    <div className="text-center mb-4">
                      <h3 className="text-dark mb-2">
                        <FaChalkboardTeacher className="me-2" style={{ color: "#495057" }} />
                        Tutor Login
                      </h3>
                      <p className="text-muted small">Enter your credentials to access the portal</p>
                    </div>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <label htmlFor="tutorname" className="form-label text-muted small fw-bold">
                          Tutor Name
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <FaChalkboardTeacher className="text-muted" />
                          </span>
                          <input
                            type="text"
                            id="tutorname"
                            {...register('tutorname', { required: 'Tutor name is required' })}
                            className={`form-control ${errors.tutorname ? 'is-invalid' : ''}`}
                            placeholder="Enter your name"
                          />
                        </div>
                        {errors.tutorname && (
                          <div className="invalid-feedback">
                            {errors.tutorname.message}
                          </div>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="password" className="form-label text-muted small fw-bold">
                          Password
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light">
                            <FaLock className="text-muted" />
                          </span>
                          <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Enter your password"
                          />
                        </div>
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
                          className="btn btn-outline-dark btn-sm py-2"
                        >
                          {isSubmitting ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                              Signing in...
                            </>
                          ) : (
                            <>
                              <FaSignInAlt className="me-2" />
                              Sign In
                            </>
                          )}
                        </button>
                      </div>
                      
                      <div className="text-center">
                        <p className="mb-0 small text-muted">
                          Need assistance?{" "}
                          <a href="#" className="text-decoration-none" style={{ color: "#495057" }}>
                            Contact support
                          </a>
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

export default Login;