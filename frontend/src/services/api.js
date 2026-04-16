import axios from "axios";

const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const apiBaseUrl = baseUrl.endsWith("/api")
  ? baseUrl
  : `${baseUrl.replace(/\/+$/, "")}/api`;

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
