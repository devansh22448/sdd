import { NavLink } from "react-router-dom";
import { LayoutDashboard, Rocket, FileText, Settings } from "lucide-react";

const Sidebar = () => {
  const navItems = [
    { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/deployments", label: "Deployments", icon: Rocket },
    { path: "/logs", label: "Logs", icon: FileText },
    { path: "/settings", label: "Settings", icon: Settings },
  ];

  const getNavClass = (isActive) => {
    const baseClass =
      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200";
    const activeClass =
      "bg-devops-accent/20 text-devops-accent border border-devops-accent/30";
    const inactiveClass =
      "text-devops-text-secondary hover:bg-devops-bg hover:text-devops-text";
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <aside className="w-64 h-screen p-4">
      <div className="bg-gradient-to-b from-devops-card to-devops-bg rounded-2xl p-6 border border-devops-border shadow-2xl min-h-[calc(100vh-2rem)]">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-devops-accent rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-devops-accent/20">
            <span className="text-white font-bold text-lg">SD</span>
          </div>
          <h2 className="text-sm font-semibold text-devops-text">Smart DevOps</h2>
          <h3 className="text-xs text-devops-text-secondary">Depleyements</h3>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => getNavClass(isActive)}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
