import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DeploymentTable from "../components/DeploymentTable";

const Deployments = () => {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    const fetchDeployments = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        setDeployments([
          {
            id: 156,
            project: "Frontend App",
            status: "success",
            time: "2 min ago",
            duration: "3m 24s",
          },
          {
            id: 155,
            project: "Backend API",
            status: "failed",
            time: "1 hour ago",
            duration: "2m 15s",
          },
          {
            id: 154,
            project: "Database Migration",
            status: "success",
            time: "2 hours ago",
            duration: "5m 42s",
          },
          {
            id: 153,
            project: "Frontend App",
            status: "success",
            time: "3 hours ago",
            duration: "3m 18s",
          },
          {
            id: 152,
            project: "Microservice A",
            status: "pending",
            time: "4 hours ago",
            duration: "-",
          },
          {
            id: 151,
            project: "Backend API",
            status: "running",
            time: "5 hours ago",
            duration: "1m 30s",
          },
          {
            id: 150,
            project: "Frontend App",
            status: "success",
            time: "6 hours ago",
            duration: "3m 45s",
          },
          {
            id: 149,
            project: "Database Migration",
            status: "failed",
            time: "7 hours ago",
            duration: "4m 12s",
          },
        ]);
      } catch (error) {
        console.error("Error fetching deployments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeployments();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-devops-text">Deployments</h1>
          <p className="text-devops-text-secondary mt-1">
            Manage and monitor your deployments
          </p>
        </div>
        <button
          onClick={() => navigate("/trigger-deployment")}
          className="px-4 py-2 bg-devops-purple hover:bg-devops-purple-light text-white rounded-xl font-medium transition-colors shadow-lg shadow-devops-purple/20"
        >
          + New Deployment
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-devops-purple">Loading...</div>
        </div>
      ) : (
        <DeploymentTable deployments={deployments} />
      )}
    </div>
  );
};

export default Deployments;
