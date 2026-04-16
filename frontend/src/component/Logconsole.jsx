import { useEffect, useMemo, useRef, useState } from "react";

const LogConsole = ({ logs }) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [autoScroll, setAutoScroll] = useState(true);
  const consoleRef = useRef(null);

  const filteredLogs = useMemo(() => {
    return logs.filter((log) => {
      const matchesSearch = search
        ? log.message.toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesFilter = filter === "all" ? true : log.level === filter;
      return matchesSearch && matchesFilter;
    });
  }, [logs, search, filter]);

  useEffect(() => {
    if (autoScroll && consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [filteredLogs, autoScroll]);

  const handleDownload = () => {
    const text = filteredLogs
      .map((log) => `[${log.level.toUpperCase()}] ${log.message}`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "deployment-logs.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">
            Live Log Stream
          </h2>
          <p className="text-sm text-text-secondary">
            Real-time deployment activity coming from the backend socket server.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDownload}
            className="rounded-3xl bg-accent px-5 py-3 text-sm font-semibold text-dark-bg transition hover:bg-accent-soft"
          >
            Download Logs
          </button>
          <button
            onClick={() => setAutoScroll((prev) => !prev)}
            className="rounded-3xl border border-soft bg-dark-bg px-5 py-3 text-sm text-text-primary transition hover:border-accent"
          >
            Auto-scroll: {autoScroll ? "On" : "Off"}
          </button>
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search logs"
          className="w-full rounded-3xl border border-soft bg-dark-bg px-4 py-3 text-sm text-text-primary outline-none focus:border-accent md:w-2/5"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-3xl border border-soft bg-dark-bg px-4 py-3 text-sm text-text-primary outline-none focus:border-accent md:w-1/4"
        >
          <option value="all">All levels</option>
          <option value="info">Info</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
          <option value="debug">Debug</option>
        </select>
      </div>
      <div
        ref={consoleRef}
        className="max-h-[520px] overflow-y-auto rounded-[28px] border border-soft bg-[#071E24] p-4 font-mono text-sm leading-6 text-text-secondary"
      >
        {filteredLogs.length === 0 ? (
          <p className="text-text-secondary">No logs available yet.</p>
        ) : (
          filteredLogs.map((log, index) => (
            <div key={`${log.id || index}-${index}`} className="mb-3 last:mb-0">
              <span className="mr-2 inline-block rounded-full bg-[#1D4F52] px-2 py-1 text-xs uppercase tracking-[0.15em] text-accent">
                {log.level || "info"}
              </span>
              <span className="text-text-primary">{log.message}</span>
              <div className="text-xs text-text-secondary">
                {new Date(log.timestamp || Date.now()).toLocaleTimeString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogConsole;
