import { Link } from "react-router-dom";
import {
  Rocket,
  FileText,
  ArrowRight,
  Activity,
  Server,
  Shield,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-devops-purple/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-devops-purple-light/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-devops-purple/5 to-transparent rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-devops-card/50 backdrop-blur-sm rounded-full border border-devops-purple/20">
              <Activity className="w-4 h-4 text-devops-purple" />
              <span className="text-devops-purple-light text-sm font-medium">
                Production Ready
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-devops-text leading-tight">
              Smart DevOps Dashboard
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-devops-text-secondary leading-relaxed max-w-xl">
              Monitor your deployments, logs, metrics, history, and
              infrastructure in real-time. Experience seamless DevOps automation
              with powerful insights and analytics.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/deployments"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-devops-purple to-devops-purple-light hover:from-devops-purple-light hover:to-devops-purple text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-devops-purple/20 hover:shadow-devops-purple/40 group"
              >
                <Rocket className="w-5 h-5" />
                Start Deployment
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/logs"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-devops-card hover:bg-devops-bg text-devops-text font-semibold rounded-xl border border-devops-border hover:border-devops-purple/30 transition-all duration-300 group"
              >
                <FileText className="w-5 h-5 text-devops-purple" />
                View Logs
                <ArrowRight className="w-4 h-4 text-devops-text-secondary group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats Row */}
            <div className="flex flex-wrap gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-devops-purple rounded-full animate-pulse" />
                <span className="text-devops-text font-semibold">99.9%</span>
                <span className="text-devops-text-secondary text-sm">Uptime</span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-devops-purple-light" />
                <span className="text-devops-text font-semibold">50+</span>
                <span className="text-devops-text-secondary text-sm">Deployments</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-devops-warning" />
                <span className="text-devops-text font-semibold">Secure</span>
                <span className="text-devops-text-secondary text-sm">Environment</span>
              </div>
            </div>
          </div>

          {/* Right Side - Dashboard Preview Card */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-r from-devops-purple/20 to-devops-purple-light/20 blur-2xl rounded-3xl" />
            <div className="relative bg-devops-card rounded-2xl border border-devops-border p-6 shadow-2xl">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-devops-purple to-devops-purple-light rounded-xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-devops-text font-semibold">
                      Live Metrics
                    </h3>
                    <p className="text-devops-text-secondary text-xs">
                      Real-time monitoring
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-devops-purple rounded-full animate-pulse" />
                  <span className="text-devops-purple text-xs font-medium">
                    Live
                  </span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-devops-bg/50 rounded-xl p-4 border border-devops-border">
                  <p className="text-devops-text-secondary text-xs mb-1">CPU Usage</p>
                  <p className="text-devops-text text-2xl font-bold">23%</p>
                  <div className="mt-2 h-1 bg-devops-bg rounded-full overflow-hidden">
                    <div className="h-full w-[23%] bg-gradient-to-r from-devops-purple to-devops-purple-light rounded-full" />
                  </div>
                </div>
                <div className="bg-devops-bg/50 rounded-xl p-4 border border-devops-border">
                  <p className="text-devops-text-secondary text-xs mb-1">Memory</p>
                  <p className="text-devops-text text-2xl font-bold">1.2GB</p>
                  <div className="mt-2 h-1 bg-devops-bg rounded-full overflow-hidden">
                    <div className="h-full w-[45%] bg-gradient-to-r from-devops-warning to-amber-500 rounded-full" />
                  </div>
                </div>
                <div className="bg-devops-bg/50 rounded-xl p-4 border border-devops-border">
                  <p className="text-devops-text-secondary text-xs mb-1">Active Pods</p>
                  <p className="text-devops-text text-2xl font-bold">12</p>
                  <p className="text-devops-purple text-xs mt-1">● Healthy</p>
                </div>
                <div className="bg-devops-bg/50 rounded-xl p-4 border border-devops-border">
                  <p className="text-devops-text-secondary text-xs mb-1">Build Time</p>
                  <p className="text-devops-text text-2xl font-bold">2m</p>
                  <p className="text-devops-text-secondary text-xs mt-1">Avg: 3.2m</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="border-t border-devops-border pt-4">
                <p className="text-devops-text-secondary text-xs mb-3">
                  Recent Deployments
                </p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-devops-text">api-service-v2.3.1</span>
                    <span className="text-devops-success">● Success</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-devops-text">web-frontend-v1.8.0</span>
                    <span className="text-devops-warning">● Running</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-devops-text">auth-service-v3.1.2</span>
                    <span className="text-devops-error">● Failed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
