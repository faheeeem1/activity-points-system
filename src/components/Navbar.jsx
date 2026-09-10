import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import students from "../data/students.json";

function Navbar() {
  const location = useLocation();
  const [student, setStudent] = useState(null);

  const uid = localStorage.getItem("loggedInStudent");

  useEffect(() => {
    const currentStudent = students.find(
      (student) => student.uid === uid
    );

    setStudent(currentStudent);
  }, [uid]);

  const pageNames = {
    "/dashboard": "Dashboard",
    "/activities": "Activities",
    "/add-activity": "Add Activity",
    "/categories": "Categories",
    "/profile": "Profile",
  };

  if (!student) {
    return null;
  }

  const initials = student.name
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <header className="top-navbar">

      <div>
        <h2>{pageNames[location.pathname] || "Activity Points"}</h2>
        <p>Activity Points Management System</p>
      </div>

      <div className="navbar-user">

        <div className="navbar-avatar">
          {initials}
        </div>

        <div>
          <strong>{student.name}</strong>
          <span>Student</span>
        </div>

      </div>

    </header>
  );
}

export default Navbar;