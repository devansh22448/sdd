import { useState } from "react";
import api from "../services/api";

const NewDeploymentModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    projectName: "",
    repoUrl: "",
    branch: "main",
    environment: "dev",
    buildCommand: "",
    deployCommand: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.projectName.trim()) newErrors.projectName = "Project name is required";
    if (!formData.repoUrl.trim()) newErrors.repoUrl = "Repository URL is required";
    if (!formData.buildCommand.trim()) newErrors.buildCommand = "Build command is required";
    if (!formData.deployCommand.trim()) newErrors.deployCommand = "Deploy command is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await api.post("/deployments", formData);
      onSuccess(response.data);
      handleClose();
    } catch (error) {
      console.error("Deployment creation failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      projectName: "",
      repoUrl: "",
      branch: "main",
      environment: "dev",
      buildCommand: "",
      deployCommand: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-soft bg-card-bg p-6 shadow-panel m-4">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-text-primary">
            New Deployment
          </h3>
          <button
            onClick={handleClose}
            className="rounded-full p-2 text-text-secondary transition hover:bg-primary/20 hover:text-text-primary"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Project Name
            </label>
            <input
              type="text"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              placeholder="My Project"
              className="w-full rounded-xl border border-soft bg-dark-bg px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:shadow-glow"
            />
            {errors.projectName && (
              <p className="mt-1 text-sm text-error">{errors.projectName}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Repository URL
            </label>
            <input
              type="text"
              name="repoUrl"
              value={formData.repoUrl}
              onChange={handleChange}
              placeholder="https://github.com/user/repo"
              className="w-full rounded-xl border border-soft bg-dark-bg px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:shadow-glow"
            />
            {errors.repoUrl && (
              <p className="mt-1 text-sm text-error">{errors.repoUrl}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Branch
            </label>
            <input
              type="text"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              placeholder="main"
              className="w-full rounded-xl border border-soft bg-dark-bg px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:shadow-glow"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Environment
            </label>
            <select
              name="environment"
              value={formData.environment}
              onChange={handleChange}
              className="w-full rounded-xl border border-soft bg-dark-bg px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:shadow-glow"
            >
              <option value="dev">Development</option>
              <option value="staging">Staging</option>
              <option value="production">Production</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Build Command
            </label>
            <input
              type="text"
              name="buildCommand"
              value={formData.buildCommand}
              onChange={handleChange}
              placeholder="npm run build"
              className="w-full rounded-xl border border-soft bg-dark-bg px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:shadow-glow"
            />
            {errors.buildCommand && (
              <p className="mt-1 text-sm text-error">{errors.buildCommand}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-text-primary">
              Deploy Command
            </label>
            <input
              type="text"
              name="deployCommand"
              value={formData.deployCommand}
              onChange={handleChange}
              placeholder="npm run deploy"
              className="w-full rounded-xl border border-soft bg-dark-bg px-4 py-3 text-text-primary outline-none transition focus:border-primary focus:shadow-glow"
            />
            {errors.deployCommand && (
              <p className="mt-1 text-sm text-error">{errors.deployCommand}</p>
            )}
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-xl border border-soft px-4 py-3 text-text-primary transition hover:bg-primary/10"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-xl bg-primary px-4 py-3 font-semibold text-white transition hover:bg-light-purple hover:shadow-glow disabled:opacity-50"
            >
              {loading ? "Creating..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDeploymentModal;