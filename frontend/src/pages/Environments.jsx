import { useState, useEffect } from "react";
import api from "../services/api";

const Environments = () => {
  const [environments, setEnvironments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnvironments = async () => {
      try {
        // const data = await api.getEnvironments();
        // setEnvironments(data);

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
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Environments</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Add Environment
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {environments.map((env) => (
          <div key={env.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-semibold">{env.name}</h3>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  env.status === "active"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {env.status}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-4">{env.url}</p>
            <div className="flex gap-2">
              <button className="text-blue-600 hover:text-blue-800 text-sm">
                View Details
              </button>
              <button className="text-gray-600 hover:text-gray-800 text-sm">
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
