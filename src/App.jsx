import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Activities from "./pages/Activities";
import AddActivity from "./pages/AddActivity";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/activities"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Activities />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-activity"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AddActivity />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Categories />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;