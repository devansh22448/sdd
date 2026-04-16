import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Settings = () => {
  const { user: authUser, logout } = useAuth();
  const [user, setUser] = useState({ name: "", email: "" });
  const [settings, setSettings] = useState({
    autoDeploy: false,
    emailAlerts: false,
    securityNotifications: false,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (authUser) {
      setUser({ name: authUser.name || "", email: authUser.email || "" });
    }
    const fetchUser = async () => {
      try {
        const response = await api.get("/user");
        const profile = response.data || {};
        if (!authUser) {
          setUser({ name: profile.name || "", email: profile.email || "" });
        }
        setSettings({
          autoDeploy: profile.autoDeploy || false,
          emailAlerts: profile.emailAlerts || false,
          securityNotifications: profile.securityNotifications || false,
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [authUser]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const response = await api.put("/user", { ...user, ...settings });
      setMessage("Settings updated successfully.");
      if (response.data) {
        setUser((prev) => ({ ...prev, ...response.data }));
      }
    } catch (error) {
      setMessage("Unable to save settings.");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg">
      <Navbar />
      <div className="mx-auto grid max-w-[1400px] gap-6 px-6 py-8 lg:grid-cols-[280px_1fr]">
        <Sidebar />
        <main className="space-y-6">
          <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
            <h2 className="text-xl font-semibold text-text-primary">
              Settings
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Manage your profile, security preferences, and deployment toggles.
            </p>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
              <h3 className="text-lg font-semibold text-text-primary">
                Profile
              </h3>
              <div className="mt-6 space-y-5">
                <label className="block text-sm text-text-secondary">
                  Name
                  <input
                    value={user.name}
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="mt-3 w-full rounded-3xl border border-soft bg-dark-bg px-4 py-3 text-text-primary outline-none focus:border-primary"
                  />
                </label>
                <label className="block text-sm text-text-secondary">
                  Email
                  <input
                    value={user.email}
                    type="email"
                    onChange={(e) =>
                      setUser((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="mt-3 w-full rounded-3xl border border-soft bg-dark-bg px-4 py-3 text-text-primary outline-none focus:border-primary"
                  />
                </label>
              </div>
            </div>
            <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
              <h3 className="text-lg font-semibold text-text-primary">
                Security & deployment
              </h3>
              <div className="mt-6 space-y-5">
                <label className="flex items-center justify-between rounded-3xl border border-soft bg-dark-bg px-4 py-4 text-sm text-text-secondary">
                  <div>
                    <p className="font-medium text-text-primary">
                      Auto deploy on success
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">
                      Automatically run deployment after successful build.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.autoDeploy}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        autoDeploy: e.target.checked,
                      }))
                    }
                    className="h-5 w-5 accent-primary"
                  />
                </label>
                <label className="flex items-center justify-between rounded-3xl border border-soft bg-dark-bg px-4 py-4 text-sm text-text-secondary">
                  <div>
                    <p className="font-medium text-text-primary">
                      Email alerts
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">
                      Receive notifications for failed deployments.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.emailAlerts}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        emailAlerts: e.target.checked,
                      }))
                    }
                    className="h-5 w-5 accent-primary"
                  />
                </label>
                <label className="flex items-center justify-between rounded-3xl border border-soft bg-dark-bg px-4 py-4 text-sm text-text-secondary">
                  <div>
                    <p className="font-medium text-text-primary">
                      Security notifications
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">
                      Receive security-related audit alerts.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.securityNotifications}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        securityNotifications: e.target.checked,
                      }))
                    }
                    className="h-5 w-5 accent-primary"
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
            <button
              onClick={handleSave}
              disabled={saving}
              className="rounded-3xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-light-purple hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
            >
              {saving ? "Saving..." : "Save settings"}
            </button>
            {message && (
              <p className="mt-4 text-sm text-text-secondary">{message}</p>
            )}
          </div>
          <div className="rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel">
            <h3 className="text-lg font-semibold text-text-primary">
              Account
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              Manage your account session and logout.
            </p>
            <button
              onClick={logout}
              className="mt-4 rounded-3xl border border-error/30 px-6 py-3 text-sm font-semibold text-error transition hover:bg-error/10"
            >
              Logout
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
