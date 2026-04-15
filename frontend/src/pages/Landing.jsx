import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Landing = () => {
  const { user, logout } = useAuth();

  const handleGithubLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/github";
  };

  return (
    <div className="min-h-screen bg-dark-bg text-text-primary">
      {/* Navbar */}
      <header className="sticky top-0 z-20 border-b border-soft bg-dark-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white font-semibold">
              SD
            </div>
            <span className="text-xl font-semibold text-text-primary">Smart DevOps</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/" className="text-text-secondary hover:text-primary transition">Home</Link>
            <Link to="/deployments" className="text-text-secondary hover:text-primary transition">Deployments</Link>
            <Link to="/logs" className="text-text-secondary hover:text-primary transition">Logs</Link>
            <Link to="/metrics" className="text-text-secondary hover:text-primary transition">Analytics</Link>
          </nav>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-light-purple hover:shadow-glow"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="rounded-2xl border border-soft px-4 py-2 text-sm font-semibold text-text-secondary transition hover:border-primary hover:text-primary"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-2xl bg-primary px-6 py-2 text-sm font-semibold text-white transition hover:bg-light-purple hover:shadow-glow"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-highlight-pink/10 via-transparent to-transparent"></div>
        <div className="relative mx-auto max-w-[1200px] px-6 text-center">
          <h1 className="text-5xl font-bold leading-tight md:text-7xl">
            <span className="gradient-text">SMART DEVOPS</span>
            <br />
            <span className="text-text-primary">DASHBOARD</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-text-secondary md:text-xl">
            Automate your CI/CD pipeline with intelligent deployment tracking, real-time logs, and powerful analytics.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {user ? (
              <Link
                to="/dashboard"
                className="rounded-3xl bg-primary px-8 py-4 text-lg font-semibold text-white transition hover:bg-light-purple hover:shadow-glow"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="rounded-3xl bg-primary px-8 py-4 text-lg font-semibold text-white transition hover:bg-light-purple hover:shadow-glow"
              >
                Get Started
              </Link>
            )}
            <button
              onClick={handleGithubLogin}
              className="flex items-center gap-3 rounded-3xl border border-soft px-8 py-4 text-lg font-semibold text-text-primary transition hover:border-primary hover:bg-card-bg/50"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              Continue with GitHub
            </button>
          </div>
        </div>
      </section>

      {/* Deployments Section */}
      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Features</p>
            <h2 className="mt-2 text-3xl font-bold text-text-primary">Deployments</h2>
            <p className="mt-4 text-text-secondary">Track and manage your deployment pipeline with ease</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Real-time Tracking", desc: "Monitor deployment status in real-time", icon: "🚀" },
              { title: "History Log", desc: "Keep a complete history of all deployments", icon: "📋" },
              { title: "Status Alerts", desc: "Get instant notifications on deployment changes", icon: "🔔" },
            ].map((item, i) => (
              <div key={i} className="group rounded-3xl border border-soft bg-card-bg p-8 transition hover:border-primary hover:shadow-glow">
                <div className="mb-4 text-4xl">{item.icon}</div>
                <h3 className="text-xl font-semibold text-text-primary">{item.title}</h3>
                <p className="mt-2 text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Analytics</p>
            <h2 className="mt-2 text-3xl font-bold text-text-primary">Metrics</h2>
            <p className="mt-4 text-text-secondary">Gain insights into your deployment performance</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-soft bg-card-bg p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Success Rate</p>
                  <p className="mt-2 text-4xl font-bold text-success">98.5%</p>
                </div>
                <div className="h-16 w-16 rounded-full border-4 border-success/30 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-success/20"></div>
                </div>
              </div>
              <div className="mt-6 h-2 rounded-full bg-dark-bg">
                <div className="h-2 w-[98.5%] rounded-full bg-success"></div>
              </div>
            </div>
            <div className="rounded-3xl border border-soft bg-card-bg p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Total Deployments</p>
                  <p className="mt-2 text-4xl font-bold text-primary">247</p>
                </div>
                <div className="h-16 w-16 rounded-full border-4 border-primary/30 flex items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-primary/20"></div>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                {[60, 80, 45, 90, 70, 85, 95].map((h, i) => (
                  <div key={i} className="h-8 w-full rounded bg-primary/30" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logs Section */}
      <section className="py-20">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-primary">Monitoring</p>
            <h2 className="mt-2 text-3xl font-bold text-text-primary">Logs</h2>
            <p className="mt-4 text-text-secondary">Real-time log streaming and analysis</p>
          </div>
          <div className="rounded-3xl border border-soft bg-card-bg p-6 font-mono">
            <div className="flex items-center gap-2 border-b border-soft pb-4">
              <div className="h-3 w-3 rounded-full bg-error"></div>
              <div className="h-3 w-3 rounded-full bg-warning"></div>
              <div className="h-3 w-3 rounded-full bg-success"></div>
              <span className="ml-4 text-sm text-text-secondary">terminal</span>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <p><span className="text-success">✓</span> <span className="text-text-secondary">[2024-01-15 10:23:45]</span> Deployment started</p>
              <p><span className="text-info">ℹ</span> <span className="text-text-secondary">[2024-01-15 10:23:46]</span> Building container image...</p>
              <p><span className="text-info">ℹ</span> <span className="text-text-secondary">[2024-01-15 10:24:12]</span> Pushing to registry...</p>
              <p><span className="text-success">✓</span> <span className="text-text-secondary">[2024-01-15 10:24:45]</span> Deployment successful</p>
              <p className="text-primary animate-pulse">▊</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-soft bg-card-bg py-12">
        <div className="mx-auto max-w-[1200px] px-6">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white font-semibold">
                  SD
                </div>
                <span className="text-xl font-semibold text-text-primary">Smart DevOps</span>
              </div>
              <p className="mt-4 text-sm text-text-secondary">
                Modern CI/CD dashboard for developers
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text-primary">Product</h4>
              <ul className="mt-4 space-y-2">
                <li><Link to="/deployments" className="text-sm text-text-secondary hover:text-primary">Deployments</Link></li>
                <li><Link to="/logs" className="text-sm text-text-secondary hover:text-primary">Logs</Link></li>
                <li><Link to="/metrics" className="text-sm text-text-secondary hover:text-primary">Metrics</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text-primary">Resources</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">API Reference</a></li>
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-text-primary">Connect</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">GitHub</a></li>
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">Twitter</a></li>
                <li><a href="#" className="text-sm text-text-secondary hover:text-primary">Discord</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-soft pt-8 text-center">
            <p className="text-sm text-text-secondary">© 2024 Smart DevOps Dashboard. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;