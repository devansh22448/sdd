const StatusBadge = ({ status }) => {
  const statusClasses = {
    SUCCESS: "bg-devops-success/20 text-devops-success border-devops-success/30",
    FAILED: "bg-devops-error/20 text-devops-error border-devops-error/30",
    RUNNING: "bg-devops-purple/20 text-devops-purple border-devops-purple/30",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium border ${statusClasses[status] || "bg-devops-text-secondary/20 text-devops-text-secondary"}`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
