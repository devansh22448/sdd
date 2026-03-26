import { useState, useEffect } from "react";

const Failures = () => {
  const [failures, setFailures] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFailures = async () => {
      try {
        // Mock data
        setFailures([
          {
            id: 1,
            type: "Deployment Failed",
            message: "Build failed: missing dependency",
            timestamp: "2024-01-15T10:30:00Z",
            severity: "high",
          },
          {
            id: 2,
            type: "Health Check Failed",
            message: "Service not responding",
            timestamp: "2024-01-15T09:15:00Z",
            severity: "critical",
          },
          {
            id: 3,
            type: "Rollback Failed",
            message: "Timeout during rollback",
            timestamp: "2024-01-14T16:45:00Z",
            severity: "high",
          },
        ]);
      } catch (error) {
        console.error("Error fetching failures:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFailures();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-devops-purple">Loading...</div>
      </div>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "bg-devops-error/20 text-devops-error border-devops-error/30";
      case "high":
        return "bg-devops-warning/20 text-devops-warning border-devops-warning/30";
      case "medium":
        return "bg-devops-highlight/20 text-devops-highlight border-devops-highlight/30";
      default:
        return "bg-devops-text-secondary/20 text-devops-text-secondary border-devops-text-secondary/30";
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-devops-text">Failures</h1>
        <p className="text-devops-text-secondary mt-1">Track and analyze deployment failures</p>
      </div>

      <div className="bg-devops-card rounded-xl border border-devops-border overflow-hidden">
        {failures.length === 0 ? (
          <div className="p-8 text-center text-devops-text-secondary">
            No failures recorded
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-devops-border">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-devops-text-secondary uppercase tracking-wider">
                    Type
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-devops-text-secondary uppercase tracking-wider">
                    Message
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-devops-text-secondary uppercase tracking-wider">
                    Severity
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-devops-text-secondary uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-devops-text-secondary uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-devops-border/50">
                {failures.map((failure) => (
                  <tr key={failure.id} className="hover:bg-devops-bg/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-devops-text">
                      {failure.type}
                    </td>
                    <td className="px-6 py-4 text-devops-text-secondary">{failure.message}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(failure.severity)}`}
                      >
                        {failure.severity}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-devops-text-secondary font-mono text-sm">
                      {new Date(failure.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-devops-purple hover:text-devops-purple-light text-sm font-medium transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Failures;
