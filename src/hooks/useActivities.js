import { useEffect, useState } from "react";
import activitiesData from "../data/activities.json";

function useActivities() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const storedActivities =
      localStorage.getItem("activities");

    if (storedActivities) {
      setActivities(JSON.parse(storedActivities));
    } else {
      localStorage.setItem(
        "activities",
        JSON.stringify(activitiesData)
      );

      setActivities(activitiesData);
    }
  }, []);

  const addActivity = (newActivity) => {
    const updatedActivities = [
      ...activities,
      newActivity,
    ];

    setActivities(updatedActivities);

    localStorage.setItem(
      "activities",
      JSON.stringify(updatedActivities)
    );
  };

  return {
    activities,
    addActivity,
  };
}

export default useActivities;