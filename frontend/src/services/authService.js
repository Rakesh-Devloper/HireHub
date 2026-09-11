import API from './api.js';

export const authService = {
  login: async (email, password) => {
    const res = await API.post('/auth/login', { email, password });
    return res.data;
  },

  register: async (userData) => {
    const res = await API.post('/auth/register', userData);
    return res.data;
  },

  logout: async () => {
    const res = await API.post('/auth/logout');
    return res.data;
  },

  getCurrentUser: async () => {
    const res = await API.get('/auth/me');
    return res.data;
  },

  forgotPassword: async (email) => {
    const res = await API.post('/auth/forgot-password', { email });
    return res.data;
  },

  resetPassword: async (token, email, newPassword) => {
    const res = await API.post(`/auth/reset-password/${token}`, { email, newPassword });
    return res.data;
  },

  updateProfile: async (profileData) => {
    const res = await API.put('/users/profile', profileData);
    return res.data;
  },

  changePassword: async (passwords) => {
    const res = await API.put('/users/change-password', passwords);
    return res.data;
  },
};

export default authService;
