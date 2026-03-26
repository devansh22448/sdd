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
        <h1 className="text-2xl font-bold text-devops-text">Settings</h1>
        <p className="text-devops-text-secondary mt-1">Manage your account and preferences</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="bg-devops-card rounded-xl border border-devops-border p-6">
          <h2 className="text-lg font-semibold text-devops-purple-light mb-4">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-devops-text-secondary mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 bg-devops-bg border border-devops-border rounded-lg text-devops-text focus:outline-none focus:border-devops-purple"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-devops-text-secondary mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="w-full px-4 py-2 bg-devops-bg border border-devops-border rounded-lg text-devops-text focus:outline-none focus:border-devops-purple"
              />
            </div>
          </div>
        </div>

        {/* Deployment Config */}
        <div className="bg-devops-card rounded-xl border border-devops-border p-6">
          <h2 className="text-lg font-semibold text-devops-purple-light mb-4">Deployment Configuration</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-devops-bg/50 rounded-lg">
              <div>
                <p className="text-devops-text font-medium">Auto Deploy</p>
                <p className="text-sm text-devops-text-secondary">Automatically deploy successful builds</p>
              </div>
              <button
                onClick={() => handleToggle('autoDeploy')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.autoDeploy ? 'bg-devops-purple' : 'bg-devops-border'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.autoDeploy ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-devops-bg/50 rounded-lg">
              <div>
                <p className="text-devops-text font-medium">Email Notifications</p>
                <p className="text-sm text-devops-text-secondary">Receive email notifications for deployments</p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.emailNotifications ? 'bg-devops-purple' : 'bg-devops-border'
                }`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  settings.emailNotifications ? 'translate-x-7' : 'translate-x-1'
                }`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-devops-bg/50 rounded-lg">
              <div>
                <p className="text-devops-text font-medium">Slack Notifications</p>
                <p className="text-sm text-devops-text-secondary">Receive Slack notifications for deployments</p>
              </div>
              <button
                onClick={() => handleToggle('slackNotifications')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.slackNotifications ? 'bg-devops-purple' : 'bg-devops-border'
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
        <div className="bg-devops-card rounded-xl border border-devops-border p-6">
          <h2 className="text-lg font-semibold text-devops-purple-light mb-4">Security</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-devops-bg/50 rounded-lg">
              <div>
                <p className="text-devops-text font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-devops-text-secondary">Add an extra layer of security to your account</p>
              </div>
              <button
                onClick={() => handleToggle('twoFactorAuth')}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.twoFactorAuth ? 'bg-devops-purple' : 'bg-devops-border'
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
          className="w-full py-3 bg-devops-purple hover:bg-devops-purple-light text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 shadow-lg shadow-devops-purple/20"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default Settings;
