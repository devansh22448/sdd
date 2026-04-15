import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import DeploymentTable from "../components/DeploymentTable";
import NewDeploymentModal from "../components/NewDeploymentModal";
import api from "../services/api";

const Deployments = () => {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const loadDeployments = useCallback(async () => {
    try {
      const response = await api.get("/deployments");
      setDeployments(response.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDeployments();
  }, [loadDeployments]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const interval = setInterval(loadDeployments, 5000);
    return () => clearInterval(interval);
  }, [loadDeployments]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleDeploymentSuccess = (newDeployment) => {
    setDeployments((prev) => [newDeployment, ...prev]);
    showToast("Deployment created successfully!");
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="relative mx-auto grid max-w-[1400px] gap-6 px-6 py-8 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="space-y-6">
          <div className="flex items-center justify-between rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">
                Deployment pipeline log
              </h2>
              <p className="mt-2 text-sm text-text-secondary">
                All active and historical deployments from the backend API.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-light-purple hover:shadow-glow"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              New Deployment
            </button>
          </div>
          {loading ? (
            <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
              <p className="text-text-secondary">Loading deployments...</p>
            </div>
          ) : (
            <DeploymentTable deployments={deployments} />
          )}
        </main>
      </div>

      <NewDeploymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleDeploymentSuccess}
      />

      {toast && (
        <div className="fixed bottom-6 right-6 z-50">
          <div
            className={`rounded-xl border-l-4 px-6 py-4 text-white shadow-lg ${
              toast.type === "success"
                ? "bg-success border-success"
                : "bg-error border-error"
            }`}
          >
            <p className="font-medium">{toast.message}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deployments;