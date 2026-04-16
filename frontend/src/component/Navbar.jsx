import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const pageTitles = {
  "/dashboard": "Dashboard",
  "/deployments": "Deployments",
  "/logs": "Logs",
  "/metrics": "Metrics",
  "/settings": "Settings",
};

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const title = pageTitles[location.pathname] || "Smart DevOps";

  return (
    <header className="sticky top-0 z-20 border-b border-soft bg-dark-bg/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4 text-text-primary">
        <div className="flex items-center gap-3">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white font-semibold">
              SD
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-light-purple">
                Smart DevOps
              </p>
              <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
            </div>
          </Link>
        </div>
        
        <nav className="hidden items-center gap-6 lg:flex">
          <Link to="/dashboard" className={`text-sm font-medium transition ${location.pathname === '/dashboard' ? 'text-primary' : 'text-text-secondary hover:text-primary'}`}>
            Home
          </Link>
          <Link to="/deployments" className={`text-sm font-medium transition ${location.pathname === '/deployments' ? 'text-primary' : 'text-text-secondary hover:text-primary'}`}>
            Deployments
          </Link>
          <Link to="/logs" className={`text-sm font-medium transition ${location.pathname === '/logs' ? 'text-primary' : 'text-text-secondary hover:text-primary'}`}>
            Logs
          </Link>
          <Link to="/metrics" className={`text-sm font-medium transition ${location.pathname === '/metrics' ? 'text-primary' : 'text-text-secondary hover:text-primary'}`}>
            Analytics
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user && (
            <Link
              to="/settings"
              className="flex items-center gap-2 rounded-2xl border border-soft px-3 py-2 transition hover:border-primary"
            >
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">
                  {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                </span>
              </div>
              <span className="hidden text-sm text-text-primary sm:block">
                {user.name || user.email}
              </span>
            </Link>
          )}
          <button
            onClick={logout}
            className="rounded-2xl border border-soft px-4 py-2 text-sm font-semibold text-text-secondary transition hover:border-primary hover:text-primary"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
