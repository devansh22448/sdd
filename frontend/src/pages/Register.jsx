import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "../assets/logo.jpeg";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Github,
  Loader2,
} from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful registration
      const mockUser = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
      };
      const mockToken = "mock-register-token-" + Date.now();

      // Auto-login after register
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      login(mockUser, mockToken);

      navigate("/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
      void err;
    } finally {
      setLoading(false);
    }
  };

  // Calculate password strength
  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const getStrengthColor = () => {
    const strength = getPasswordStrength();
    if (strength <= 25) return "bg-devops-error";
    if (strength <= 50) return "bg-devops-warning";
    if (strength <= 75) return "bg-devops-highlight";
    return "bg-devops-success";
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-devops-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <img 
            src={Logo} 
            alt="Smart DevOps Logo" 
            className="w-20 h-20 mx-auto mb-4 object-contain"
          />
          <h1 className="text-3xl font-bold text-devops-text">
            Create Account
          </h1>
          <p className="text-devops-text-secondary mt-2 text-sm">
            Start your DevOps journey today
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-devops-card/80 backdrop-blur-sm rounded-2xl p-8 border border-devops-border/50 shadow-2xl shadow-devops-purple/5">
          <form onSubmit={handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-devops-error/10 border border-devops-error/30 rounded-xl text-devops-error text-sm flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {/* Name Field */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-devops-text-secondary mb-2.5">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-devops-text-secondary group-focus-within:text-devops-purple transition-colors">
                  <User className="w-full h-full" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-devops-bg/80 border border-devops-border/60 rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple focus:ring-2 focus:ring-devops-purple/20 transition-all"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-devops-text-secondary mb-2.5">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-devops-text-secondary group-focus-within:text-devops-purple transition-colors">
                  <Mail className="w-full h-full" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-devops-bg/80 border border-devops-border/60 rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple focus:ring-2 focus:ring-devops-purple/20 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-devops-text-secondary mb-2.5">
                Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-devops-text-secondary group-focus-within:text-devops-purple transition-colors">
                  <Lock className="w-full h-full" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  className="w-full pl-12 pr-14 py-3.5 bg-devops-bg/80 border border-devops-border/60 rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple focus:ring-2 focus:ring-devops-purple/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-devops-text-secondary hover:text-devops-purple transition-colors p-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {/* Password Strength Bar */}
              {formData.password && (
                <div className="mt-3">
                  <div className="h-1.5 bg-devops-bg rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${getStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                  <p className="text-devops-text-secondary text-xs mt-2">
                    Use 8+ characters with uppercase, numbers & symbols
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-devops-text-secondary mb-2.5">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-devops-text-secondary group-focus-within:text-devops-purple transition-colors">
                  <Lock className="w-full h-full" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-devops-bg/80 border border-devops-border/60 rounded-xl text-devops-text placeholder-devops-text-secondary focus:outline-none focus:border-devops-purple focus:ring-2 focus:ring-devops-purple/20 transition-all"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="mb-6">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-devops-border/60 bg-devops-bg text-devops-purple focus:ring-devops-purple focus:ring-offset-0 focus:ring-2 focus:ring-devops-purple/20"
                />
                <span className="text-devops-text-secondary text-sm leading-relaxed">
                  I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-devops-purple hover:text-devops-purple-light font-medium"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy"
                    className="text-devops-purple hover:text-devops-purple-light font-medium"
                  >
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Submit Button - Differentiated CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-devops-purple hover:bg-devops-purple-light text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-devops-purple/25 hover:shadow-devops-purple/40"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-devops-border/30"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-4 bg-devops-card text-devops-text-secondary uppercase tracking-wider font-medium">
                  or continue with
                </span>
              </div>
            </div>

            {/* GitHub Button - Secondary CTA style */}
            <button
              type="button"
              className="w-full py-3 bg-transparent hover:bg-devops-bg text-devops-text font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 border-2 border-devops-border hover:border-devops-purple"
            >
              <Github className="w-5 h-5" />
              Continue with GitHub
            </button>

            {/* Footer */}
            <p className="mt-8 text-center text-devops-text-secondary text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-devops-purple hover:text-devops-purple-light font-semibold transition-colors"
              >
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
