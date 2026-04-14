import React from 'react';

const Logs = () => {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#F7F9FA]">System Logs</h1>
        <p className="text-[#9FB3B6] mt-1">Monitor global application events and errors</p>
      </div>

      <div className="bg-[#0F2E34] border border-[#172A3A] rounded-2xl p-12 text-center flex flex-col items-center justify-center">
        <svg className="w-16 h-16 text-[#3AAFA9] mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        <h3 className="text-lg font-medium text-[#F7F9FA] mb-2">Global Logs Coming Soon</h3>
        <p className="text-[#9FB3B6] max-w-md">
          Currently, logs are scoped to individual deployments. You can view them by clicking "View Details" on any specific deployment in the Deployments tab.
        </p>
      </div>
    </div>
  );
};

export default Logs;