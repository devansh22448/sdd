const StatusCard = ({ title, value, action, accent }) => {
  const colorClasses = {
    primary: "bg-primary/20 text-primary",
    success: "bg-success/20 text-success",
    error: "bg-error/20 text-error",
    warning: "bg-warning/20 text-warning",
  };

  return (
    <div className="rounded-[28px] border border-soft bg-card-bg p-6 shadow-panel transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-glow">
      <p className="text-sm uppercase tracking-[0.3em] text-light-purple">
        {title}
      </p>
      <div className="mt-4 flex items-end justify-between gap-4">
        <div>
          <p className="text-4xl font-semibold text-text-primary">{value}</p>
          {action && (
            <p className="mt-2 text-sm text-text-secondary">{action}</p>
          )}
        </div>
        <span
          className={`inline-flex h-12 w-12 items-center justify-center rounded-3xl ${colorClasses[accent] || "bg-primary/20 text-primary"}`}
        />
      </div>
    </div>
  );
};

export default StatusCard;
