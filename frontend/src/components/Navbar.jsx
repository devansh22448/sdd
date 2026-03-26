import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Logo from "../assets/logo.jpeg";
import {
  Menu,
  X,
  Home,
  Rocket,
  FileText,
  BarChart3,
  Users,
  LogOut,
  ChevronRight,
  Settings,
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/dashboard", icon: Home },
    { name: "Deployments", path: "/deployments", icon: Rocket },
    { name: "Logs", path: "/logs", icon: FileText },
    { name: "Metrics", path: "/metrics", icon: BarChart3 },
    { name: "Profile", path: "/profile", icon: Users },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Fixed Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-devops-bg/80 backdrop-blur-xl border-b border-devops-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Brand */}
            <Link to="/dashboard" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shadow-lg shadow-devops-purple/20 group-hover:shadow-devops-purple/40 transition-all duration-300">
                <img 
                  src={Logo} 
                  alt="Smart DevOps Logo" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling && (e.target.nextSibling.style.display = 'flex');
                  }}
                />
                <div className="hidden w-full h-full bg-gradient-to-br from-devops-purple to-devops-purple-light items-center justify-center">
                  <span className="text-white font-bold text-lg">SD</span>
                </div>
              </div>
              <div className="hidden sm:block">
                <span className="text-devops-text font-semibold text-lg tracking-tight">
                  Smart DevOps
                </span>
                <span className="text-devops-text-secondary text-xs block -mt-1">
                  Dashboard
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? "text-devops-purple bg-devops-purple/10"
                      : "text-devops-text-secondary hover:text-devops-text hover:bg-devops-card/50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Side - Auth Buttons */}
            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-devops-card/50 rounded-full">
                    <div className="w-7 h-7 bg-gradient-to-br from-devops-purple to-devops-purple-light rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {user.name?.[0] || "U"}
                      </span>
                    </div>
                    <span className="text-devops-text text-sm font-medium">
                      {user.name || "User"}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-devops-card hover:bg-devops-error/10 text-devops-text-secondary hover:text-devops-error rounded-lg text-sm font-medium transition-all duration-200 border border-transparent hover:border-devops-error/30"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-2.5 bg-gradient-to-r from-devops-purple to-devops-purple-light hover:from-devops-purple-light hover:to-devops-purple text-white font-semibold rounded-xl text-sm transition-all duration-300 shadow-lg shadow-devops-purple/20 hover:shadow-devops-purple/40"
                >
                  Login
                </Link>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 text-devops-text-secondary hover:text-devops-text hover:bg-devops-card rounded-lg transition-colors"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-devops-bg/90 backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Mobile Menu Drawer */}
          <div
            className="fixed top-0 right-0 h-full w-80 bg-devops-card border-l border-devops-border shadow-2xl transform transition-transform duration-300 ease-out"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-devops-border">
              <Link
                to="/dashboard"
                className="flex items-center gap-3"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                  <img 
                    src={Logo} 
                    alt="Smart DevOps Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-devops-text font-semibold text-lg">
                    Smart DevOps
                  </span>
                  <span className="text-devops-text-secondary text-xs block -mt-1">
                    Dashboard
                  </span>
                </div>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-devops-text-secondary hover:text-devops-text hover:bg-devops-bg rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Content */}
            <div className="p-4 space-y-2">
              <p className="text-xs font-semibold text-devops-text-secondary uppercase tracking-wider px-3 mb-2">
                Menu
              </p>
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive(link.path)
                        ? "text-devops-purple bg-devops-purple/10"
                        : "text-devops-text-secondary hover:text-devops-text hover:bg-devops-bg/50"
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Icon className={`w-5 h-5 ${isActive(link.path) ? "text-devops-purple" : "text-devops-purple group-hover:text-devops-purple-light"} transition-colors`} />
                    <span className="font-medium">{link.name}</span>
                    <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })}
            </div>

            {/* Drawer Footer */}
            {user ? (
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-devops-border">
                <div className="flex items-center gap-3 mb-4 px-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-devops-purple to-devops-purple-light rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">
                      {user.name?.[0] || "U"}
                    </span>
                  </div>
                  <div>
                    <p className="text-devops-text font-medium">
                      {user.name || "User"}
                    </p>
                    <p className="text-devops-text-secondary text-xs">
                      {user.email || "Logged in"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-devops-error/10 hover:bg-devops-error/20 text-devops-error rounded-xl font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-devops-border">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-devops-purple to-devops-purple-light text-white rounded-xl font-semibold transition-colors"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
