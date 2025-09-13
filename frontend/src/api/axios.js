import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
   baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:3000',
   timeout: 10000,
   headers: {
      'Content-Type': 'application/json',
   },
});

// Request interceptor
api.interceptors.request.use(
   (config) => {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
   },
   (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
   }
);

// Response interceptor
api.interceptors.response.use(
   (response) => {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
      return response;
   },
   (error) => {
      console.error('❌ Response Error:', error.response?.data || error.message);
      return Promise.reject(error);
   }
);

export default api;