import React from 'react';

const Settings = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#F7F9FA]">Settings</h1>
        <p className="text-[#9FB3B6] mt-1">Manage your CI/CD pipeline configurations</p>
      </div>

      <div className="bg-[#0F2E34] border border-[#172A3A] rounded-2xl p-6">
        <h2 className="text-lg font-medium text-[#F7F9FA] mb-6 border-b border-[#172A3A] pb-4">General Configuration</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-[#172A3A] rounded-xl">
            <div>
              <p className="text-[#F7F9FA] font-medium">Auto-Deployments</p>
              <p className="text-[#9FB3B6] text-sm">Automatically trigger builds on GitHub push</p>
            </div>
            {/* Fake Toggle Switch for UI */}
            <div className="w-12 h-6 bg-[#3AAFA9] rounded-full p-1 cursor-pointer flex justify-end">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex justify-between items-center p-4 bg-[#172A3A] rounded-xl">
            <div>
              <p className="text-[#F7F9FA] font-medium">Slack Notifications</p>
              <p className="text-[#9FB3B6] text-sm">Send deployment status alerts to Slack</p>
            </div>
            <div className="w-12 h-6 bg-[#2A4356] rounded-full p-1 cursor-pointer flex justify-start">
              <div className="w-4 h-4 bg-[#9FB3B6] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;