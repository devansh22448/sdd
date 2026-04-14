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
    return <div className="text-center py-8">Loading...</div>;
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Failures</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {failures.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            No failures recorded
          </div>
        ) : (
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Message
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {failures.map((failure) => (
                <tr key={failure.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">
                    {failure.type}
                  </td>
                  <td className="px-6 py-4">{failure.message}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getSeverityColor(failure.severity)}`}
                    >
                      {failure.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {new Date(failure.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-blue-600 hover:text-blue-800">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Failures;
