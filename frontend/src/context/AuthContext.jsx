import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session
    const token = localStorage.getItem("token");
    if (token) {
      // In a real app, you'd validate the token with the backend
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setUser(userData);
      }
    }
    setLoading(false);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  // eslint-disable-next-line no-unused-vars
  const register = async (username, email, PASS) => {
    try {
      // Simulate API call for demo
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful registration
      const mockUser = { id: Date.now(), name: username, email };
      const mockToken = "mock-register-token-" + Date.now();

      // Auto-login after register
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      setUser(mockUser);

      return { success: true, message: "Registration successful!" };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
