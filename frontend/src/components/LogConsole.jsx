import { useEffect, useRef } from "react";

const LogConsole = ({ logs, autoScroll = true }) => {
  const consoleRef = useRef(null);

  useEffect(() => {
    if (autoScroll && consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const getLogColor = (level) => {
    const colors = {
      info: "text-devops-purple",
      warn: "text-devops-warning",
      error: "text-devops-error",
      success: "text-devops-success",
    };
    return colors[level] || colors.info;
  };

  return (
    <div className="bg-devops-bg rounded-xl border border-devops-border overflow-hidden">
      <div className="bg-devops-card px-4 py-2 border-b border-devops-border flex justify-between items-center">
        <span className="text-sm font-medium text-devops-text-secondary">
          Terminal Output
        </span>
        <span className="text-xs text-devops-text-secondary">{logs.length} lines</span>
      </div>
      <div
        ref={consoleRef}
        className="p-4 h-96 overflow-y-auto terminal-font text-sm"
      >
        {logs.map((log, index) => (
          <div key={index} className="mb-1">
            <span className="text-devops-text-secondary">[{log.timestamp}]</span>{" "}
            <span className={`${getLogColor(log.level)}`}>{log.message}</span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-devops-text-secondary">No logs available</div>
        )}
      </div>
    </div>
  );
};

export default LogConsole;
