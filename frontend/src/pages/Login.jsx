import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/github";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isRegister) {
        await register(name, email, password);
      } else {
        await login(email, password);
      }
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to authenticate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-bg px-4 py-10">
      <div className="w-full max-w-[450px] rounded-[32px] border border-soft bg-card-bg p-8 shadow-panel">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-light-purple">
            Smart DevOps
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-text-primary">
            {isRegister ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-text-secondary">
            Access the dashboard with your DevOps credentials.
          </p>
        </div>
        
        <button
          type="button"
          onClick={handleGithubLogin}
          className="mb-6 flex w-full items-center justify-center gap-3 rounded-3xl border border-soft bg-dark-bg px-6 py-3 text-sm font-semibold text-text-primary transition hover:border-primary hover:bg-card-bg/50"
        >
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          Continue with GitHub
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-soft"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-card-bg px-4 text-text-secondary">or</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {isRegister && (
            <label className="block text-sm font-medium text-text-secondary">
              Name
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="mt-3 w-full rounded-3xl border border-soft bg-dark-bg px-4 py-3 text-text-primary outline-none focus:border-primary"
              />
            </label>
          )}
          <label className="block text-sm font-medium text-text-secondary">
            Email
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="mt-3 w-full rounded-3xl border border-soft bg-dark-bg px-4 py-3 text-text-primary outline-none focus:border-primary"
            />
          </label>
          <label className="block text-sm font-medium text-text-secondary">
            Password
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              className="mt-3 w-full rounded-3xl border border-soft bg-dark-bg px-4 py-3 text-text-primary outline-none focus:border-primary"
            />
          </label>
          {error && <p className="text-sm text-error">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-3xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-light-purple hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Processing..." : isRegister ? "Register" : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-text-secondary">
          <button
            type="button"
            onClick={() => setIsRegister((prev) => !prev)}
            className="font-semibold text-primary hover:text-light-purple"
          >
            {isRegister
              ? "Already have an account? Sign in"
              : "Need an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
