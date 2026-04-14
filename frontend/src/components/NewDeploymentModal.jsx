import { useState } from 'react';

const NewDeploymentModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    project: '',
    environment: 'Production',
    version: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit(formData);
    setIsSubmitting(false);
    
    // Form reset karo close karne se pehle
    setFormData({ project: '', environment: 'Production', version: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="bg-[#0F2E34] border border-[#172A3A] rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#172A3A] flex justify-between items-center">
          <h2 className="text-xl font-bold text-[#F7F9FA]">New Deployment</h2>
          <button 
            onClick={onClose}
            className="text-[#9FB3B6] hover:text-[#F7F9FA] transition-colors text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#9FB3B6] mb-1">Project Name</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Backend API"
                className="w-full bg-[#172A3A] border border-[#2A4356] rounded-xl px-4 py-2.5 text-[#F7F9FA] focus:outline-none focus:border-[#3AAFA9] transition-colors"
                value={formData.project}
                onChange={(e) => setFormData({...formData, project: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#9FB3B6] mb-1">Environment</label>
              <select 
                className="w-full bg-[#172A3A] border border-[#2A4356] rounded-xl px-4 py-2.5 text-[#F7F9FA] focus:outline-none focus:border-[#3AAFA9] transition-colors appearance-none"
                value={formData.environment}
                onChange={(e) => setFormData({...formData, environment: e.target.value})}
              >
                <option value="Production">Production</option>
                <option value="Staging">Staging</option>
                <option value="Development">Development</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#9FB3B6] mb-1">Version / Tag</label>
              <input 
                type="text" 
                required
                placeholder="e.g. v2.1.0"
                className="w-full bg-[#172A3A] border border-[#2A4356] rounded-xl px-4 py-2.5 text-[#F7F9FA] focus:outline-none focus:border-[#3AAFA9] transition-colors"
                value={formData.version}
                onChange={(e) => setFormData({...formData, version: e.target.value})}
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="mt-8 flex justify-end gap-3">
            <button 
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-[#9FB3B6] hover:bg-[#172A3A] transition-colors font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 bg-[#3AAFA9] hover:bg-[#66D2C7] disabled:opacity-50 text-white rounded-xl font-medium transition-colors flex items-center gap-2"
            >
              {isSubmitting ? 'Deploying...' : 'Start Deployment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDeploymentModal;