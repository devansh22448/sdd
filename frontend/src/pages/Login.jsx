import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock login - in production, call actual API
      const mockUser = { id: 1, name: 'John Doe', email };
      const mockToken = 'mock-jwt-token-12345';
      
      login(mockUser, mockToken);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A2328] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#3AAFA9] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#3AAFA9]/30">
            <span className="text-white font-bold text-2xl">SD</span>
          </div>
          <h1 className="text-2xl font-bold text-[#F7F9FA]">Smart DevOps</h1>
          <p className="text-[#9FB3B6] mt-2">Sign in to your dashboard</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0F2E34] rounded-2xl p-8 border border-[#172A3A]">
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#9FB3B6] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 bg-[#172A3A] border border-[#172A3A] rounded-xl text-[#F7F9FA] placeholder-[#9FB3B6] focus:outline-none focus:border-[#3AAFA9] focus:ring-1 focus:ring-[#3AAFA9] transition-colors"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#9FB3B6] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 bg-[#172A3A] border border-[#172A3A] rounded-xl text-[#F7F9FA] placeholder-[#9FB3B6] focus:outline-none focus:border-[#3AAFA9] focus:ring-1 focus:ring-[#3AAFA9] transition-colors"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-[#E63946]/10 border border-[#E63946]/30 rounded-lg text-[#E63946] text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#3AAFA9] hover:bg-[#66D2C7] text-white font-semibold rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Register Link */}
          <p className="mt-6 text-center text-[#9FB3B6]">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#3AAFA9] hover:text-[#66D2C7] font-medium">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
