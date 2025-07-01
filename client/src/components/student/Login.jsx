import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { StudentLoginContextObj } from "../contexts/StudentLoginContext";
import { useNavigate } from "react-router-dom";
import { FaUserGraduate, FaLock, FaSignInAlt } from "react-icons/fa";
import "animate.css";
  
function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { handleLogin } = useContext(StudentLoginContextObj);
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
      background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
    }}>
      <div className="container">
        <div className="row justify-content-center animate__animated animate__fadeIn">
          <div className="col-lg-10">
            <div className="card shadow-sm border-0 overflow-hidden">
              <div className="row g-0">
                {/* Illustration Column */}
                <div className="col-md-6 d-none d-md-flex align-items-center bg-light">
                  <div className="p-4 text-center">
                    <img 
                      src="https://cdn.creazilla.com/cliparts/3406427/female-student-girl-clipart-xl.png" 
                      alt="Teacher Illustration" 
                      className="img-fluid"
                      style={{ maxHeight: "400px", filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.1))",marginLeft:"150px" }}
                    />
                    <h5 style={{marginLeft:"120px" }} className="mt-3 text-muted">Welcome Back</h5>
                    <p style={{marginLeft:"120px" }} className="text-muted small">Sign in to access your learning resources</p>
                  </div>
                </div>
                
                {/* Form Column */}
                <div className="col-md-6">
                  <div className="card-body p-4 p-lg-5">
                    <div className="text-center mb-4">
                      <h3 className="text-dark">
                        <FaUserGraduate className="me-2 text-primary" />
                        Student Login
                      </h3>
                      <p className="text-muted">Enter your credentials to continue</p>
                    </div>
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-3">
                        <label htmlFor="studentname" className="form-label text-muted small fw-bold">
                          Student Name
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <FaUserGraduate className="text-muted" />
                          </span>
                          <input
                            type="text"
                            id="studentname"
                            {...register('studentname', { required: 'Name is required' })}
                            className={`form-control border-start-0 ${errors.studentname ? 'is-invalid' : ''}`}
                            placeholder="Enter your name"
                          />
                        </div>
                        {errors.studentname && (
                          <div className="invalid-feedback animate__animated animate__shakeX">
                            {errors.studentname.message}
                          </div>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <label htmlFor="password" className="form-label text-muted small fw-bold">
                          Password
                        </label>
                        <div className="input-group">
                          <span className="input-group-text bg-light border-end-0">
                            <FaLock className="text-muted" />
                          </span>
                          <input
                            type="password"
                            id="password"
                            {...register('password', { required: 'Password is required' })}
                            className={`form-control border-start-0 ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Enter your password"
                          />
                        </div>
                        {errors.password && (
                          <div className="invalid-feedback animate__animated animate__shakeX">
                            {errors.password.message}
                          </div>
                        )}
                      </div>
                      
                      <div className="d-grid mb-3">
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn btn-primary btn-sm rounded-pill py-2"
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