import StatusBadge from "./StatusBadge";

const deploymentHistory = [
  {
    service: "Service",
    version: "v1.2",
    environment: "production",
    time: "2024-7-26 10:30",
    status: "SUCCESS",
  },
  {
    service: "frentand",
    version: "v1.2",
    environment: "production",
    time: "2024-7-26 10:30",
    status: "SUCCESS",
  },
  {
    service: "backend",
    version: "v0.8",
    environment: "staging",
    time: "2024-7-26 09:15",
    status: "FACCESS",
  },
  {
    service: "database",
    version: "v2.1",
    environment: "development",
    time: "2024-7-26 08:00",
    status: "RUNNING",
  },
];

const DeploymentHistoryTable = () => {
  return (
    <div className="bg-devops-card rounded-2xl border border-devops-border overflow-hidden shadow-2xl h-full">
      <div className="bg-devops-bg px-6 py-4 border-b border-devops-border">
        <h3 className="text-lg font-semibold text-devops-text">
          Depaloyment History
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-devops-bg/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-devops-text-secondary uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-devops-text-secondary uppercase tracking-wider">
                Version
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-devops-text-secondary uppercase tracking-wider">
                Environment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-devops-text-secondary uppercase tracking-wider">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-devops-text-secondary uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-devops-border">
            {deploymentHistory.map((deployment, index) => (
              <tr
                key={index}
                className="hover:bg-devops-bg/30 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-devops-text">
                  {deployment.service}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-devops-text">
                  {deployment.version}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-devops-text">
                  {deployment.environment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-devops-text-secondary">
                  {deployment.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={deployment.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeploymentHistoryTable;
