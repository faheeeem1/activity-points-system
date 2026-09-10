import { useEffect, useState } from "react";
import students from "../data/students.json";
import useActivities from "../hooks/useActivities";

function Profile() {
  const [student, setStudent] = useState(null);

  const { activities: allActivities } = useActivities();

  const uid = localStorage.getItem("loggedInStudent");

  const activities = allActivities.filter(
    (activity) => activity.uid === uid
  );

  useEffect(() => {
    const currentStudent = students.find(
      (student) => student.uid === uid
    );

    setStudent(currentStudent);
  }, [uid]);

  if (!student) {
    return <p>Loading...</p>;
  }

  const claimedPoints = activities.reduce(
    (total, activity) => total + activity.pointsClaimed,
    0
  );

  const approvedPoints = activities.reduce(
    (total, activity) => total + activity.pointsApproved,
    0
  );

  const pendingActivities = activities.filter(
    (activity) => activity.status === "Pending"
  ).length;

  const progress = Math.min(
    (approvedPoints / student.targetPoints) * 100,
    100
  );

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>My Profile</h1>
          <p>View your student information and activity points summary.</p>
        </div>
      </div>

      <div className="profile-layout">

        {/* Student Information */}
        <div className="profile-card">

          <div className="profile-avatar">
            {student.name
              .split(" ")
              .map((name) => name[0])
              .join("")
              .toUpperCase()}
          </div>

          <h2>{student.name}</h2>
          <p className="profile-role">Student</p>

          <div className="profile-details">

            <div>
              <span>UID</span>
              <strong>{student.uid}</strong>
            </div>

            <div>
              <span>Department</span>
              <strong>{student.department}</strong>
            </div>

            <div>
              <span>Semester</span>
              <strong>{student.semester}</strong>
            </div>

          </div>
        </div>

        {/* Points Summary */}
        <div className="profile-summary">

          <h2>Points Summary</h2>

          <div className="profile-stat-grid">

            <div>
              <span>Target</span>
              <strong>{student.targetPoints}</strong>
            </div>

            <div>
              <span>Approved</span>
              <strong>{approvedPoints}</strong>
            </div>

            <div>
              <span>Claimed</span>
              <strong>{claimedPoints}</strong>
            </div>

            <div>
              <span>Pending Activities</span>
              <strong>{pendingActivities}</strong>
            </div>

          </div>

          {/* Progress */}
          <div className="profile-progress">

            <div className="profile-progress-header">
              <span>Overall Progress</span>
              <strong>{Math.round(progress)}%</strong>
            </div>

            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            <p>
              {approvedPoints} of {student.targetPoints} points approved
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;