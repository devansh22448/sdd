const StatusCard = ({ title, value, icon, color = "purple" }) => {
  const colorClasses = {
    purple: "text-devops-purple bg-devops-purple/10",
    yellow: "text-devops-warning bg-devops-warning/10",
    green: "text-devops-success bg-devops-success/10",
    red: "text-devops-error bg-devops-error/10",
  };

  return (
    <div className="bg-devops-card rounded-xl p-6 border border-devops-border hover:border-devops-purple/30 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-devops-text-secondary text-sm font-medium mb-1">{title}</p>
          <p className="text-3xl font-bold text-devops-text">{value}</p>
        </div>
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}
        >
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
