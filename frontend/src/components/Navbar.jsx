import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-[#0F2E34] border-b border-[#172A3A] px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#3AAFA9] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SD</span>
          </div>
          <h1 className="text-xl font-semibold text-[#F7F9FA]">Smart DevOps</h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#3AAFA9] rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {user?.name?.[0] || "U"}
              </span>
            </div>
            <span className="text-[#9FB3B6] text-sm">
              {user?.name || "User"}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#3AAFA9] hover:bg-[#66D2C7] text-white rounded-lg text-sm font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
