import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const loggedInStudent = localStorage.getItem("loggedInStudent");

  if (!loggedInStudent) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;