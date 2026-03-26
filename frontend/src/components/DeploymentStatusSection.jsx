import { useState } from "react";
import {
  Rocket,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Loader2,
} from "lucide-react";

const deploymentStatusData = {
  running: {
    count: 3,
    label: "Running",
    icon: Clock,
    color: "#F59E0B",
    bgColor: "from-devops-warning/20 to-amber-500/10",
  },
  success: {
    count: 24,
    label: "Success",
    icon: CheckCircle,
    color: "#8B5CF6",
    bgColor: "from-devops-purple/20 to-devops-purple-light/10",
  },
  failed: {
    count: 2,
    label: "Failed",
    icon: XCircle,
    color: "#EF4444",
    bgColor: "from-devops-error/20 to-red-500/10",
  },
};

const DeploymentStatusSection = ({ onNewDeployment }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNewDeployment = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onNewDeployment?.();
    }, 300);
  };

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-bold text-devops-text">
              Deployment Status
            </h2>
            <p className="text-devops-text-secondary mt-1">
              Overview of your deployment pipeline
            </p>
          </div>
          <button
            onClick={handleNewDeployment}
            disabled={isAnimating}
            className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-devops-purple to-devops-purple-light hover:from-devops-purple-light hover:to-devops-purple text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-devops-purple/20 hover:shadow-devops-purple/40 group ${isAnimating ? "scale-95" : ""}`}
          >
            {isAnimating ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
            )}
            New Deployment
          </button>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {Object.entries(deploymentStatusData).map(([key, status]) => {
            const Icon = status.icon;
            return (
              <div key={key} className="relative group">
                {/* Background Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${status.bgColor} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Card */}
                <div className="relative bg-devops-card rounded-2xl border border-devops-border p-6 hover:border-devops-purple/30 transition-all duration-300 cursor-pointer group-hover:-translate-y-1">
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${status.bgColor} border border-devops-border`}
                    >
                      <Icon
                        className="w-6 h-6"
                        style={{ color: status.color }}
                      />
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-devops-bg rounded-full text-devops-text-secondary">
                      Live
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="text-4xl font-bold text-devops-text">
                      {status.count}
                    </p>
                    <p className="text-devops-text-secondary text-sm mt-1">
                      {status.label}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4 h-1.5 bg-devops-bg rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${Math.min((status.count / 30) * 100, 100)}%`,
                        background: `linear-gradient(90deg, ${status.color}, ${status.color}88)`,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DeploymentStatusSection;
