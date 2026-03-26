import { useState } from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  ExternalLink,
} from "lucide-react";

const sampleHistory = [
  {
    id: "dep-001",
    project: "api-service",
    version: "v2.3.1",
    status: "success",
    environment: "production",
    triggeredBy: "john.doe@email.com",
    timestamp: "2026-03-26 19:06:15",
  },
  {
    id: "dep-002",
    project: "web-frontend",
    version: "v1.8.0",
    status: "running",
    environment: "staging",
    triggeredBy: "jane.smith@email.com",
    timestamp: "2026-03-26 18:45:32",
  },
  {
    id: "dep-003",
    project: "auth-service",
    version: "v3.1.2",
    status: "failed",
    environment: "production",
    triggeredBy: "devops@email.com",
    timestamp: "2026-03-26 17:30:45",
  },
  {
    id: "dep-004",
    project: "payment-gateway",
    version: "v1.2.0",
    status: "success",
    environment: "production",
    triggeredBy: "john.doe@email.com",
    timestamp: "2026-03-25 22:15:20",
  },
  {
    id: "dep-005",
    project: "notification-service",
    version: "v2.0.5",
    status: "success",
    environment: "development",
    triggeredBy: "jane.smith@email.com",
    timestamp: "2026-03-25 16:40:10",
  },
  {
    id: "dep-006",
    project: "analytics-dashboard",
    version: "v1.5.3",
    status: "failed",
    environment: "staging",
    triggeredBy: "devops@email.com",
    timestamp: "2026-03-25 14:20:55",
  },
  {
    id: "dep-007",
    project: "cache-service",
    version: "v3.0.0",
    status: "success",
    environment: "production",
    triggeredBy: "john.doe@email.com",
    timestamp: "2026-03-24 20:30:00",
  },
  {
    id: "dep-008",
    project: "api-gateway",
    version: "v4.1.2",
    status: "success",
    environment: "production",
    triggeredBy: "jane.smith@email.com",
    timestamp: "2026-03-24 15:45:30",
  },
];

const HistorySection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const filteredHistory = sampleHistory.filter((item) => {
    const matchesSearch =
      item.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-devops-success" />;
      case "failed":
        return <XCircle className="w-4 h-4 text-devops-error" />;
      case "running":
        return <Clock className="w-4 h-4 text-devops-warning" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      success: "bg-devops-success/10 text-devops-success border-devops-success/20",
      failed: "bg-devops-error/10 text-devops-error border-devops-error/20",
      running: "bg-devops-warning/10 text-devops-warning border-devops-warning/20",
    };
    return colors[status] || "";
  };

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-devops-card rounded-xl flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-devops-purple" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-devops-text">
                Deployment History
              </h2>
              <p className="text-devops-text-secondary text-sm">
                Recent deployment records
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-devops-text-secondary" />
            <input
              type="text"
              placeholder="Search by project or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-devops-card border border-devops-border rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple transition-colors"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-devops-text-secondary" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-devops-card border border-devops-border rounded-xl text-devops-text focus:outline-none focus:border-devops-purple transition-colors"
            >
              <option value="all">All Status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="running">Running</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-devops-card rounded-2xl border border-devops-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-devops-border">
                  <th className="text-left px-6 py-4 text-xs font-semibold text-devops-text-secondary uppercase tracking-wider">
                    Deployment ID
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-devops-text-secondary uppercase tracking-wider">
                    Project
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-devops-text-secondary uppercase tracking-wider">
                    Status
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-devops-text-secondary uppercase tracking-wider">
                    Environment
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-devops-text-secondary uppercase tracking-wider">
                    Triggered By
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-semibold text-devops-text-secondary uppercase tracking-wider">
                    Timestamp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-devops-border/50">
                {paginatedHistory.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-devops-bg/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-devops-purple-light font-mono text-sm">
                        {item.id}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <span className="text-devops-text font-medium">
                          {item.project}
                        </span>
                        <span className="text-devops-text-secondary text-sm ml-2">
                          {item.version}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusBadge(item.status)}`}
                      >
                        {getStatusIcon(item.status)}
                        {item.status.charAt(0).toUpperCase() +
                          item.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-devops-text-secondary text-sm capitalize">
                        {item.environment}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-devops-text-secondary text-sm">
                        {item.triggeredBy}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-devops-text-secondary text-sm font-mono">
                        {item.timestamp}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-devops-border">
            <p className="text-devops-text-secondary text-sm">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, filteredHistory.length)} of{" "}
              {filteredHistory.length} results
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 text-devops-text-secondary hover:text-devops-text hover:bg-devops-bg rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-devops-purple text-white"
                        : "text-devops-text-secondary hover:text-devops-text hover:bg-devops-bg"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 text-devops-text-secondary hover:text-devops-text hover:bg-devops-bg rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
