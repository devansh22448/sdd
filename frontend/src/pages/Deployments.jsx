import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';
import DeploymentTable from '../components/DeploymentTable';

const Deployments = () => {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Data laane ka function humne alag se banaya taaki isko baar-baar call kar sakein
    const fetchDeployments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/deployments');
        setDeployments(response.data);
      } catch (error) {
        console.error('Error fetching deployments:', error);
      } finally {
        setLoading(false);
      }
    };

    // Component load hote hi pehli baar data lao
    fetchDeployments();

    // 2. Socket.io Connection
    const socket = io('http://localhost:5000');

    // 👇 YEH NAYA BLOCK ADD KAREIN
    socket.on('newDeployment', (newDep) => {
      // Jaise hi backend naya deployment banaye, usko table ke sabse upar daal do
      setDeployments((prevDeployments) => [newDep, ...prevDeployments]);
    });

    socket.on('statusUpdate', (data) => {
      setDeployments((prevDeployments) => {
        // Check karo ki kya yeh naya deployment humari table mein already hai?
        const exists = prevDeployments.find(dep => dep._id === data.deploymentId);
        
        if (!exists) {
          // AGAR NAHI HAI -> Matlab GitHub webhook se naya push aaya hai!
          // Turant bina refresh kiye naya data backend se mangwa lo
          fetchDeployments();
          return prevDeployments;
        }

        // AGAR HAI -> Toh bas us specific row ka color/status update kar do
        return prevDeployments.map((dep) => 
          dep._id === data.deploymentId 
            ? { ...dep, status: data.status } 
            : dep
        );
      });
    });

    // Clean up
    return () => socket.disconnect();
  }, []);

  const handleNewDeployment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/deployments', {
        project: "Frontend App",
        environment: "Production",
        version: "Manual-v1"
      });
      // Manual click par direct state update karenge
      setDeployments([response.data, ...deployments]);
    } catch (error) {
      console.error("Error creating deployment:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#F7F9FA]">Deployments</h1>
          <p className="text-[#9FB3B6] mt-1">Manage and monitor your deployments</p>
        </div>
        <button 
          onClick={handleNewDeployment}
          className="px-4 py-2 bg-[#3AAFA9] hover:bg-[#66D2C7] text-white rounded-xl font-medium transition-colors"
        >
          + New Deployment
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-[#3AAFA9]">Loading...</div>
        </div>
      ) : (
        <DeploymentTable deployments={deployments} />
      )}
    </div>
  );
};

export default Deployments;