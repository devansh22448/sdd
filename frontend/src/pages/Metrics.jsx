import { useEffect, useState } from "react";
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
} from "recharts";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const Metrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const response = await api.get("/metrics");
        setMetrics(response.data || {});
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadMetrics();
  }, []);

  const trendData = metrics?.deploymentTrend || [];
  const performanceData = metrics?.statusBreakdown || [];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="mx-auto grid max-w-[1400px] gap-6 px-6 py-8 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="space-y-6">
          <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
            <h2 className="text-xl font-semibold text-text-primary">
              Deployment metrics
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Analyze release stability, average execution time, and deployment
              trends.
            </p>
          </div>
          <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
              <h3 className="text-lg font-semibold text-text-primary">
                Deployment trends
              </h3>
              <p className="mt-2 text-sm text-text-secondary">
                Deploy count over time from backend analytics.
              </p>
              <div className="mt-6 h-[360px]">
                {loading ? (
                  <div className="h-full animate-pulse rounded-[28px] bg-dark-bg"></div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={trendData}
                      margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="trendA" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="#7C3AED"
                            stopOpacity={0.7}
                          />
                          <stop
                            offset="95%"
                            stopColor="#7C3AED"
                            stopOpacity={0.05}
                          />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="label"
                        stroke="#A1A1AA"
                        tickLine={false}
                      />
                      <YAxis stroke="#A1A1AA" tickLine={false} />
                      <CartesianGrid strokeDasharray="3 3" stroke="#1A1333" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1A1333",
                          border: "1px solid #7C3AED",
                        }}
                        labelStyle={{ color: "#F9FAFB" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="deployments"
                        stroke="#7C3AED"
                        fill="url(#trendA)"
                        strokeWidth={3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
                <h3 className="text-lg font-semibold text-text-primary">
                  Success vs failures
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Backend-supplied status distribution.
                </p>
                <div className="mt-6 h-[280px]">
                  {loading ? (
                    <div className="h-full animate-pulse rounded-[28px] bg-dark-bg"></div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                      >
                        <XAxis
                          dataKey="status"
                          stroke="#A1A1AA"
                          tickLine={false}
                        />
                        <YAxis stroke="#A1A1AA" tickLine={false} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#1A1333" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1A1333",
                            border: "1px solid #7C3AED",
                          }}
                          labelStyle={{ color: "#F9FAFB" }}
                        />
                        <Bar
                          dataKey="count"
                          fill="#A78BFA"
                          radius={[12, 12, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
              <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
                <h3 className="text-lg font-semibold text-text-primary">
                  Average deployment time
                </h3>
                <p className="mt-2 text-sm text-text-secondary">
                  Measure average execution time per release.
                </p>
                <div className="mt-6 h-[200px]">
                  {loading ? (
                    <div className="h-full animate-pulse rounded-[28px] bg-dark-bg"></div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={metrics?.averageTime || []}
                        margin={{ top: 20, right: 10, left: 0, bottom: 0 }}
                      >
                        <XAxis
                          dataKey="label"
                          stroke="#A1A1AA"
                          tickLine={false}
                        />
                        <YAxis stroke="#A1A1AA" tickLine={false} />
                        <CartesianGrid strokeDasharray="3 3" stroke="#1A1333" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "#1A1333",
                            border: "1px solid #7C3AED",
                          }}
                          labelStyle={{ color: "#F9FAFB" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#7C3AED"
                          strokeWidth={3}
                          dot={{ r: 4, fill: "#F472B6" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Metrics;
