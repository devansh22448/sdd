import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Settings = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
  });
  const [settings, setSettings] = useState({
    autoDeploy: true,
    emailNotifications: true,
    slackNotifications: false,
    twoFactorAuth: false,
  });
  const [saving, setSaving] = useState(false);

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#F7F9FA]">Settings</h1>
        <p className="text-[#9FB3B6] mt-1">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-[#0F2E34] rounded-xl border border-[#172A3A] p-6">
          <h2 className="text-lg font-semibold text-[#FFD166] mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#9FB3B6] mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 bg-[#172A3A] border border-[#172A3A] rounded-lg text-[#F7F9FA] focus:outline-none focus:border-[#3AAFA9]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#9FB3B6] mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 bg-[#172A3A] border border-[#172A3A] rounded-lg text-[#F7F9FA] focus:outline-none focus:border-[#3AAFA9]"
              />
            </div>
          </div>
        </div>

        {/* Deployment Config */}
        <div className="bg-[#0F2E34] rounded-xl border border-[#172A3A] p-6">
          <h2 className="text-lg font-semibold text-[#FFD166] mb-4">Deployment Configuration</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#172A3A]/50 rounded-lg">
              <div>
                <p className="text-[#F7F9FA] font-medium">Auto Deploy</p>
                <p className="text-sm text-[#9FB3B6]">Automatically deploy successful builds</p>
              </div>
              <button
                onClick={() => handleToggle('autoDeploy')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.autoDeploy ? 'bg-[#3AAFA9]' : 'bg-[#172A3A]'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.autoDeploy ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#172A3A]/50 rounded-lg">
              <div>
                <p className="text-[#F7F9FA] font-medium">Email Notifications</p>
                <p className="text-sm text-[#9FB3B6]">Receive email notifications for deployments</p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-[#3AAFA9]' : 'bg-[#172A3A]'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.emailNotifications ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#172A3A]/50 rounded-lg">
              <div>
                <p className="text-[#F7F9FA] font-medium">Slack Notifications</p>
                <p className="text-sm text-[#9FB3B6]">Receive Slack notifications for deployments</p>
              </div>
              <button
                onClick={() => handleToggle('slackNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.slackNotifications ? 'bg-[#3AAFA9]' : 'bg-[#172A3A]'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.slackNotifications ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-[#0F2E34] rounded-xl border border-[#172A3A] p-6">
          <h2 className="text-lg font-semibold text-[#FFD166] mb-4">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#172A3A]/50 rounded-lg">
              <div>
                <p className="text-[#F7F9FA] font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-[#9FB3B6]">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => handleToggle('twoFactorAuth')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.twoFactorAuth ? 'bg-[#3AAFA9]' : 'bg-[#172A3A]'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.twoFactorAuth ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 bg-[#3AAFA9] hover:bg-[#66D2C7] text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default Settings;
