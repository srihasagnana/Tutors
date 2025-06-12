import axios from "axios";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { TutorLoginContextObj } from "../contexts/TutorLoginContext"; // adjust path as needed

function AddSchedule() {
  const { register, handleSubmit } = useForm();
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
  <div className="container mt-5">
    <div className="card shadow-lg p-4 mx-auto" style={{ maxWidth: '500px' }}>
      <h2 className="text-center mb-4">Add Schedule</h2>
      <form onSubmit={handleSubmit(handleSchedule)}>
        <div className="mb-3">
          <label className="form-label">Days</label>
          <input
            type="text"
            className="form-control"
            {...register("day")}
            placeholder="e.g., Mon, Wed, Fri"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Time</label>
          <input
            type="text"
            className="form-control"
            {...register("time")}
            placeholder="e.g., 10:00 AM - 12:00 PM"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Subjects</label>
          <input
            type="text"
            className="form-control"
            {...register("subject")}
            placeholder="e.g., Math, English"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Schedule</button>
      </form>
    </div>
  </div>
);

}

export default AddSchedule;
