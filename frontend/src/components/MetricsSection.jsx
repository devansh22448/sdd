import {
  Cpu,
  HardDrive,
  Clock,
  Activity,
  Zap,
  Server,
  TrendingUp,
} from "lucide-react";

const metricsData = [
  {
    label: "CPU Usage",
    value: "23%",
    icon: Cpu,
    color: "#8B5CF6",
    trend: "-5%",
    trendUp: false,
  },
  {
    label: "Memory",
    value: "1.2 GB",
    icon: HardDrive,
    color: "#F59E0B",
    trend: "+8%",
    trendUp: true,
  },
  {
    label: "Build Time",
    value: "2m 15s",
    icon: Clock,
    color: "#A78BFA",
    trend: "-12%",
    trendUp: false,
  },
  {
    label: "Active Pods",
    value: "12",
    icon: Server,
    color: "#8B5CF6",
    trend: "+2",
    trendUp: true,
  },
  {
    label: "Uptime",
    value: "99.9%",
    icon: Activity,
    color: "#8B5CF6",
    trend: "Stable",
    trendUp: false,
  },
  {
    label: "Deployments",
    value: "29",
    icon: Zap,
    color: "#F59E0B",
    trend: "+5",
    trendUp: true,
  },
];

const MetricsSection = () => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-devops-card rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-devops-purple" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-devops-text">
              Deployment Metrics
            </h2>
            <p className="text-devops-text-secondary text-sm">
              System performance and statistics
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metricsData.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <div
                key={index}
                className="group relative bg-devops-card rounded-2xl border border-devops-border p-4 hover:border-devops-purple/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Glow Effect */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${metric.color}10 0%, transparent 70%)`,
                  }}
                />

                <div className="relative">
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${metric.color}20` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: metric.color }} />
                  </div>

                  {/* Value */}
                  <p className="text-2xl font-bold text-devops-text">
                    {metric.value}
                  </p>

                  {/* Label */}
                  <p className="text-devops-text-secondary text-sm mt-1">{metric.label}</p>

                  {/* Trend */}
                  <div
                    className={`flex items-center gap-1 mt-2 text-xs font-medium ${
                      metric.trendUp
                        ? "text-devops-error"
                        : metric.trend === "Stable"
                          ? "text-devops-purple"
                          : "text-devops-purple"
                    }`}
                  >
                    {metric.trend !== "Stable" && (
                      <span className={metric.trendUp ? "" : "rotate-180"}>
                        →
                      </span>
                    )}
                    {metric.trend}
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

export default MetricsSection;
