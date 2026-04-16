import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Landing from "../pages/Landing";
import Dashboard from "../pages/Dashboard";
import Deployments from "../pages/Deployments";
import DeploymentDetails from "../pages/DeploymentDetails";
import Logs from "../pages/Logs";
import Metrics from "../pages/Metrics";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark-bg text-text-primary">
        <div className="rounded-3xl bg-card-bg p-8 shadow-panel">
          <p className="text-lg font-semibold">
            Loading Smart DevOps Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<ProtectedRoute>{<Dashboard />}</ProtectedRoute>}
        />
        <Route
          path="/deployments"
          element={<ProtectedRoute>{<Deployments />}</ProtectedRoute>}
        />
        <Route
          path="/deployments/:id"
          element={<ProtectedRoute>{<DeploymentDetails />}</ProtectedRoute>}
        />
        <Route
          path="/logs"
          element={<ProtectedRoute>{<Logs />}</ProtectedRoute>}
        />
        <Route
          path="/metrics"
          element={<ProtectedRoute>{<Metrics />}</ProtectedRoute>}
        />
        <Route
          path="/settings"
          element={<ProtectedRoute>{<Settings />}</ProtectedRoute>}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
