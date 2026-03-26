import { useState, useEffect } from "react";

const Rollback = () => {
  const [deployments, setDeployments] = useState([]);
  const [selectedDeployment, setSelectedDeployment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rollingBack, setRollingBack] = useState(false);

  useEffect(() => {
    const fetchDeployments = async () => {
      try {
        // Mock data
        setDeployments([
          {
            id: 1,
            name: "Production Deploy v2",
            version: "2.0.0",
            timestamp: "2024-01-15T10:30:00Z",
          },
          {
            id: 2,
            name: "Production Deploy v1",
            version: "1.9.0",
            timestamp: "2024-01-14T08:00:00Z",
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

  const handleRollback = async () => {
    if (!selectedDeployment) return;

    setRollingBack(true);
    try {
      // Rollback logic here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(`Rolled back to version ${selectedDeployment.version}`);
    } catch (error) {
      console.error("Error during rollback:", error);
    } finally {
      setRollingBack(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-devops-purple">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-devops-text">Rollback</h1>
        <p className="text-devops-text-secondary mt-1">Revert to a previous deployment version</p>
      </div>

      <div className="bg-devops-card rounded-xl border border-devops-border p-6 max-w-2xl">
        <h2 className="text-xl font-semibold text-devops-text mb-4">
          Select Deployment to Rollback To
        </h2>

        <div className="space-y-3 mb-6">
          {deployments.map((deployment) => (
            <div
              key={deployment.id}
              onClick={() => setSelectedDeployment(deployment)}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedDeployment?.id === deployment.id
                  ? "border-devops-purple bg-devops-purple/10"
                  : "border-devops-border hover:bg-devops-bg/50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-devops-text">{deployment.name}</h3>
                  <p className="text-sm text-devops-text-secondary">
                    Version: {deployment.version}
                  </p>
                </div>
                <span className="text-sm text-devops-text-secondary font-mono">
                  {new Date(deployment.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleRollback}
          disabled={!selectedDeployment || rollingBack}
          className={`px-6 py-2 rounded-lg transition-all ${
            !selectedDeployment || rollingBack
              ? "bg-devops-border text-devops-text-secondary cursor-not-allowed"
              : "bg-devops-error hover:bg-devops-error/80 text-white shadow-lg shadow-devops-error/20"
          }`}
        >
          {rollingBack ? "Rolling back..." : "Confirm Rollback"}
        </button>
      </div>
    </div>
  );
};

export default Rollback;
