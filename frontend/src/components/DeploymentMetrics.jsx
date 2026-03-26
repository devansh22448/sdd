import { LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const frequencyData = [
  { name: 'Mon', value: 8 },
  { name: 'Tue', value: 12 },
  { name: 'Wed', value: 10 },
  { name: 'Thu', value: 15 },
  { name: 'Fri', value: 18 },
  { name: 'Sat', value: 6 },
  { name: 'Sun', value: 4 },
];

const successData = [
  { name: 'Success', value: 85 },
  { name: 'Failed', value: 15 },
];

const COLORS = ['#7c3aed', '#ef4444'];

const DeploymentMetrics = () => {
  return (
    <div className="bg-devops-card rounded-2xl border border-devops-border overflow-hidden shadow-2xl h-full">
      <div className="bg-devops-bg px-6 py-4 border-b border-devops-border">
        <h3 className="text-lg font-semibold text-devops-text">Deployment Metrics</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Line Chart */}
          <div>
            <h4 className="text-sm font-medium text-devops-text-secondary mb-4">Deployment Frequency</h4>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={frequencyData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#7c3aed" 
                  strokeWidth={2} 
                  dot={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #2d2d44', borderRadius: '8px' }}
                  labelStyle={{ color: '#f0f0f5' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Donut Chart */}
          <div>
            <h4 className="text-sm font-medium text-devops-text-secondary mb-4">Success Rate</h4>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie
                  data={successData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  dataKey="value"
                >
                  {successData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #2d2d44', borderRadius: '8px' }}
                  labelStyle={{ color: '#f0f0f5' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentMetrics;
