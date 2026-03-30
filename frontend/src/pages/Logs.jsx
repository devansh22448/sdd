import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import LogConsole from '../components/LogConsole';

const Logs = () => {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { connected } = useContext(SocketContext);

  useEffect(() => {
    // Simulate real-time log updates
    const mockLogs = [
      { timestamp: '10:30:00', level: 'info', message: 'Deployment started for project frontend-app' },
      { timestamp: '10:30:01', level: 'info', message: 'Cloning repository from GitHub' },
      { timestamp: '10:30:15', level: 'info', message: 'Installing npm dependencies' },
      { timestamp: '10:31:00', level: 'warn', message: 'Package.json has deprecated dependencies' },
      { timestamp: '10:31:30', level: 'info', message: 'Running build process' },
      { timestamp: '10:32:30', level: 'info', message: 'Build completed successfully' },
      { timestamp: '10:32:45', level: 'info', message: 'Running unit tests' },
      { timestamp: '10:33:00', level: 'info', message: 'All 42 tests passed' },
      { timestamp: '10:33:10', level: 'info', message: 'Running integration tests' },
      { timestamp: '10:33:20', level: 'error', message: 'Integration test failed: API timeout' },
      { timestamp: '10:33:25', level: 'warn', message: 'Retrying failed test...' },
      { timestamp: '10:33:30', level: 'info', message: 'Retry successful' },
      { timestamp: '10:33:40', level: 'info', message: 'Building Docker image' },
      { timestamp: '10:34:00', level: 'info', message: 'Pushing image to registry' },
      { timestamp: '10:34:30', level: 'info', message: 'Deploying to production environment' },
      { timestamp: '10:35:00', level: 'info', message: 'Health check passed' },
      { timestamp: '10:35:05', level: 'info', message: 'Deployment completed successfully' },
    ];

    setLogs(mockLogs);

    // Simulate real-time updates
    const interval = setInterval(() => {
      const newLog = {
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        level: ['info', 'warn', 'error'][Math.floor(Math.random() * 3)],
        message: `Real-time log update ${Date.now()}`,
      };
      setLogs(prev => [...prev, newLog]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.level === filter;
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const downloadLogs = () => {
    const logText = filteredLogs.map(log => `[${log.timestamp}] [${log.level.toUpperCase()}] ${log.message}`).join('\n');
    const blob = new Blob([logText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${new Date().toISOString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#F7F9FA]">Logs</h1>
          <p className="text-[#9FB3B6] mt-1">Real-time deployment logs</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-[#2ECC71]' : 'bg-[#E63946]'}`}></div>
            <span className="text-sm text-[#9FB3B6]">{connected ? 'Connected' : 'Disconnected'}</span>
          </div>
          <button
            onClick={downloadLogs}
            className="px-4 py-2 bg-[#3AAFA9] hover:bg-[#66D2C7] text-white rounded-xl font-medium transition-colors"
          >
            Download Logs
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-[#0F2E34] rounded-xl border border-[#172A3A] p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-[#172A3A] border border-[#172A3A] rounded-lg text-[#F7F9FA] placeholder-[#9FB3B6] focus:outline-none focus:border-[#3AAFA9]"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'info', 'warn', 'error'].map((level) => (
              <button
                key={level}
                onClick={() => setFilter(level)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === level
                    ? 'bg-[#3AAFA9] text-white'
                    : 'bg-[#172A3A] text-[#9FB3B6] hover:text-[#F7F9FA]'
                }`}
              >
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Log Console */}
      <LogConsole logs={filteredLogs} autoScroll={true} />
    </div>
  );
};

export default Logs;
