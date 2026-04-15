import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import LogConsole from "../components/LogConsole";
import { createSocket } from "../services/socket";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socket = createSocket();
    socket.connect();

    socket.on("connect", () => setConnected(true));
    socket.on("disconnect", () => setConnected(false));

    socket.on("log", (message) => {
      setLogs((prev) => [
        ...prev,
        {
          level: "info",
          message: message.text || message,
          timestamp: new Date().toISOString(),
        },
      ]);
    });

    socket.on("deploymentLog", (message) => {
      setLogs((prev) => [
        ...prev,
        {
          level: message.level || "info",
          message: message.text || message.message || message,
          timestamp: message.timestamp || new Date().toISOString(),
        },
      ]);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("log");
      socket.off("deploymentLog");
      socket.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="mx-auto grid max-w-[1400px] gap-6 px-6 py-8 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="space-y-6">
          <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-text-primary">
                  Live logs
                </h2>
                <p className="mt-2 text-sm text-text-secondary">
                  {connected
                    ? "Connected to backend socket server."
                    : "Connecting to socket server..."}
                </p>
              </div>
              <span
                className={`rounded-3xl px-4 py-2 text-sm font-semibold ${connected ? "bg-success/20 text-success" : "bg-error/20 text-error"}`}
              >
                {connected ? "Online" : "Offline"}
              </span>
            </div>
          </div>
          <LogConsole logs={logs} />
        </main>
      </div>
    </div>
  );
};

export default Logs;
