import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Rocket, GitBranch, Server, Terminal, Loader2 } from "lucide-react";

const TriggerDeployment = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    repositoryUrl: "",
    branch: "main",
    environment: "development",
    server: "",
    buildCommand: "npm run build",
    startCommand: "npm start",
    description: "",
    tags: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.projectName.trim())
      newErrors.projectName = "Project name is required";
    if (!formData.repositoryUrl.trim())
      newErrors.repositoryUrl = "Repository URL is required";
    if (!formData.server.trim())
      newErrors.server = "Deployment server is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert("Deployment triggered successfully!");
      navigate("/deployments");
    } catch (error) {
      console.error("Error triggering deployment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <button
          onClick={() => navigate("/deployments")}
          className="text-devops-purple hover:text-devops-purple-light flex items-center gap-2 mb-4 transition-colors"
        >
          ← Back to Deployments
        </button>
        <h1 className="text-2xl font-bold text-devops-text">New Deployment</h1>
        <p className="text-devops-text-secondary mt-1">
          Configure and trigger a new deployment
        </p>
      </div>

      <div className="bg-devops-card rounded-2xl border border-devops-border shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-devops-border">
          <div className="w-10 h-10 bg-gradient-to-br from-devops-purple to-devops-purple-light rounded-xl flex items-center justify-center">
            <Rocket className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-devops-text">
              Deployment Configuration
            </h2>
            <p className="text-devops-text-secondary text-sm">
              Fill in your deployment details
            </p>
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Project Info Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-devops-text-secondary mb-2">
                Project Name <span className="text-devops-error">*</span>
              </label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="my-app"
                className={`w-full px-4 py-3 bg-devops-bg border ${errors.projectName ? "border-devops-error" : "border-devops-border"} rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple transition-colors`}
              />
              {errors.projectName && (
                <p className="text-devops-error text-xs mt-1">
                  {errors.projectName}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-devops-text-secondary mb-2">
                Environment
              </label>
              <select
                name="environment"
                value={formData.environment}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-devops-bg border border-devops-border rounded-xl text-devops-text focus:outline-none focus:border-devops-purple transition-colors"
              >
                <option value="development">Development</option>
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
            </div>
          </div>

          {/* Repository */}
          <div>
            <label className="block text-sm font-medium text-devops-text-secondary mb-2">
              Repository URL <span className="text-devops-error">*</span>
            </label>
            <div className="relative">
              <GitBranch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-devops-text-secondary" />
              <input
                type="url"
                name="repositoryUrl"
                value={formData.repositoryUrl}
                onChange={handleChange}
                placeholder="https://github.com/user/repo"
                className={`w-full pl-12 pr-4 py-3 bg-devops-bg border ${errors.repositoryUrl ? "border-devops-error" : "border-devops-border"} rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple transition-colors`}
              />
            </div>
            {errors.repositoryUrl && (
              <p className="text-devops-error text-xs mt-1">
                {errors.repositoryUrl}
              </p>
            )}
          </div>

          {/* Branch & Server Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-devops-text-secondary mb-2">
                Branch
              </label>
              <input
                type="text"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="main"
                className="w-full px-4 py-3 bg-devops-bg border border-devops-border rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-devops-text-secondary mb-2">
                Deployment Server <span className="text-devops-error">*</span>
              </label>
              <div className="relative">
                <Server className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-devops-text-secondary" />
                <input
                  type="text"
                  name="server"
                  value={formData.server}
                  onChange={handleChange}
                  placeholder="server.example.com"
                  className={`w-full pl-12 pr-4 py-3 bg-devops-bg border ${errors.server ? "border-devops-error" : "border-devops-border"} rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple transition-colors`}
                />
              </div>
              {errors.server && (
                <p className="text-devops-error text-xs mt-1">{errors.server}</p>
              )}
            </div>
          </div>

          {/* Commands Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-devops-text-secondary mb-2">
                Build Command
              </label>
              <div className="relative">
                <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-devops-text-secondary" />
                <input
                  type="text"
                  name="buildCommand"
                  value={formData.buildCommand}
                  onChange={handleChange}
                  placeholder="npm run build"
                  className="w-full pl-12 pr-4 py-3 bg-devops-bg border border-devops-border rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-devops-text-secondary mb-2">
                Start Command
              </label>
              <div className="relative">
                <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-devops-text-secondary" />
                <input
                  type="text"
                  name="startCommand"
                  value={formData.startCommand}
                  onChange={handleChange}
                  placeholder="npm start"
                  className="w-full pl-12 pr-4 py-3 bg-devops-bg border border-devops-border rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-devops-text-secondary mb-2">
              Description / Notes
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Optional description for this deployment..."
              className="w-full px-4 py-3 bg-devops-bg border border-devops-border rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple transition-colors resize-none"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-devops-text-secondary mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="v1.0, hotfix, feature"
              className="w-full px-4 py-3 bg-devops-bg border border-devops-border rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple transition-colors"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-devops-border">
            <button
              type="button"
              onClick={() => navigate("/deployments")}
              className="px-5 py-2.5 bg-devops-bg hover:bg-devops-card text-devops-text font-medium rounded-xl border border-devops-border hover:border-devops-purple/30 transition-all duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-devops-purple hover:bg-devops-purple-light text-white font-semibold rounded-xl transition-all duration-200 flex items-center gap-2 disabled:opacity-50 shadow-lg shadow-devops-purple/20 hover:shadow-devops-purple/40"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Deploying...
                </>
              ) : (
                <>
                  <Rocket className="w-4 h-4" />
                  Start Deployment
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TriggerDeployment;
