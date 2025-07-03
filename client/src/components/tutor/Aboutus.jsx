import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { TutorLoginContextObj } from "../contexts/TutorLoginContext";
import { motion } from "framer-motion";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Aboutus() {
  const { 
    register, 
    handleSubmit, 
    reset,
    formState: { errors, isSubmitting } 
  } = useForm();
  const { currentTutor } = useContext(TutorLoginContextObj);
  const tutorId = currentTutor?._id;

  async function handleDescription(data) {
    if (!tutorId) {
      alert("No tutor ID found. Please login again.");
      return;
    }

    try {
      const response = await axios.put(
        `https://tutors-htxa.onrender.com/tutor-api/tutorupdate/${tutorId}`,
        { about: data.about }
      );

      console.log("Update Success:", response.data);
      alert("Description updated successfully!");
      reset();
    } catch (err) {
      console.error("Error updating description:", err);
      alert(`Failed to update description: ${err.response?.data?.message || err.message}`);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container my-5"
    >
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="card border-0 shadow-lg rounded-4 overflow-hidden"
          >
            <div className="card-header bg-gradient-primary text-white py-3">
              <h2 className="text-center mb-0">
                <i className="fas fa-user-graduate me-2"></i>
                Tell Students About Yourself
              </h2>
            </div>
            
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit(handleDescription)}>
                <div className="mb-4">
                  <label className="form-label fw-bold text-secondary mb-3">
                    <i className="fas fa-info-circle me-2"></i>
                    Your Teaching Profile
                  </label>
                  <textarea
                    className={`form-control ${errors.about ? 'is-invalid' : ''}`}
                    rows={8}
                    placeholder={`Example:\n"Hello! I'm an experienced math tutor with 5+ years teaching algebra and calculus. I offer flexible scheduling Monday-Friday between 3-7 PM. My teaching approach focuses on building strong fundamentals while making learning enjoyable. I've helped over 50 students improve their grades by at least one letter grade."`}
                    {...register("about", { 
                      required: "Please write something about yourself",
                      minLength: {
                        value: 50,
                        message: "Description should be at least 50 characters"
                      }
                    })}
                    style={{
                      fontSize: '1.05rem',
                      border: '2px solid #e9ecef',
                      borderRadius: '12px',
                      resize: 'vertical',
                      minHeight: '200px'
                    }}
                  ></textarea>
                  {errors.about && (
                    <div className="invalid-feedback d-flex align-items-center mt-2">
                      <i className="fas fa-exclamation-circle me-2"></i>
                      {errors.about.message}
                    </div>
                  )}
                  <div className="form-text mt-2">
                    This will appear on your public profile. Include your experience, teaching style, and availability.
                  </div>
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 py-3 rounded-pill fw-bold mt-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-save me-2"></i>
                      Save Profile Description
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          <div className="text-center mt-4">
            <div className="alert alert-info d-inline-flex align-items-center">
              <i className="fas fa-lightbulb me-2 fs-4"></i>
              <div>
                <strong>Tip:</strong> A complete profile gets 3x more student inquiries!
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .bg-gradient-primary {
            background: linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%);
          }
          
          .card {
            transition: all 0.3s ease;
            border: none;
          }
          
          textarea {
            transition: all 0.3s;
          }
          
          textarea:focus {
            border-color: #4e54c8 !important;
            box-shadow: 0 0 0 0.25rem rgba(78, 84, 200, 0.25);
          }
          
          .btn-primary {
            background: linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%);
            border: none;
            letter-spacing: 0.5px;
          }
          
          .btn-primary:hover {
            background: linear-gradient(135deg, #3a3fa0 0%, #7a7fd9 100%);
          }
        `}
      </style>
    </motion.div>
  );
}

export default Aboutus;