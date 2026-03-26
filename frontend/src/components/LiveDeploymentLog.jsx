import { useState, useEffect, useRef } from 'react';

const initialLogs = [
  { time: '10:30:15', level: 'INFO', message: 'Starting deployment process...' },
  { time: '10:30:16', level: 'INFO', message: 'Initializing Docker container...' },
  { time: '10:30:18', level: 'SUCCESS', message: 'Container initialized successfully' },
  { time: '10:30:20', level: 'INFO', message: 'Pulling latest images from registry...' },
  { time: '10:30:25', level: 'SUCCESS', message: 'Images pulled successfully' },
  { time: '10:30:28', level: 'INFO', message: 'Running pre-deployment checks...' },
  { time: '10:30:30', level: 'SUCCESS', message: 'All pre-deployment checks passed' },
  { time: '10:30:35', level: 'INFO', message: 'Starting application deployment...' },
  { time: '10:30:40', level: 'SUCCESS', message: 'Application deployed successfully' },
  { time: '10:30:42', level: 'INFO', message: 'Running health checks...' },
  { time: '10:30:45', level: 'SUCCESS', message: 'Health check passed - all systems operational' },
];

const LiveDeploymentLog = () => {
  const [logs, setLogs] = useState(initialLogs);
  const consoleRef = useRef(null);

  useEffect(() => {
    // Simulate live incoming logs
    const interval = setInterval(() => {
      const newLog = {
        time: new Date().toLocaleTimeString('en-US', { hour12: false }),
        level: ['INFO', 'SUCCESS', 'ERROR', 'WARNING'][Math.floor(Math.random() * 4)],
        message: `Processing deployment event ${Date.now()}`,
      };
      setLogs(prev => [...prev.slice(-20), newLog]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const getLevelColor = (level) => {
    const colors = {
      INFO: 'text-devops-highlight',
      SUCCESS: 'text-devops-success',
      ERROR: 'text-devops-error',
      WARNING: 'text-devops-warning',
    };
    return colors[level] || 'text-devops-text-secondary';
  };

  return (
    <div className="bg-devops-card rounded-2xl border border-devops-border overflow-hidden shadow-2xl">
      <div className="bg-devops-bg px-6 py-4 border-b border-devops-border">
        <h3 className="text-lg font-semibold text-devops-text">Live Deployment Log</h3>
      </div>
      <div 
        ref={consoleRef}
        className="p-4 h-72 overflow-y-auto bg-devops-bg font-mono text-sm"
      >
        {logs.map((log, index) => (
          <div key={index} className="mb-1 flex gap-3">
            <span className="text-devops-text-secondary shrink-0">[{log.time}]</span>
            <span className={`shrink-0 w-16 ${getLevelColor(log.level)}`}>{log.level}</span>
            <span className="text-devops-text">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveDeploymentLog;
