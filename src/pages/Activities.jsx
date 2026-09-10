import { useState } from "react";
import { Link } from "react-router-dom";
import useActivities from "../hooks/useActivities";


function Activities() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const { activities: allActivities } = useActivities();

  const loggedInUID =
    localStorage.getItem("loggedInStudent");

  const activities = allActivities.filter(
    (activity) => activity.uid === loggedInUID
  );

  const categories = [
    "All",
    ...new Set(activities.map((activity) => activity.category)),
  ];

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      activity.description
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      activity.category === category;

    const matchesStatus =
      status === "All" ||
      activity.status === status;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus
    );
  });

  return (
    <div className="page-container">

      <div className="page-header">
        <div>
          <h1>Activities</h1>
          <p>
            View your submitted activity records and points.
          </p>
        </div>

        <Link
          to="/add-activity"
          className="primary-button"
        >
          + Add Activity
        </Link>
      </div>

      <div className="activity-summary">

        <div>
          <span>Total Activities</span>
          <strong>{activities.length}</strong>
        </div>

        <div>
          <span>Approved</span>
          <strong>
            {
              activities.filter(
                (activity) =>
                  activity.status === "Approved"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>Pending</span>
          <strong>
            {
              activities.filter(
                (activity) =>
                  activity.status === "Pending"
              ).length
            }
          </strong>
        </div>

        <div>
          <span>Points Claimed</span>
          <strong>
            {activities.reduce(
              (total, activity) =>
                total + activity.pointsClaimed,
              0
            )}
          </strong>
        </div>

      </div>

      <div className="activity-controls">

        <input
          type="text"
          placeholder="Search activities..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          {categories.map((item) => (
            <option key={item}>
              {item}
            </option>
          ))}
        </select>

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option>All</option>
          <option>Approved</option>
          <option>Pending</option>
        </select>

      </div>

      <div className="activities-table-container">

        {filteredActivities.length === 0 ? (

          <div className="empty-state">
            <h3>No activities found</h3>
            <p>
              Try changing your search or filter options.
            </p>
          </div>

        ) : (

          <table className="activities-table">

            <thead>
              <tr>
                <th>Activity</th>
                <th>Category</th>
                <th>Date</th>
                <th>Claimed</th>
                <th>Approved</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {filteredActivities.map((activity) => (

                <tr key={activity.id}>

                  <td>
                    <div className="activity-title">
                      <strong>
                        {activity.title}
                      </strong>

                      <span>
                        {activity.description}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span className="category-badge">
                      {activity.category}
                    </span>
                  </td>

                  <td>
                    {new Date(
                      activity.date
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td>
                    {activity.pointsClaimed}
                  </td>

                  <td>
                    {activity.pointsApproved}
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        activity.status.toLowerCase()
                      }`}
                    >
                      {activity.status}
                    </span>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

      <p className="results-count">
        Showing {filteredActivities.length} of{" "}
        {activities.length} activities
      </p>

    </div>
  );
}

export default Activities;