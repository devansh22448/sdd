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
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Rollback</h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">
          Select Deployment to Rollback To
        </h2>

        <div className="space-y-3 mb-6">
          {deployments.map((deployment) => (
            <div
              key={deployment.id}
              onClick={() => setSelectedDeployment(deployment)}
              className={`p-4 border rounded-lg cursor-pointer ${
                selectedDeployment?.id === deployment.id
                  ? "border-blue-500 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">{deployment.name}</h3>
                  <p className="text-sm text-gray-500">
                    Version: {deployment.version}
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(deployment.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleRollback}
          disabled={!selectedDeployment || rollingBack}
          className={`px-6 py-2 rounded-lg ${
            !selectedDeployment || rollingBack
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700 text-white"
          }`}
        >
          {rollingBack ? "Rolling back..." : "Confirm Rollback"}
        </button>
      </div>
    </div>
  );
};

export default Rollback;
