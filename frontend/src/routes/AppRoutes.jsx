import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Deployments from "../pages/Deployments";
import Logs from "../pages/Logs";
import Settings from "../pages/Settings";
import TriggerDeployment from "../pages/TriggerDeployment";
import DeploymentDetails from "../pages/DeploymentDetails";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="deployments" element={<Deployments />} />
        <Route path="/deployments/:id" element={<DeploymentDetails />} />
        <Route path="deployments/new" element={<TriggerDeployment />} />
        <Route path="logs" element={<Logs />} />
        <Route path="settings" element={<Settings />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
