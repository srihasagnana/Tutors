import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { TutorLoginContextObj } from "../contexts/TutorLoginContext";
import { motion } from "framer-motion";
import '@fortawesome/fontawesome-free/css/all.min.css';

function AddSchedule() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { currentTutor } = useContext(TutorLoginContextObj);
  const tutorId = currentTutor?._id;

  async function handleSchedule(data) {
    if (!tutorId) {
      alert("No tutor ID found. Please login again.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:7878/tutor-api/tutorupdate/${tutorId}`,
        {
          schedule: {
            day: data.day,
            time: data.time,
            subject: data.subject,
          },
        }
      );

      console.log("Update Success:", response.data);
      alert("Schedule updated successfully!");
    } catch (err) {
      console.error("Error updating schedule:", err);
      alert(`Failed to update schedule: ${err.response?.data?.message || err.message}`);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container my-5"
    >
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="card border-0 shadow-lg rounded-4 overflow-hidden"
          >
            <div className="card-header bg-primary text-white py-4">
              <h2 className="text-center mb-0">
                <i className="fas fa-calendar-plus me-2"></i>
                Add Your Schedule
              </h2>
            </div>
            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit(handleSchedule)}>
                <div className="mb-4">
                  <label className="form-label fw-bold text-secondary">
                    <i className="fas fa-calendar-day me-2"></i>
                    Days Available
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${errors.day ? 'is-invalid' : ''}`}
                    {...register("day", { required: "Days are required" })}
                    placeholder="e.g., Monday, Wednesday, Friday"
                  />
                  {errors.day && (
                    <div className="invalid-feedback">
                      <i className="fas fa-exclamation-circle me-2"></i>
                      {errors.day.message}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold text-secondary">
                    <i className="fas fa-clock me-2"></i>
                    Time Slots
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${errors.time ? 'is-invalid' : ''}`}
                    {...register("time", { required: "Time is required" })}
                    placeholder="e.g., 10:00 AM - 12:00 PM, 2:00 PM - 4:00 PM"
                  />
                  {errors.time && (
                    <div className="invalid-feedback">
                      <i className="fas fa-exclamation-circle me-2"></i>
                      {errors.time.message}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-bold text-secondary">
                    <i className="fas fa-book me-2"></i>
                    Subjects
                  </label>
                  <input
                    type="text"
                    className={`form-control form-control-lg ${errors.subject ? 'is-invalid' : ''}`}
                    {...register("subject", { required: "Subjects are required" })}
                    placeholder="e.g., Mathematics, English Literature"
                  />
                  {errors.subject && (
                    <div className="invalid-feedback">
                      <i className="fas fa-exclamation-circle me-2"></i>
                      {errors.subject.message}
                    </div>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 py-3 rounded-pill fw-bold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <i className="fas fa-save me-2"></i>
                  Save Schedule
                </motion.button>
              </form>
            </div>
          </motion.div>

          <div className="text-center mt-4">
            <p className="text-muted">
              <i className="fas fa-info-circle me-2"></i>
              Your schedule will be visible to students looking for tutors
            </p>
          </div>
        </div>
      </div>

      <style>
        {`
          .card {
            transition: all 0.3s ease;
            border: none;
          }
          
          .form-control {
            border-radius: 12px;
            padding: 12px 20px;
            border: 2px solid #e9ecef;
            transition: all 0.3s;
          }
          
          .form-control:focus {
            border-color: #4e54c8;
            box-shadow: 0 0 0 0.25rem rgba(78, 84, 200, 0.25);
          }
          
          .btn-primary {
            background: linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%);
            border: none;
            letter-spacing: 0.5px;
          }
          
          .invalid-feedback {
            font-size: 0.9rem;
            margin-top: 5px;
          }
        `}
      </style>
    </motion.div>
  );
}

export default AddSchedule;