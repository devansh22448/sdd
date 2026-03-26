import { useState } from 'react';
import HeroSection from '../components/HeroSection';
import DeploymentStatusSection from '../components/DeploymentStatusSection';
import NewDeploymentForm from '../components/NewDeploymentForm';
import LogsSection from '../components/LogsSection';
import MetricsSection from '../components/MetricsSection';
import HistorySection from '../components/HistorySection';

const Dashboard = () => {
  const [isDeploymentFormOpen, setIsDeploymentFormOpen] = useState(false);

  const handleNewDeployment = () => {
    setIsDeploymentFormOpen(true);
  };

  const handleDeploymentSubmit = async (data) => {
    // In production, this would call your API
    console.log('Deployment data:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Deployment started successfully!');
  };

  return (
    <div className="min-h-screen bg-devops-bg">
      {/* Hero Section */}
      <HeroSection />

      {/* Deployment Status Section */}
      <DeploymentStatusSection onNewDeployment={handleNewDeployment} />

      {/* Metrics Section */}
      <MetricsSection />

      {/* Main Content - Logs & History */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 py-8">
          {/* Left - Logs */}
          <LogsSection />
          
          {/* Right - Can add more content or keep history separate */}
          <div>
            {/* Could add additional widgets here */}
          </div>
        </div>
      </div>

      {/* History Section - Full Width */}
      <HistorySection />

      {/* Spacer for footer */}
      <div className="h-8" />

      {/* New Deployment Modal */}
      <NewDeploymentForm 
        isOpen={isDeploymentFormOpen}
        onClose={() => setIsDeploymentFormOpen(false)}
        onSubmit={handleDeploymentSubmit}
      />
    </div>
  );
};

export default Dashboard;
