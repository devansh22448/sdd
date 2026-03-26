import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Deployments from "../pages/Deployments";
import TriggerDeployment from "../pages/TriggerDeployment";
import Logs from "../pages/Logs";
import Metrics from "../pages/Metrics";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
import FooterSettings from "../pages/FooterSettings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected routes with MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="deployments" element={<Deployments />} />
        <Route path="trigger-deployment" element={<TriggerDeployment />} />
        <Route path="logs" element={<Logs />} />
        <Route path="metrics" element={<Metrics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="footer-settings" element={<FooterSettings />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
