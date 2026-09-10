import { useEffect, useState } from "react";
import students from "../data/students.json";
import useActivities from "../hooks/useActivities";
import StatCard from "../components/StatCard";
import ActivityCard from "../components/ActivityCard";

function Dashboard() {
  const [student, setStudent] = useState(null);

  // Hook must be called directly inside the component
  const { activities: allActivities } = useActivities();

  const loggedInUID = localStorage.getItem("loggedInStudent");

  const activities = allActivities.filter(
    (activity) => activity.uid === loggedInUID
  );

  useEffect(() => {
    const currentStudent = students.find(
      (student) => student.uid === loggedInUID
    );

    setStudent(currentStudent);
  }, [loggedInUID]);

  if (!student) {
    return <p>Loading...</p>;
  }

  const approvedPoints = activities.reduce(
    (total, activity) => total + activity.pointsApproved,
    0
  );

  const claimedPoints = activities.reduce(
    (total, activity) => total + activity.pointsClaimed,
    0
  );

  const pendingPoints = claimedPoints - approvedPoints;

  const remainingPoints = Math.max(
    student.targetPoints - approvedPoints,
    0
  );

  const progress = Math.min(
    (approvedPoints / student.targetPoints) * 100,
    100
  );

  const recentActivities = [...activities]
    .slice(-3)
    .reverse();

  return (
    <div className="dashboard">

      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, {student.name}</p>
        </div>
      </div>

      {/* Student Information */}
      <div className="student-info-card">

        <div>
          <span>Student Name</span>
          <strong>{student.name}</strong>
        </div>

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

        <div>
          <span>Target Points</span>
          <strong>{student.targetPoints}</strong>
        </div>

      </div>

      {/* Statistics */}
      <div className="stats-grid">

        <StatCard
          title="Approved Points"
          value={approvedPoints}
          description="Successfully approved"
        />

        <StatCard
          title="Claimed Points"
          value={claimedPoints}
          description="Total points claimed"
        />

        <StatCard
          title="Pending Points"
          value={pendingPoints}
          description="Awaiting approval"
        />

        <StatCard
          title="Remaining"
          value={remainingPoints}
          description="Points to reach target"
        />

      </div>

      {/* Progress */}
      <div className="progress-section">

        <div className="progress-header">
          <div>
            <h2>Overall Progress</h2>
            <p>
              {approvedPoints} of {student.targetPoints} points approved
            </p>
          </div>

          <strong>{Math.round(progress)}%</strong>
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

      </div>

      {/* Recent Activities */}
      <div className="recent-section">

        <div className="section-header">
          <div>
            <h2>Recent Activities</h2>
            <p>Your latest submitted activities</p>
          </div>
        </div>

        {recentActivities.length === 0 ? (
          <div className="empty-state">
            <h3>No activities yet</h3>
            <p>Add your first activity to start earning points.</p>
          </div>
        ) : (
          <div className="recent-activities">

            {recentActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
              />
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default Dashboard;