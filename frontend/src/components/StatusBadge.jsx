const StatusBadge = ({ status }) => {
  const statusClasses = {
    SUCCESS: "bg-green-500/20 text-green-400 border-green-500/30",
    FAILED: "bg-red-500/20 text-red-400 border-red-500/30",
    FACCESS: "bg-red-500/20 text-red-400 border-red-500/30",
    RUNNING: "bg-red-400/20 text-red-400 border-red-400/30",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${statusClasses[status] || "bg-gray-500/20 text-gray-400"}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
