const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "An error occurred" }));
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

export const api = {
  // Auth endpoints
  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return handleResponse(response);
  },

  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return handleResponse(response);
  },

  // Deployment endpoints
  getDeployments: async () => {
    const response = await fetch(`${API_BASE_URL}/deployments`, {
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(response);
  },

  getDeployment: async (id) => {
    const response = await fetch(`${API_BASE_URL}/deployments/${id}`, {
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(response);
  },

  createDeployment: async (data) => {
    const response = await fetch(`${API_BASE_URL}/deployments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  // Environment endpoints
  getEnvironments: async () => {
    const response = await fetch(`${API_BASE_URL}/environments`, {
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(response);
  },

  // Metrics endpoints
  getMetrics: async () => {
    const response = await fetch(`${API_BASE_URL}/metrics`, {
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(response);
  },

  // Logs endpoints
  getLogs: async (filters = {}) => {
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/logs?${params}`, {
      headers: { ...getAuthHeaders() },
    });
    return handleResponse(response);
  },
};

export default api;
