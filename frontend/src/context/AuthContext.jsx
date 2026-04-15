import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const saveToken = (value) => {
    setToken(value);
    if (value) {
      localStorage.setItem("token", value);
    } else {
      localStorage.removeItem("token");
    }
  };

  const saveUser = (value) => {
    setUser(value);
    if (value) {
      localStorage.setItem("user", JSON.stringify(value));
    } else {
      localStorage.removeItem("user");
    }
  };

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const authToken =
      response.data.token ||
      response.data.accessToken ||
      response.data?.data?.token;
    const profile = response.data.user || response.data?.user || null;
    saveToken(authToken);
    saveUser(profile);
    return response.data;
  };

  const register = async (name, email, password) => {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    const authToken =
      response.data.token ||
      response.data.accessToken ||
      response.data?.data?.token;
    const profile = response.data.user || response.data?.user || null;
    saveToken(authToken);
    saveUser(profile);
    return response.data;
  };

  const logout = () => {
    saveToken(null);
    saveUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = useMemo(
    () => ({ token, user, login, logout, register, loading }),
    [token, user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
