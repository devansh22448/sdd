import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Loader2 } from "lucide-react";

// Import logo from src/assets
import logo from "../assets/logo.jpeg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock login - in production, call actual API
      const mockUser = { id: 1, name: "John Doe", email };
      const mockToken = "mock-jwt-token-12345";

      login(mockUser, mockToken);
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
      void err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-devops-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src={logo}
            alt="Smart DevOps Logo"
            className="w-20 h-20 mx-auto mb-4 object-contain"
          />
          <h1 className="text-3xl font-bold text-devops-text">Welcome Back</h1>
          <p className="text-devops-text-secondary mt-2 text-sm">
            Sign in to continue to your dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-devops-card/80 backdrop-blur-sm rounded-2xl p-8 border border-devops-border/50 shadow-2xl shadow-devops-purple/5">
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-devops-text-secondary mb-2.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3.5 bg-devops-bg/80 border border-devops-border/60 rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple focus:ring-2 focus:ring-devops-purple/20 transition-all"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-devops-text-secondary mb-2.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3.5 bg-devops-bg/80 border border-devops-border/60 rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple focus:ring-2 focus:ring-devops-purple/20 transition-all"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-devops-error/10 border border-devops-error/30 rounded-xl text-devops-error text-sm flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {/* Submit Button - Primary CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-devops-purple hover:bg-devops-purple-light text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-devops-purple/25 hover:shadow-devops-purple/40"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-8 text-center text-devops-text-secondary text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-devops-purple hover:text-devops-purple-light font-semibold transition-colors"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
