import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john@example.com",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Update user profile logic here
    setEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-devops-text">Profile</h1>
        <p className="text-devops-text-secondary mt-1">Manage your account settings</p>
      </div>

      <div className="bg-devops-card rounded-2xl p-8 border border-devops-border">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-devops-border">
          <div className="w-24 h-24 bg-gradient-to-br from-devops-purple to-devops-purple-light rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {user?.name?.[0] || "J"}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-devops-text">{formData.name}</h2>
            <p className="text-devops-text-secondary">{formData.email}</p>
            <p className="text-sm text-devops-text-secondary mt-1">Member since Jan 2024</p>
          </div>
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-devops-text mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-devops-bg border border-devops-border rounded-xl text-devops-text focus:outline-none focus:ring-2 focus:ring-devops-purple focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-devops-text mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-devops-bg border border-devops-border rounded-xl text-devops-text focus:outline-none focus:ring-2 focus:ring-devops-purple focus:border-transparent transition-all"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3 bg-devops-purple text-white rounded-xl hover:bg-devops-purple-light transition-colors shadow-lg shadow-devops-purple/20"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-6 py-3 border border-devops-border text-devops-text rounded-xl hover:bg-devops-bg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-devops-bg rounded-xl">
                <p className="text-sm text-devops-text-secondary mb-1">Full Name</p>
                <p className="text-devops-text font-medium">{formData.name}</p>
              </div>
              <div className="p-4 bg-devops-bg rounded-xl">
                <p className="text-sm text-devops-text-secondary mb-1">Email Address</p>
                <p className="text-devops-text font-medium">{formData.email}</p>
              </div>
              <div className="p-4 bg-devops-bg rounded-xl">
                <p className="text-sm text-devops-text-secondary mb-1">Role</p>
                <p className="text-devops-text font-medium">Administrator</p>
              </div>
              <div className="p-4 bg-devops-bg rounded-xl">
                <p className="text-sm text-devops-text-secondary mb-1">Status</p>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-devops-success/20 text-devops-success">
                  Active
                </span>
              </div>
            </div>
            <button
              onClick={() => setEditing(true)}
              className="px-6 py-3 bg-devops-purple text-white rounded-xl hover:bg-devops-purple-light transition-colors shadow-lg shadow-devops-purple/20"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
