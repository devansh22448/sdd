import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LogConsole from '../components/LogConsole';

const DeploymentDetails = () => {
  const { id } = useParams();
  const [deployment, setDeployment] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchDeployment = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setDeployment({
          id: parseInt(id),
          project: 'Frontend App',
          status: 'success',
          duration: '3m 24s',
          startedAt: '2024-01-15 10:30:00',
          completedAt: '2024-01-15 10:33:24',
        });

        setLogs([
          { timestamp: '10:30:00', level: 'info', message: 'Starting deployment process...' },
          { timestamp: '10:30:01', level: 'info', message: 'Cloning repository...' },
          { timestamp: '10:30:15', level: 'info', message: 'Installing dependencies...' },
          { timestamp: '10:31:00', level: 'info', message: 'Running build process...' },
          { timestamp: '10:32:30', level: 'info', message: 'Build completed successfully' },
          { timestamp: '10:32:45', level: 'info', message: 'Running tests...' },
          { timestamp: '10:33:10', level: 'info', message: 'All tests passed' },
          { timestamp: '10:33:20', level: 'info', message: 'Deploying to production...' },
          { timestamp: '10:33:24', level: 'info', message: 'Deployment completed successfully!' },
        ]);
      } catch (error) {
        console.error('Error fetching deployment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeployment();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-devops-purple">Loading...</div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const statusClasses = {
      success: 'bg-devops-success/20 text-devops-success border-devops-success/30',
      failed: 'bg-devops-error/20 text-devops-error border-devops-error/30',
      pending: 'bg-devops-warning/20 text-devops-warning border-devops-warning/30',
      running: 'bg-devops-purple/20 text-devops-purple border-devops-purple/30',
    };

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <Link to="/deployments" className="text-devops-purple hover:text-devops-purple-light text-sm">
          ← Back to Deployments
        </Link>
      </div>

      {/* Deployment Info */}
      <div className="bg-devops-card rounded-xl border border-devops-border p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-devops-text">
              Deployment #{deployment?.id}
            </h1>
            <p className="text-devops-text-secondary mt-1">{deployment?.project}</p>
          </div>
          {getStatusBadge(deployment?.status)}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-devops-text-secondary text-sm">Duration</p>
            <p className="text-devops-text font-medium">{deployment?.duration}</p>
          </div>
          <div>
            <p className="text-devops-text-secondary text-sm">Started</p>
            <p className="text-devops-text font-medium">{deployment?.startedAt}</p>
          </div>
          <div>
            <p className="text-devops-text-secondary text-sm">Completed</p>
            <p className="text-devops-text font-medium">{deployment?.completedAt}</p>
          </div>
          <div>
            <p className="text-devops-text-secondary text-sm">Environment</p>
            <p className="text-devops-text font-medium">Production</p>
          </div>
        </div>
      </div>

      {/* Logs */}
      <LogConsole logs={logs} />
    </div>
  );
};

export default DeploymentDetails;
