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
    <div className="bg-[#0F2E34] rounded-2xl border border-[#172A3A] overflow-hidden shadow-2xl">
      <div className="bg-[#172A3A] px-6 py-4 border-b border-[#172A3A]">
        <h3 className="text-lg font-semibold text-[#F7F9FA]">
          Depaloyment History
        </h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#172A3A]/50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#9FB3B6] uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#9FB3B6] uppercase tracking-wider">
                Version
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#9FB3B6] uppercase tracking-wider">
                Environment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#9FB3B6] uppercase tracking-wider">
                Start Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-[#9FB3B6] uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#172A3A]">
            {deploymentHistory.map((deployment, index) => (
              <tr
                key={index}
                className="hover:bg-[#172A3A]/30 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#F7F9FA]">
                  {deployment.service}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#F7F9FA]">
                  {deployment.version}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#F7F9FA]">
                  {deployment.environment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9FB3B6]">
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
