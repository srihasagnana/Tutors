import { useContext, useEffect, useState } from "react";
import { StudentLoginContextObj } from "../contexts/StudentLoginContext";

function getTrialTimeLeft(joinDate) {
  if (!joinDate) return "Invalid date";

  const joinTime = new Date(joinDate).getTime();
  const currentTime = Date.now();
  const sevenDays = 7 * 24 * 60 * 60 * 1000;

  const remaining = sevenDays - (currentTime - joinTime);

  if (remaining <= 0) return "Trial Done";

  const days = Math.floor(remaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((remaining % (60 * 60 * 1000)) / (60 * 1000));

  return `${days}d ${hours}h ${minutes}m left`;
}

function History() {
  const { currentStudent } = useContext(StudentLoginContextObj);
  const [trialStatus, setTrialStatus] = useState(false);
  const [courseDetails, setCourseDetails] = useState("");

  useEffect(() => {
    if (!currentStudent) {
      alert("Please log in first");
      window.location.href = "/login";
    } else if (currentStudent.trialStatus === true) {
      setTrialStatus(true);
      setCourseDetails(currentStudent.tutorname || "N/A");
    }
  }, [currentStudent]);

  const trialEndDate = currentStudent?.joinDate
    ? new Date(new Date(currentStudent.joinDate).getTime() + 7 * 24 * 60 * 60 * 1000)
    : null;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      {/* <h1 className="text-2xl font-bold mb-4">History</h1> */}

      <div className="p-3 border rounded bg-light w-25 shadow-sm mb-4">
        <div className="d-flex align-items-center gap-2 mb-3">
          <i className="fa-solid fa-user fs-4 text-primary"></i>
          <h3 className="mb-0">Personal Details</h3>
        </div>

        <p><strong>Name:</strong> {currentStudent.studentname}</p>
        <p><strong>Class:</strong> {currentStudent.class}</p>
        <p><strong>Address:</strong> {currentStudent.address}</p>
        <p><strong>Mode:</strong> {currentStudent.mode}</p>
      </div>


      {trialStatus ? (
        <>
          <p className="mb-2">Your trial is active.</p>
          <p className="mb-1">Trial started on: {new Date(currentStudent.joinDate).toLocaleDateString()}</p>
          <p className="mb-1">Trial ends on: {trialEndDate?.toLocaleDateString()}</p>
          <p className="mb-1">Course Details: {courseDetails}</p>
          <p className="font-semibold mt-2">Time left: {getTrialTimeLeft(currentStudent.joinDate)}</p>
        </>
      ) : (
        <p className="text-red-600">You are not currently in a trial.</p>
      )}
    </div>
  );
}

export default History;
