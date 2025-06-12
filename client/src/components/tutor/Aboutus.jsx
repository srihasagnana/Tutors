import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { TutorLoginContextObj } from "../contexts/TutorLoginContext"; // adjust path as needed

function Aboutus() {
  const { register, handleSubmit, reset } = useForm();
  const { currentTutor } = useContext(TutorLoginContextObj);

  const tutorId = currentTutor?._id;

  console.log("Tutor ID from context:", tutorId);

  async function handleSchedule(data) {
    if (!tutorId) {
      alert("No tutor ID found. Please login again.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:7878/tutor-api/tutorupdate/${tutorId}`,
        {
          about: data.about
          
        }
      );

      console.log("Update Success:", response.data);
      alert("Description updated successfully!");
      reset(); // clear form after submission
    } catch (err) {
      console.error("Error updating schedule:", err);
      alert(`Failed to update description: ${err.response?.data?.message || err.message}`);
    }
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Add Description</h2>
        <form onSubmit={handleSubmit(handleSchedule)}>
          <div className="mb-3">
            <label className="form-label">About your schedule or background</label>
            <textarea
              className="form-control"
              rows="5"
              placeholder="Describe your teaching schedule, background, or experience..."
              {...register("about", { required: true })}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Save Description
          </button>
        </form>
      </div>
    </div>
  );
}

export default Aboutus;
