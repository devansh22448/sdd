import { useEffect, useState, useCallback } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { createSocket } from "../services/socket";

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    environment: "All",
    limit: 10,
  });

  // Modal State
  const [selectedLogId, setSelectedLogId] = useState(null);
  const [logDetails, setLogDetails] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [liveLogEntries, setLiveLogEntries] = useState([]);
  const [socket, setSocket] = useState(null);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await api.get("/logs", {
        params: { ...filters, page }
      });
      setLogs(response.data.data);
      setTotal(response.data.total);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch logs", error);
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  useEffect(() => {
    const s = createSocket();
    s.connect();
    setSocket(s);

    s.on("log", (message) => {
      // If we have a modal open and the incoming log matches the open deployment ID
      setLiveLogEntries((prev) => {
        return [...prev, message];
      });
    });

    s.on("statusUpdate", (update) => {
      setLogs((prev) => prev.map(log => log._id === update.deploymentId ? { ...log, status: update.status } : log));
      if (logDetails && logDetails._id === update.deploymentId) {
        setLogDetails(prev => ({ ...prev, status: update.status }));
      }
    });

    return () => {
      s.off("log");
      s.off("statusUpdate");
      s.disconnect();
    };
  }, []);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const openLogDetails = async (id) => {
    setSelectedLogId(id);
    setModalLoading(true);
    setLiveLogEntries([]);
    try {
      const resp = await api.get(`/logs/${id}`);
      setLogDetails(resp.data);
      setLiveLogEntries(resp.data.logs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setModalLoading(false);
    }
  };

  const closeLogDetails = () => {
    setSelectedLogId(null);
    setLogDetails(null);
    setLiveLogEntries([]);
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="mx-auto grid max-w-[1400px] gap-6 px-6 py-8 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="space-y-6">
          <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
            <h2 className="text-xl font-semibold text-text-primary">Deployment Logs</h2>
            <p className="mt-2 text-sm text-text-secondary">
              Search and filter historical deployment logs.
            </p>
            
            {/* Filter Bar */}
            <div className="mt-6 flex flex-wrap gap-4">
              <input
                type="text"
                name="search"
                placeholder="Search repo, message..."
                value={filters.search}
                onChange={handleFilterChange}
                className="rounded-xl border border-soft bg-dark-bg px-4 py-2 text-sm text-text-primary outline-none focus:border-primary"
              />
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="rounded-xl border border-soft bg-dark-bg px-4 py-2 text-sm text-text-primary outline-none focus:border-primary"
              >
                <option value="All">All Statuses</option>
                <option value="Success">Success</option>
                <option value="Failed">Failed</option>
                <option value="Running">Running</option>
                <option value="Pending">Pending</option>
              </select>
              <select
                name="environment"
                value={filters.environment}
                onChange={handleFilterChange}
                className="rounded-xl border border-soft bg-dark-bg px-4 py-2 text-sm text-text-primary outline-none focus:border-primary"
              >
                <option value="All">All Environments</option>
                <option value="development">Development</option>
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
            </div>
          </div>

          <div className="rounded-[32px] border border-soft bg-card-bg shadow-panel overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-text-secondary">
                <thead className="bg-[#1A1333] text-xs uppercase text-[#A1A1AA]">
                  <tr>
                    <th className="px-6 py-4">Deployment ID</th>
                    <th className="px-6 py-4">Repository</th>
                    <th className="px-6 py-4">Environment</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Time</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-text-secondary">Loading...</td>
                    </tr>
                  ) : logs.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-8 text-center text-text-secondary">No deployments found</td>
                    </tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log._id} className="border-b border-soft hover:bg-white/5">
                        <td className="px-6 py-4 font-mono text-xs">{log._id.substring(0, 8)}...</td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-text-primary">{log.project || 'Unknown'}</div>
                          <div className="text-xs">{log.branch || 'main'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-block rounded-full bg-[#1e1a3b] px-3 py-1 text-xs font-medium text-[#c0b5e5]">
                            {log.environment}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                            log.status === 'Success' ? 'bg-success/20 text-success' :
                            log.status === 'Failed' ? 'bg-error/20 text-error' :
                            log.status === 'Running' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-500'
                          }`}>
                            {log.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div>{new Date(log.createdAt).toLocaleString()}</div>
                          <div className="text-xs">{log.duration !== '-' ? log.duration : ''}</div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => openLogDetails(log._id)}
                            className="rounded-lg border border-soft px-3 py-1 text-xs font-semibold hover:bg-primary/20 hover:text-primary transition"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-soft px-6 py-4">
                <span className="text-sm text-text-secondary">
                  Showing {(page - 1) * filters.limit + 1} to {Math.min(page * filters.limit, total)} of {total}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="rounded-lg border border-soft px-3 py-1 text-xs font-semibold disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                    className="rounded-lg border border-soft px-3 py-1 text-xs font-semibold disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Log Details Modal */}
      {selectedLogId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeLogDetails} />
          <div className="relative z-10 flex h-[85vh] w-full max-w-5xl flex-col rounded-[32px] border border-soft bg-card-bg shadow-panel">
            <div className="flex items-center justify-between border-b border-soft px-6 py-4">
              <div>
                <h3 className="text-xl font-semibold text-text-primary">Deployment Output</h3>
                {logDetails && <p className="text-sm text-text-secondary">ID: {logDetails._id}</p>}
              </div>
              <button
                onClick={closeLogDetails}
                className="rounded-full p-2 text-text-secondary hover:bg-primary/20 hover:text-white transition"
              >
                ✕
              </button>
            </div>
            
            <div className="flex flex-1 overflow-hidden">
              {/* Metadata sidebar */}
              <div className="w-1/3 border-r border-soft bg-dark-bg p-6 overflow-y-auto">
                <h4 className="text-sm font-semibold uppercase text-text-secondary mb-4">Metadata</h4>
                {modalLoading || !logDetails ? ( <p className="text-text-secondary text-sm">Loading details...</p> ) : (
                  <div className="space-y-4 text-sm text-text-primary">
                    <div><span className="block text-text-secondary text-xs">Project</span>{logDetails.project}</div>
                    <div><span className="block text-text-secondary text-xs">Branch</span>{logDetails.branch || 'main'}</div>
                    <div><span className="block text-text-secondary text-xs">Environment</span>{logDetails.environment}</div>
                    <div><span className="block text-text-secondary text-xs">Status</span>{logDetails.status}</div>
                    <div><span className="block text-text-secondary text-xs">Started At</span>{new Date(logDetails.createdAt).toLocaleString()}</div>
                    <div><span className="block text-text-secondary text-xs">Duration</span>{logDetails.duration}</div>
                    {logDetails.deployMessage && <div><span className="block text-text-secondary text-xs">Message</span>{logDetails.deployMessage}</div>}
                  </div>
                )}
              </div>
              {/* Terminal window */}
              <div className="w-2/3 bg-black p-4 font-mono text-xs overflow-y-auto">
                {liveLogEntries.filter(l => !l.deploymentId || l.deploymentId === selectedLogId).map((entry, idx) => (
                  <div key={idx} className="mb-1 grid grid-cols-[80px_1fr] gap-4 hover:bg-white/5 transition-colors">
                    <span className="text-gray-500">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                    <span className={`break-words ${
                      entry.level === 'error' ? 'text-red-400' :
                      entry.level === 'success' ? 'text-green-400' :
                      'text-gray-300'
                    }`}>
                      {entry.message || entry.text}
                    </span>
                  </div>
                ))}
                {logDetails && logDetails.status === 'Running' && (
                  <div className="mt-4 flex items-center gap-2 text-blue-400">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400"></span>
                    <span>Tailing logs in real-time...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Logs;
