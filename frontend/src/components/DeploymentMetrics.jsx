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

const COLORS = ['#22c55e', '#ef4444'];

const DeploymentMetrics = () => {
  return (
    <div className="bg-[#0F2E34] rounded-2xl border border-[#172A3A] overflow-hidden shadow-2xl h-full">
      <div className="bg-[#172A3A] px-6 py-4 border-b border-[#172A3A]">
        <h3 className="text-lg font-semibold text-[#F7F9FA]">Depaloyment Metrics</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Line Chart */}
          <div>
            <h4 className="text-sm font-medium text-[#9FB3B6] mb-4">Deployment Frequency</h4>
            <ResponsiveContainer width="100%" height={120}>
              <LineChart data={frequencyData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#22c55e" 
                  strokeWidth={2} 
                  dot={false}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0F2E34', border: '1px solid #172A3A', borderRadius: '8px' }}
                  labelStyle={{ color: '#F7F9FA' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          {/* Donut Chart */}
          <div>
            <h4 className="text-sm font-medium text-[#9FB3B6] mb-4">Success Rate</h4>
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
                  contentStyle={{ backgroundColor: '#0F2E34', border: '1px solid #172A3A', borderRadius: '8px' }}
                  labelStyle={{ color: '#F7F9FA' }}
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
