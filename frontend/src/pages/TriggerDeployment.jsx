import { useState } from "react";

const TriggerDeployment = () => {
  const [formData, setFormData] = useState({
    environment: "",
    version: "",
    branch: "main",
  });
  const [deploying, setDeploying] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDeploying(true);
    try {
      // Deployment logic here
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Deployment triggered successfully!");
    } catch (error) {
      console.error("Error triggering deployment:", error);
    } finally {
      setDeploying(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Trigger Deployment</h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Environment <span className="text-red-500">*</span>
            </label>
            <select
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              <option value="">Select environment</option>
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Version <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="version"
              value={formData.version}
              onChange={handleChange}
              placeholder="e.g., 1.0.0"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Branch
            </label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            disabled={deploying}
            className={`px-6 py-2 rounded-lg ${
              deploying
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {deploying ? "Deploying..." : "Trigger Deployment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TriggerDeployment;
