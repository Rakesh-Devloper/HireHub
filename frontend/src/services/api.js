import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('hirehub_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // If token expired, optionally clear local storage
      localStorage.removeItem('hirehub_token');
      localStorage.removeItem('hirehub_user');
    }
    return Promise.reject(error);
  }
);

export const uploadFile = async (file, fieldName = 'file', endpoint = '/upload') => {
  const formData = new FormData();
  formData.append(fieldName, file);
  const response = await API.post(endpoint, formData);
  return response.data;
};

export default API;
