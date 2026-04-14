import { useState, useEffect } from 'react';
import axios from 'axios';
import StatusCard from '../components/StatusCard';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({
    total: 0,
    success: 0,
    failed: 0,
    pending: 0,
    chartData: [] 
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/deployments/metrics');
        setMetrics(response.data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#3AAFA9]">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#F7F9FA] mb-8">System Overview</h1>
      
      {/* Top Number Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatusCard title="Total Deployments" value={metrics.total} type="total" />
        <StatusCard 
          title="Success Rate" 
          value={`${metrics.total > 0 ? Math.round((metrics.success / metrics.total) * 100) : 0}%`} 
          type="success" 
        />
        <StatusCard title="Active Failures" value={metrics.failed} type="failed" />
        <StatusCard title="Running Now" value={metrics.pending} type="pending" />
      </div>

      {/* Beautiful Gradient Chart Section */}
      <div className="mt-10 p-6 bg-[#0F2E34] border border-[#172A3A] rounded-2xl">
        <h3 className="text-xl font-bold text-[#F7F9FA] mb-6">Deployment History (Last 7 Days)</h3>
        
        {metrics.chartData && metrics.chartData.length > 0 ? (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  {/* Green Gradient for Success */}
                  <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2ECC71" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2ECC71" stopOpacity={0}/>
                  </linearGradient>
                  {/* Red Gradient for Failed */}
                  <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E63946" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#E63946" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                
                <XAxis 
                  dataKey="name" 
                  stroke="#9FB3B6" 
                  tick={{ fill: '#9FB3B6', fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#9FB3B6" 
                  tick={{ fill: '#9FB3B6', fontSize: 12 }} 
                  tickLine={false} 
                  axisLine={false} 
                  allowDecimals={false} 
                />
                
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#172A3A', 
                    borderColor: '#2A4356', 
                    color: '#F7F9FA', 
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  itemStyle={{ color: '#F7F9FA', fontWeight: 500 }}
                  labelStyle={{ color: '#9FB3B6', marginBottom: '4px' }}
                />
                
                <Area 
                  type="monotone" 
                  dataKey="success" 
                  stroke="#2ECC71" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorSuccess)" 
                  name="Successful" 
                />
                <Area 
                  type="monotone" 
                  dataKey="failed" 
                  stroke="#E63946" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorFailed)" 
                  name="Failed" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="flex items-center justify-center h-80 text-[#9FB3B6]">
            No deployment data available for the last 7 days.
          </div>
        )}
      </div>
      
    </div>
  );
};

export default Dashboard;