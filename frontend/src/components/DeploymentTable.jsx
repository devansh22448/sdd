import { Link } from "react-router-dom";

const DeploymentTable = ({ deployments }) => {
  const getStatusBadge = (status) => {
    // Database se aane wale status ko pehle lowercase kar lenge taaki colors match ho jayein
    const normalizedStatus = status ? status.toLowerCase() : 'pending';

    const statusClasses = {
      success: "bg-[#2ECC71]/20 text-[#2ECC71] border-[#2ECC71]/30",
      failed: "bg-[#E63946]/20 text-[#E63946] border-[#E63946]/30",
      pending: "bg-[#FFD166]/20 text-[#FFD166] border-[#FFD166]/30",
      running: "bg-[#3AAFA9]/20 text-[#3AAFA9] border-[#3AAFA9]/30",
    };

    const appliedClass = statusClasses[normalizedStatus] || statusClasses.pending;

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium border ${appliedClass}`}
      >
        {status} {/* Asli status print hoga (e.g. "Success") */}
      </span>
    );
  };

  return (
    <div className="bg-[#0F2E34] rounded-xl border border-[#172A3A] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#172A3A]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#9FB3B6] uppercase tracking-wider">ID</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#9FB3B6] uppercase tracking-wider">Project</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#9FB3B6] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#9FB3B6] uppercase tracking-wider">Time</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#9FB3B6] uppercase tracking-wider">Duration</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-[#9FB3B6] uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#172A3A]">
            {deployments.map((deployment) => (
              <tr
                key={deployment._id} // ID ki jagah _id
                className="hover:bg-[#172A3A]/50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#F7F9FA]">
                  #{deployment._id.slice(-6)} {/* MongoDB ID ke last 6 characters */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#F7F9FA] font-medium">
                  {deployment.project}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(deployment.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9FB3B6]">
                  {/* Database timestamp ko human-readable date/time banaya */}
                  {new Date(deployment.createdAt).toLocaleString()} 
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#9FB3B6]">
                  {deployment.duration}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/deployments/${deployment._id}`} // URL parameter mein _id pass kiya
                    className="text-[#3AAFA9] hover:text-[#66D2C7] text-sm font-medium transition-colors"
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