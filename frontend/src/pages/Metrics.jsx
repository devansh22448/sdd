import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Metrics = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const deploymentTrendData = [
    { name: "Mon", success: 12, failed: 2 },
    { name: "Tue", success: 15, failed: 1 },
    { name: "Wed", success: 18, failed: 3 },
    { name: "Thu", success: 14, failed: 2 },
    { name: "Fri", success: 20, failed: 1 },
    { name: "Sat", success: 8, failed: 0 },
    { name: "Sun", success: 6, failed: 1 },
  ];

  const deploymentTimeData = [
    { name: "Frontend", avgTime: 3.5 },
    { name: "Backend", avgTime: 4.2 },
    { name: "Database", avgTime: 2.8 },
    { name: "Mobile", avgTime: 5.1 },
    { name: "ML Service", avgTime: 6.3 },
  ];

  const statusData = [
    { name: "Success", value: 156 },
    { name: "Failed", value: 12 },
    { name: "Pending", value: 5 },
  ];

  const COLORS = ["#3AAFA9", "#E63946", "#FFD166"];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#3AAFA9]">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#F7F9FA]">Metrics</h1>
        <p className="text-[#9FB3B6] mt-1">Deployment analytics and insights</p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deployment Trend Chart */}
        <div className="bg-[#0F2E34] rounded-xl border border-[#172A3A] p-6">
          <h2 className="text-lg font-semibold text-[#FFD166] mb-4">
            Deployment Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={deploymentTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#172A3A" />
              <XAxis dataKey="name" stroke="#9FB3B6" />
              <YAxis stroke="#9FB3B6" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F2E34",
                  border: "1px solid #172A3A",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#F7F9FA" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="success"
                stroke="#3AAFA9"
                strokeWidth={2}
                dot={{ fill: "#3AAFA9" }}
              />
              <Line
                type="monotone"
                dataKey="failed"
                stroke="#E63946"
                strokeWidth={2}
                dot={{ fill: "#E63946" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-[#0F2E34] rounded-xl border border-[#172A3A] p-6">
          <h2 className="text-lg font-semibold text-[#FFD166] mb-4">
            Success vs Failure
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F2E34",
                  border: "1px solid #172A3A",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#F7F9FA" }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Average Deployment Time */}
        <div className="bg-[#0F2E34] rounded-xl border border-[#172A3A] p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-[#FFD166] mb-4">
            Average Deployment Time (minutes)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={deploymentTimeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#172A3A" />
              <XAxis dataKey="name" stroke="#9FB3B6" />
              <YAxis stroke="#9FB3B6" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#0F2E34",
                  border: "1px solid #172A3A",
                  borderRadius: "8px",
                }}
                labelStyle={{ color: "#F7F9FA" }}
              />
              <Bar dataKey="avgTime" fill="#3AAFA9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
