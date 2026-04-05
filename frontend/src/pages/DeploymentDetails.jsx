import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import LogConsole from '../components/LogConsole';

const DeploymentDetails = () => {
  const { id } = useParams(); 
  const [deployment, setDeployment] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Fetch current deployment details and OLD LOGS from backend
    const fetchDeploymentDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/deployments/${id}`);
        setDeployment(response.data);
        
        // 👇 YEH NAYA BLOCK HAI: Database wale purane logs ko screen par dikhane ke liye
        if (response.data.logs && response.data.logs.length > 0) {
          const formattedLogs = response.data.logs.map(log => ({
            timestamp: new Date(log.timestamp).toLocaleTimeString(),
            level: log.level || (log.message.includes('[ERROR]') ? 'error' : 'info'),
            message: log.message
          }));
          setLogs(formattedLogs);
        }

      } catch (error) {
        console.error('Error fetching deployment details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeploymentDetails();

    // 2. Setup Socket.io for LIVE logs (Naye logs ke liye)
    const socket = io('http://localhost:5000');

    socket.on('log', (data) => {
      if (data.deploymentId === id) {
        setLogs((prevLogs) => [
          ...prevLogs,
          { 
            timestamp: new Date().toLocaleTimeString(), 
            level: data.level || (data.message.includes('[ERROR]') ? 'error' : 'info'), 
            message: data.message 
          }
        ]);
      }
    });

    socket.on('statusUpdate', (data) => {
      if (data.deploymentId === id) {
        setDeployment((prev) => ({ ...prev, status: data.status, duration: data.duration || prev?.duration || '5s' }));
      }
    });

    return () => socket.disconnect();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#3AAFA9]">Loading Details...</div>
      </div>
    );
  }

  if (!deployment) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="text-red-500 mb-4">Deployment not found.</div>
        <Link to="/deployments" className="text-[#3AAFA9] hover:underline">Go Back</Link>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const normalizedStatus = status ? status.toLowerCase() : 'pending';
    const statusClasses = {
      success: 'bg-[#2ECC71]/20 text-[#2ECC71] border-[#2ECC71]/30',
      failed: 'bg-[#E63946]/20 text-[#E63946] border-[#E63946]/30',
      pending: 'bg-[#FFD166]/20 text-[#FFD166] border-[#FFD166]/30',
      running: 'bg-[#3AAFA9]/20 text-[#3AAFA9] border-[#3AAFA9]/30',
    };

    const appliedClass = statusClasses[normalizedStatus] || statusClasses.pending;

    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${appliedClass}`}>
        {status}
      </span>
    );
  };

  return (
    <div>
      <div className="mb-6">
        <Link to="/deployments" className="text-[#3AAFA9] hover:text-[#66D2C7] text-sm">
          ← Back to Deployments
        </Link>
      </div>

      <div className="bg-[#0F2E34] rounded-xl border border-[#172A3A] p-6 mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#F7F9FA]">
              Deployment #{deployment._id.slice(-6)}
            </h1>
            <p className="text-[#9FB3B6] mt-1">{deployment.project}</p>
          </div>
          {getStatusBadge(deployment.status)}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-[#9FB3B6] text-sm">Duration</p>
            <p className="text-[#F7F9FA] font-medium">{deployment.duration || '-'}</p>
          </div>
          <div>
            <p className="text-[#9FB3B6] text-sm">Started At</p>
            <p className="text-[#F7F9FA] font-medium">{new Date(deployment.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-[#9FB3B6] text-sm">Environment</p>
            <p className="text-[#F7F9FA] font-medium">{deployment.environment}</p>
          </div>
          <div>
             <p className="text-[#9FB3B6] text-sm">Version</p>
             <p className="text-[#F7F9FA] font-medium font-mono">{deployment.version}</p>
          </div>
        </div>
      </div>

      {/* Logs Console Component */}
      <LogConsole logs={logs} />
    </div>
  );
};

export default DeploymentDetails;