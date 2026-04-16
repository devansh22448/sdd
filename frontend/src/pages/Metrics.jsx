import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell
} from "recharts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const COLORS = ["#10B981", "#EF4444", "#3B82F6", "#F59E0B"];

const Metrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [tickerOffset, setTickerOffset] = useState(0);

  const loadMetrics = useCallback(async () => {
    try {
      const response = await api.get("/deployments/metrics");
      setMetrics(response.data || {});
      setLastUpdated(Date.now());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMetrics();
    const intervalId = setInterval(loadMetrics, 30000);
    return () => clearInterval(intervalId);
  }, [loadMetrics]);

  useEffect(() => {
    const ticker = setInterval(() => {
      setTickerOffset(Math.floor((Date.now() - lastUpdated) / 1000));
    }, 1000);
    return () => clearInterval(ticker);
  }, [lastUpdated]);

  const deploymentsByDay = metrics?.deploymentsByDay || [];
  const statusBreakdown = metrics?.statusBreakdown || [];
  const deploymentsByEnvironment = metrics?.deploymentsByEnvironment || [];
  const avgDurationByEnvironment = metrics?.avgDurationByEnvironment || [];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="mx-auto grid max-w-[1400px] gap-6 px-6 py-8 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="space-y-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
            <div>
              <h2 className="text-xl font-semibold text-text-primary">Deployment Metrics</h2>
              <p className="mt-2 text-sm text-text-secondary">Analyze release stability, average execution time, and deployment trends.</p>
            </div>
            <div className="text-sm font-semibold text-text-secondary">
              Last updated: {tickerOffset} seconds ago
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-soft bg-card-bg p-4 shadow-panel flex flex-col justify-center items-center">
              <div className="text-sm text-text-secondary font-medium">Total Deployments</div>
              <div className="text-3xl font-bold text-white mt-2">{loading ? "-" : metrics?.totalDeployments}</div>
            </div>
            <div className="rounded-2xl border border-soft bg-card-bg p-4 shadow-panel flex flex-col justify-center items-center">
              <div className="text-sm text-text-secondary font-medium">Success Rate</div>
              <div className="text-3xl font-bold text-success mt-2">{loading ? "-" : `${metrics?.successRate}%`}</div>
            </div>
            <div className="rounded-2xl border border-soft bg-card-bg p-4 shadow-panel flex flex-col justify-center items-center">
              <div className="text-sm text-text-secondary font-medium">Average Duration</div>
              <div className="text-3xl font-bold text-primary mt-2">{loading ? "-" : `${Math.round(metrics?.avgDurationMs / 1000)}s`}</div>
            </div>
            <div className="rounded-2xl border border-soft bg-card-bg p-4 shadow-panel flex flex-col justify-center items-center">
              <div className="text-sm text-text-secondary font-medium">Active Deployments</div>
              <div className="text-3xl font-bold text-blue-400 mt-2">{loading ? "-" : metrics?.activeDeployments}</div>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
              <h3 className="text-lg font-semibold text-text-primary">Deployments Over Time (Last 30 Days)</h3>
              <div className="mt-6 h-[300px]">
                {loading ? <div className="h-full animate-pulse rounded-[28px] bg-dark-bg"></div> : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={deploymentsByDay} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="trendA" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.5} />
                          <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" stroke="#A1A1AA" tickLine={false} />
                      <YAxis stroke="#A1A1AA" tickLine={false} />
                      <CartesianGrid strokeDasharray="3 3" stroke="#1A1333" />
                      <Tooltip contentStyle={{ backgroundColor: "#1A1333", border: "1px solid #7C3AED" }} labelStyle={{ color: "#F9FAFB" }} />
                      <Area type="monotone" dataKey="deployments" stroke="#7C3AED" fill="url(#trendA)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
              <h3 className="text-lg font-semibold text-text-primary">Success vs Failed</h3>
              <div className="mt-6 h-[300px]">
                {loading ? <div className="h-full animate-pulse rounded-[28px] bg-dark-bg"></div> : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: "#1A1333", borderRadius: "8px", border: "1px solid #332d4a" }} itemStyle={{ color: "#fff" }} />
                      <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
              <h3 className="text-lg font-semibold text-text-primary">Deployments by Environment</h3>
              <div className="mt-6 h-[250px]">
                {loading ? <div className="h-full animate-pulse rounded-[28px] bg-dark-bg"></div> : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={deploymentsByEnvironment} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <XAxis dataKey="name" stroke="#A1A1AA" tickLine={false} />
                      <YAxis stroke="#A1A1AA" tickLine={false} />
                      <CartesianGrid strokeDasharray="3 3" stroke="#1A1333" />
                      <Tooltip contentStyle={{ backgroundColor: "#1A1333", border: "1px solid #7C3AED" }} labelStyle={{ color: "#F9FAFB" }} />
                      <Bar dataKey="count" fill="#A78BFA" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
              <h3 className="text-lg font-semibold text-text-primary">Avg Duration by Environment (s)</h3>
              <div className="mt-6 h-[250px]">
                {loading ? <div className="h-full animate-pulse rounded-[28px] bg-dark-bg"></div> : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={avgDurationByEnvironment} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                      <XAxis type="number" stroke="#A1A1AA" tickLine={false} />
                      <YAxis dataKey="name" type="category" stroke="#A1A1AA" tickLine={false} />
                      <CartesianGrid strokeDasharray="3 3" stroke="#1A1333" />
                      <Tooltip contentStyle={{ backgroundColor: "#1A1333", border: "1px solid #10B981" }} labelStyle={{ color: "#F9FAFB" }} />
                      <Bar dataKey="duration" fill="#34D399" radius={[0, 8, 8, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Metrics;
