import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaLock, FaGithubAlt } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import AuthLayout from "../components/AuthLayout";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { register } = useAuth();
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

    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);

    const result = await register(
      formData.username,
      formData.email,
      formData.password,
    );

    if (result.success) {
      navigate("/login");
    } else {
      setError(result.message);
    }

    setLoading(false);
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

  const passwordStrength = getPasswordStrength();

  return (
    <AuthLayout>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-[#F7F9FA]">Create Account</h2>
        <p className="text-gray-400 mt-2 text-sm">Start your DevOps journey</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="auth-error">
            <span className="error-icon">⚠</span>
            {error}
          </div>
        )}

        {/* Full Name Input */}
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Full Name
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <FaUser />
            </span>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="John Doe"
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <FaEnvelope />
            </span>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="name@company.com"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <FaLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {/* Password Strength Bar */}
          <div className="password-strength mt-2">
            <div className="strength-bar">
              <div
                className="strength-fill"
                style={{ width: `${passwordStrength}%` }}
              ></div>
            </div>
            <span className="strength-text">
              Use 8+ characters with a mix of letters
            </span>
          </div>
        </div>

        {/* Confirm Password Input */}
        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <div className="input-wrapper">
            <span className="input-icon">
              <FaLock />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="form-options">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
            />
            <span className="checkmark"></span>
            <span className="checkbox-label">
              I agree to{" "}
              <Link to="/terms" className="terms-link">
                Terms
              </Link>{" "}
              &{" "}
              <Link to="/privacy" className="terms-link">
                Privacy Policy
              </Link>
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? (
            <span className="loading-spinner"></span>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Divider */}
        <div className="divider">
          <span className="divider-text">or continue with</span>
        </div>

        {/* GitHub Button */}
        <button type="button" className="btn-secondary">
          <FaGithubAlt />
          <span>GitHub</span>
        </button>

        {/* Footer */}
        <div className="text-center pt-4">
          <p className="footer-text">
            Already have an account?{" "}
            <Link to="/login" className="footer-link">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Register;
