import { Link } from "react-router-dom";

const DeploymentTable = ({ deployments }) => {
  const getStatusBadge = (status) => {
    const statusClasses = {
      success: "bg-devops-success/20 text-devops-success border-devops-success/30",
      failed: "bg-devops-error/20 text-devops-error border-devops-error/30",
      pending: "bg-devops-warning/20 text-devops-warning border-devops-warning/30",
      running: "bg-devops-purple/20 text-devops-purple border-devops-purple/30",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${statusClasses[status] || statusClasses.pending}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-devops-card rounded-xl border border-devops-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-devops-bg">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-devops-text-secondary uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-devops-text-secondary uppercase tracking-wider">
                Project
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-devops-text-secondary uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-devops-text-secondary uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-devops-text-secondary uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-devops-text-secondary uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-devops-border">
            {deployments.map((deployment) => (
              <tr
                key={deployment.id}
                className="hover:bg-devops-bg/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-devops-text">
                  #{deployment.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-devops-text font-medium">
                  {deployment.project}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(deployment.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-devops-text-secondary">
                  {deployment.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-devops-text-secondary">
                  {deployment.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/deployments/${deployment.id}`}
                    className="text-devops-purple hover:text-devops-purple-light text-sm font-medium transition-colors"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeploymentTable;
