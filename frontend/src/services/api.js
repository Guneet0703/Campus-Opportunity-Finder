import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the JWT token (if present) to every outgoing request.
api.interceptors.request.use((config) => {
  try {
    const raw = localStorage.getItem('cof_auth');
    if (raw) {
      const { token } = JSON.parse(raw);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  } catch {
    // ignore malformed storage
  }
  return config;
});

// Normalize error responses so callers can rely on a consistent shape.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject(error.response.data || { message: 'Something went wrong. Please try again.' });
    }
    if (error.request) {
      return Promise.reject({ message: 'Unable to reach the server. Please check your connection.' });
    }
    return Promise.reject({ message: error.message || 'Something went wrong. Please try again.' });
  }
);

export default api;
