function ActivityCard({ activity }) {
  return (
    <div className="recent-activity">

      <div className="recent-activity-info">
        <h3>{activity.title}</h3>
        <p>{activity.category}</p>
      </div>

      <div className="recent-activity-points">
        <strong>{activity.pointsClaimed}</strong>
        <span>points</span>
      </div>

      <span
        className={`status-badge ${activity.status.toLowerCase()}`}
      >
        {activity.status}
      </span>

    </div>
  );
}

export default ActivityCard;