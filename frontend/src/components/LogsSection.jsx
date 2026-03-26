import { useState, useEffect, useRef } from 'react';
import { Search, Filter, Terminal, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

const sampleLogs = [
  { level: 'info', timestamp: '19:04:32', message: 'Deployment initiated for api-service-v2.3.1' },
  { level: 'info', timestamp: '19:04:33', message: 'Cloning repository from GitHub...' },
  { level: 'success', timestamp: '19:04:45', message: 'Repository cloned successfully' },
  { level: 'info', timestamp: '19:04:46', message: 'Installing dependencies...' },
  { level: 'success', timestamp: '19:05:12', message: 'Dependencies installed (234 packages)' },
  { level: 'info', timestamp: '19:05:13', message: 'Running build command: npm run build' },
  { level: 'warning', timestamp: '19:05:28', message: 'Warning: Unused export in index.ts:15' },
  { level: 'success', timestamp: '19:05:35', message: 'Build completed successfully' },
  { level: 'info', timestamp: '19:05:36', message: 'Running tests...' },
  { level: 'success', timestamp: '19:05:52', message: 'All tests passed (24/24)' },
  { level: 'info', timestamp: '19:05:53', message: 'Deploying to production server...' },
  { level: 'success', timestamp: '19:06:15', message: 'Deployment completed successfully' },
];

const LogsSection = () => {
  const [logs] = useState(sampleLogs);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const logsContainerRef = useRef(null);

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.level === filter;
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getLevelIcon = (level) => {
    switch (level) {
      case 'success': return <CheckCircle className="w-4 h-4 text-devops-success" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-devops-warning" />;
      case 'error': return <XCircle className="w-4 h-4 text-devops-error" />;
      default: return <Info className="w-4 h-4 text-devops-highlight" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'success': return 'text-devops-success';
      case 'warning': return 'text-devops-warning';
      case 'error': return 'text-devops-error';
      default: return 'text-devops-highlight';
    }
  };

  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [filteredLogs]);

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-devops-card rounded-xl flex items-center justify-center">
              <Terminal className="w-5 h-5 text-devops-purple" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-devops-text">Deployment Logs</h2>
              <p className="text-devops-text-secondary text-sm">Real-time deployment output</p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-devops-text-secondary" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-devops-card border border-devops-border rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple transition-colors"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-devops-text-secondary" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2.5 bg-devops-card border border-devops-border rounded-xl text-devops-text focus:outline-none focus:border-devops-purple transition-colors"
            >
              <option value="all">All Levels</option>
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>
        </div>

        {/* Terminal Window */}
        <div className="bg-devops-bg rounded-2xl border border-devops-border overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-devops-card/50 border-b border-devops-border">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-devops-error rounded-full" />
              <div className="w-3 h-3 bg-devops-warning rounded-full" />
              <div className="w-3 h-3 bg-devops-purple rounded-full" />
            </div>
            <span className="text-devops-text-secondary text-xs font-mono">api-service-v2.3.1</span>
          </div>

          {/* Logs Container */}
          <div 
            ref={logsContainerRef}
            className="p-4 h-64 overflow-y-auto font-mono text-sm space-y-1"
          >
            {filteredLogs.map((log, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 py-1 hover:bg-devops-card/30 rounded px-2 -mx-2 transition-colors"
              >
                <span className="text-devops-text-secondary text-xs shrink-0 w-20">
                  {log.timestamp}
                </span>
                <span className="shrink-0 mt-0.5">
                  {getLevelIcon(log.level)}
                </span>
                <span className={`text-xs uppercase w-16 shrink-0 font-semibold ${getLevelColor(log.level)}`}>
                  {log.level}
                </span>
                <span className="text-devops-text">
                  {log.message}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogsSection;