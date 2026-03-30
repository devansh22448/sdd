import LiveDeploymentLog from "../components/LiveDeploymentLog";
import DeploymentMetrics from "../components/DeploymentMetrics";
import DeploymentHistoryTable from "../components/DeploymentHistoryTable";

const Dashboard = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Top Row - 3 Status Cards */}
      <div className="grid grid-cols-3 gap-6">
        {/* Card 1 - Running */}
        <div className="bg-[#0F2E34] rounded-2xl p-6 border border-[#172A3A] shadow-2xl">
          <h3 className="text-sm font-medium text-[#9FB3B6] mb-2">
            Deployment Status:
          </h3>
          <p className="text-5xl font-bold text-[#FFD166]">12</p>
          <p className="text-sm text-[#9FB3B6] mt-2">Running</p>
        </div>

        {/* Card 2 - Success */}
        <div className="bg-[#0F2E34] rounded-2xl p-6 border border-[#172A3A] shadow-2xl">
          <h3 className="text-sm font-medium text-[#9FB3B6] mb-2">
            Depaloyment Status:
          </h3>
          <p className="text-5xl font-bold text-[#22c55e]">85</p>
          <p className="text-sm text-[#9FB3B6] mt-2">Success</p>
        </div>

        {/* Card 3 - Failed */}
        <div className="bg-[#0F2E34] rounded-2xl p-6 border border-[#172A3A] shadow-2xl">
          <h3 className="text-sm font-medium text-[#9FB3B6] mb-2">
            Depaloyment Status:
          </h3>
          <p className="text-5xl font-bold text-[#ef4444]">3</p>
          <p className="text-sm text-[#9FB3B6] mt-2">Failed</p>
        </div>
      </div>

      {/* Second Row - Log + Metrics */}
      <div className="grid grid-cols-2 gap-6">
        <LiveDeploymentLog />
        <DeploymentMetrics />
      </div>

      {/* Bottom Row - History Table */}
      <DeploymentHistoryTable />
    </div>
  );
};

export default Dashboard;
