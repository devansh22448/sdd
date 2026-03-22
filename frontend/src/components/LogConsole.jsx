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
      info: "text-[#3AAFA9]",
      warn: "text-[#FFD166]",
      error: "text-[#E63946]",
      debug: "text-[#9FB3B6]",
    };
    return colors[level] || colors.info;
  };

  return (
    <div className="bg-[#0A2328] rounded-xl border border-[#172A3A] overflow-hidden">
      <div className="bg-[#172A3A] px-4 py-2 border-b border-[#172A3A] flex justify-between items-center">
        <span className="text-sm font-medium text-[#9FB3B6]">
          Terminal Output
        </span>
        <span className="text-xs text-[#9FB3B6]">{logs.length} lines</span>
      </div>
      <div
        ref={consoleRef}
        className="p-4 h-96 overflow-y-auto terminal-font text-sm"
      >
        {logs.map((log, index) => (
          <div key={index} className="mb-1">
            <span className="text-[#9FB3B6]">[{log.timestamp}]</span>{" "}
            <span className={`${getLogColor(log.level)}`}>{log.message}</span>
          </div>
        ))}
        {logs.length === 0 && (
          <div className="text-[#9FB3B6]">No logs available</div>
        )}
      </div>
    </div>
  );
};

export default LogConsole;
