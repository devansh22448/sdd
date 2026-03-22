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
      "bg-[#3AAFA9]/20 text-[#3AAFA9] border border-[#3AAFA9]/30";
    const inactiveClass =
      "text-[#9FB3B6] hover:bg-[#172A3A] hover:text-[#F7F9FA]";
    return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
  };

  return (
    <aside className="w-64 min-h-screen p-4">
      <div className="bg-gradient-to-b from-[#0F2E34] to-[#172A3A] rounded-2xl p-6 border border-[#172A3A] shadow-2xl min-h-[calc(100vh-2rem)]">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#3AAFA9] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#3AAFA9]/20">
            <span className="text-white font-bold text-lg">SD</span>
          </div>
          <h2 className="text-sm font-semibold text-[#F7F9FA]">Smart DevOps</h2>
          <h3 className="text-xs text-[#9FB3B6]">Depleyements</h3>
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
