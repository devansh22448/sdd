import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Deployments", path: "/deployments" },
  { label: "Logs", path: "/logs" },
  { label: "Metrics", path: "/metrics" },
  { label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  return (
    <aside className="w-full max-w-[280px] shrink-0 rounded-[32px] border border-soft bg-card-bg p-6 shadow-panel lg:h-screen lg:sticky lg:top-6">
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-primary">
            Navigation
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-text-primary">
            Control Center
          </h2>
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block rounded-3xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-primary text-white shadow-glow"
                    : "text-text-secondary hover:bg-primary/10 hover:text-primary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
