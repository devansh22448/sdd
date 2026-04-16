import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

const DeploymentDetails = () => {
  const { id } = useParams();
  const [deployment, setDeployment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeployment = async () => {
      try {
        const response = await api.get(`/deployments/${id}`);
        setDeployment(response.data || response.data?.deployment || null);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadDeployment();
  }, [id]);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="mx-auto grid max-w-[1400px] gap-6 px-6 py-8 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="space-y-6">
          <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
            <h2 className="text-xl font-semibold text-text-primary">
              Deployment details
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Deep dive into the selected release execution and logs.
            </p>
          </div>
          {loading ? (
            <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
              <p className="text-text-secondary">
                Fetching deployment details...
              </p>
            </div>
          ) : deployment ? (
            <div className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-3">
                <div className="rounded-[28px] border border-soft bg-dark-bg p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-highlight">
                    Status
                  </p>
                  <p className="mt-4 text-3xl font-semibold text-text-primary">
                    {deployment.status || "Unknown"}
                  </p>
                  <p className="mt-3 text-sm text-text-secondary">
                    Pipeline state for this deployment.
                  </p>
                </div>
                <div className="rounded-[28px] border border-soft bg-dark-bg p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-highlight">
                    Started
                  </p>
                  <p className="mt-4 text-2xl font-semibold text-text-primary">
                    {new Date(
                      deployment.createdAt ||
                        deployment.startedAt ||
                        Date.now(),
                    ).toLocaleString()}
                  </p>
                  <p className="mt-3 text-sm text-text-secondary">
                    Time when the job began.
                  </p>
                </div>
                <div className="rounded-[28px] border border-soft bg-dark-bg p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-highlight">
                    Duration
                  </p>
                  <p className="mt-4 text-2xl font-semibold text-text-primary">
                    {deployment.duration || "—"}
                  </p>
                  <p className="mt-3 text-sm text-text-secondary">
                    Total execution window.
                  </p>
                </div>
              </div>
              <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
                <h3 className="text-lg font-semibold text-text-primary">
                  Execution details
                </h3>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-soft bg-dark-bg p-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-highlight">
                      Project
                    </p>
                    <p className="mt-2 text-base font-medium text-text-primary">
                      {deployment.projectName || deployment.name || "Unknown"}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-soft bg-dark-bg p-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-highlight">
                      Environment
                    </p>
                    <p className="mt-2 text-base font-medium text-text-primary">
                      {deployment.environment || "Production"}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-soft bg-dark-bg p-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-highlight">
                      Branch
                    </p>
                    <p className="mt-2 text-base font-medium text-text-primary">
                      {deployment.branch || "main"}
                    </p>
                  </div>
                  <div className="rounded-3xl border border-soft bg-dark-bg p-4">
                    <p className="text-sm uppercase tracking-[0.25em] text-highlight">
                      Triggered by
                    </p>
                    <p className="mt-2 text-base font-medium text-text-primary">
                      {deployment.triggeredBy || "Automated"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
                <h3 className="text-lg font-semibold text-text-primary">
                  Terminal output
                </h3>
                <div className="mt-4 rounded-[28px] border border-soft bg-[#071E24] p-4 font-mono text-sm leading-6 text-text-secondary">
                  {deployment.logs && deployment.logs.length > 0 ? (
                    deployment.logs.map((line, index) => (
                      <p
                        key={index}
                        className="border-b border-[#122E35] py-2 last:border-none"
                      >
                        {line}
                      </p>
                    ))
                  ) : (
                    <p className="text-text-secondary">
                      No logs are available for this deployment.
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
              <p className="text-text-secondary">
                Deployment not found, or the backend returned no details.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DeploymentDetails;
