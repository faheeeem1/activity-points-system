import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("loggedInStudent");
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <div className="logo-mark">AP</div>

        <div>
          <h2>Activity Points</h2>
          <p>Student Portal</p>
        </div>
      </div>

      <nav className="sidebar-nav">

        <p className="nav-label">MAIN</p>

        <NavLink to="/dashboard" className="nav-link">
          <span>⌂</span>
          <label>Dashboard</label>
        </NavLink>

        <NavLink to="/activities" className="nav-link">
          <span>▤</span>
          <label>Activities</label>
        </NavLink>

        <NavLink to="/add-activity" className="nav-link">
          <span>＋</span>
          <label>Add Activity</label>
        </NavLink>

        <p className="nav-label">ACCOUNT</p>

        <NavLink to="/categories" className="nav-link">
          <span>◈</span>
          <label>Categories</label>
        </NavLink>

        <NavLink to="/profile" className="nav-link">
          <span>○</span>
          <label>Profile</label>
        </NavLink>

      </nav>

      <button className="logout-button" onClick={handleLogout}>
        <span>↪</span>
        <label>Logout</label>
      </button>

    </aside>
  );
}

export default Sidebar;