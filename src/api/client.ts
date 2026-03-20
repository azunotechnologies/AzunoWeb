import axios, { AxiosInstance, AxiosError } from 'axios';

// API Base URL - configure based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create Axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Handle 401 Unauthorized - only redirect if user was trying to access admin endpoints
    if (error.response?.status === 401) {
      const url = error.config?.url || '';
      // Only redirect for admin endpoints, not for public data fetches
      if (url.includes('/admin') || url.includes('/careers/admin') || url.includes('/technologies/admin')) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/admin/login';
      }
    }

    // Handle other errors
    const message = (error.response?.data as any)?.message || error.message || 'An error occurred';

    return Promise.reject({
      status: error.response?.status,
      message: message,
      data: error.response?.data,
    });
  }
);

export default apiClient;
