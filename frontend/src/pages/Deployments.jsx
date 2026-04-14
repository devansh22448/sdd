import { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import DeploymentTable from '../components/DeploymentTable';
import NewDeploymentModal from '../components/NewDeploymentModal'; // 👇 Naya modal import kiya

const Deployments = () => {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // 👇 Modal open/close state

  useEffect(() => {
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

    fetchDeployments();

    const socket = io('http://localhost:5000');

    socket.on('newDeployment', (newDep) => {
      setDeployments((prev) => [newDep, ...prev]);
    });

    socket.on('statusUpdate', (data) => {
      setDeployments((prev) => 
        prev.map((dep) => 
          dep._id === data.deploymentId 
            ? { ...dep, status: data.status, duration: data.duration || dep.duration } 
            : dep
        )
      );
    });

    return () => socket.disconnect();
  }, []);

  // 👇 Ab yeh function Modal se actual data (formData) accept karega
  const handleCreateDeployment = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/deployments', {
        project: formData.project,
        environment: formData.environment,
        version: formData.version
      });
      
      // Manual creation wale ke liye state update, webhook walo ko socket handle kar hi lega
      setDeployments([response.data, ...deployments]);
      setIsModalOpen(false); // Success ke baad modal band kardo
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
          onClick={() => setIsModalOpen(true)} // 👇 Button ab Modal kholega
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

      {/* 👇 Modal Render */}
      <NewDeploymentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateDeployment} 
      />
    </div>
  );
};

export default Deployments;