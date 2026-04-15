import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import StatusCard from "../components/StatusCard";
import api from "../services/api";

const Dashboard = () => {
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const response = await api.get("/deployments/summary");
        setSummary(response.data || {});
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadSummary();
  }, []);

  const cards = [
    {
      title: "Total Deployments",
      value: summary.totalDeployments || 0,
      action: "Deployment volume this month",
      accent: "primary",
    },
    {
      title: "Success Rate",
      value: `${summary.successRate || 0}%`,
      action: "Stable release performance",
      accent: "success",
    },
    {
      title: "Failed Builds",
      value: summary.failedBuilds || 0,
      action: "Requires investigation",
      accent: "error",
    },
    {
      title: "Running Jobs",
      value: summary.runningJobs || 0,
      action: "Active pipelines right now",
      accent: "primary",
    },
  ];

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="mx-auto grid max-w-[1400px] gap-6 px-6 py-8 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="space-y-6">
          <section className="grid gap-6 xl:grid-cols-4">
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-40 animate-pulse rounded-[28px] bg-card-bg"
                  ></div>
                ))
              : cards.map((card) => <StatusCard key={card.title} {...card} />)}
          </section>
          <section className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-primary">
                  Insights
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-text-primary">
                  Delivery performance overview
                </h2>
              </div>
              <p className="max-w-xl text-sm text-text-secondary">
                Track release health across deployments, logs, and metrics with
                real-time backend integration.
              </p>
            </div>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-[28px] border border-soft bg-dark-bg p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">
                  Recent build accord
                </p>
                <p className="mt-4 text-4xl font-semibold text-text-primary">
                  {summary.latestDeployment?.projectName || "No recent data"}
                </p>
                <p className="mt-3 text-sm text-text-secondary">
                  Status: {summary.latestDeployment?.status || "—"}
                </p>
              </div>
              <div className="rounded-[28px] border border-soft bg-dark-bg p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-primary">
                  Next scheduled pipeline
                </p>
                <p className="mt-4 text-4xl font-semibold text-text-primary">
                  {summary.nextRun || "No schedule set"}
                </p>
                <p className="mt-3 text-sm text-text-secondary">
                  Estimated deployment window
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
