import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const statusColor = {
  success: "bg-success/20 text-success",
  failed: "bg-error/20 text-error",
  running: "bg-primary/20 text-primary",
  pending: "bg-warning/20 text-warning",
};

const DeploymentTable = ({ deployments }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filteredDeployments = useMemo(() => {
    return deployments
      .filter((item) => {
        if (filter === "all") return true;
        return item.status?.toLowerCase() === filter;
      })
      .filter((item) => {
        if (!search) return true;
        return (
          item.projectName?.toLowerCase().includes(search.toLowerCase()) ||
          item._id?.toLowerCase().includes(search.toLowerCase())
        );
      });
  }, [deployments, filter, search]);

  return (
    <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-text-primary">
            Deployment History
          </h2>
          <p className="text-sm text-text-secondary">
            Filter by status and project name.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search deployments"
            className="min-w-[220px] rounded-3xl border border-soft bg-dark-bg px-4 py-3 text-sm text-text-primary outline-none transition focus:border-primary"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-3xl border border-soft bg-dark-bg px-4 py-3 text-sm text-text-primary outline-none transition focus:border-primary"
          >
            <option value="all">All Statuses</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="running">Running</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto rounded-[28px] border border-soft">
        <table className="min-w-full border-collapse text-left text-sm">
          <thead className="bg-dark-bg text-text-secondary">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Project</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Started</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredDeployments.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-10 text-center text-text-secondary"
                >
                  No deployments match the current filter.
                </td>
              </tr>
            ) : (
              filteredDeployments.map((deployment) => {
                const key = deployment._id || deployment.id;
                const statusClass =
                  statusColor[deployment.status?.toLowerCase()] ||
                  "bg-text-secondary/10 text-text-primary";
                return (
                  <tr
                    key={key}
                    className="border-t border-soft transition hover:bg-primary/5"
                  >
                    <td className="px-6 py-4 text-text-secondary">
                      {key?.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 font-medium text-text-primary">
                      {deployment.projectName || deployment.name || "Unknown"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusClass}`}
                      >
                        {deployment.status || "unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {new Date(
                        deployment.createdAt ||
                          deployment.startedAt ||
                          Date.now(),
                      ).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-text-secondary">
                      {deployment.duration || deployment.time || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/deployments/${key}`}
                        className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-light-purple hover:shadow-glow"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeploymentTable;
