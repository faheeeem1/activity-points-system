import { useState } from "react";
import { useNavigate } from "react-router-dom";
import students from "../data/students.json";

function Login() {
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const student = students.find(
      (student) =>
        student.uid === uid && student.password === password
    );

    if (student) {
      localStorage.setItem("loggedInStudent", student.uid);
      navigate("/dashboard");
    } else {
      setError("Invalid UID or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Activity Points</h1>
        <p>Student Management System</p>

        <form onSubmit={handleLogin}>
          <label>UID</label>
          <input
            type="text"
            placeholder="Enter your UID"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>
        </form>

        <p className="demo-login">
          Demo UID: <strong>u2408027</strong>
          <br />
          Demo Password: <strong>123456</strong>
        </p>
      </div>
    </div>
  );
}

export default Login;