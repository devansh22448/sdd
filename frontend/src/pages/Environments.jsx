import { useState, useEffect } from "react";

const Environments = () => {
  const [environments, setEnvironments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        // Mock data
        setEnvironments([
          {
            id: 1,
            name: "Production",
            url: "https://prod.example.com",
            status: "active",
          },
          {
            id: 2,
            name: "Staging",
            url: "https://staging.example.com",
            status: "active",
          },
          {
            id: 3,
            name: "Development",
            url: "https://dev.example.com",
            status: "inactive",
          },
          {
            id: 4,
            name: "QA",
            url: "https://qa.example.com",
            status: "active",
          },
        ]);
      } catch (error) {
        console.error("Error fetching environments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEnvironments();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-devops-purple">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-devops-text">Environments</h1>
          <p className="text-devops-text-secondary mt-1">Manage your deployment environments</p>
        </div>
        <button className="px-4 py-2 bg-devops-purple hover:bg-devops-purple-light text-white rounded-xl font-medium transition-colors shadow-lg shadow-devops-purple/20">
          Add Environment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {environments.map((env) => (
          <div key={env.id} className="bg-devops-card rounded-xl border border-devops-border p-6 hover:border-devops-purple/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold text-devops-text">{env.name}</h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium border ${
                  env.status === "active"
                    ? "bg-devops-success/20 text-devops-success border-devops-success/30"
                    : "bg-devops-text-secondary/20 text-devops-text-secondary border-devops-text-secondary/30"
                }`}
              >
                {env.status}
              </span>
            </div>
            <p className="text-devops-text-secondary text-sm mb-4 font-mono">{env.url}</p>
            <div className="flex gap-3">
              <button className="text-devops-purple hover:text-devops-purple-light text-sm font-medium transition-colors">
                View Details
              </button>
              <button className="text-devops-text-secondary hover:text-devops-text text-sm transition-colors">
                Configure
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Environments;
