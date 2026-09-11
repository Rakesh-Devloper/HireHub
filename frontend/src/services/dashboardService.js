import API from './api.js';

export const dashboardService = {
  getJobSeekerDashboard: async () => {
    const res = await API.get('/dashboard/jobseeker');
    return res.data;
  },

  getEmployerDashboard: async () => {
    const res = await API.get('/dashboard/employer');
    return res.data;
  },

  getAdminStats: async () => {
    const res = await API.get('/admin/stats');
    return res.data;
  },

  getAdminUsers: async () => {
    const res = await API.get('/admin/users');
    return res.data;
  },

  getAdminJobs: async () => {
    const res = await API.get('/admin/jobs');
    return res.data;
  },

  getAdminAnalytics: async () => {
    const res = await API.get('/admin/analytics');
    return res.data;
  },

  deleteUser: async (id) => {
    const res = await API.delete(`/admin/users/${id}`);
    return res.data;
  },
};

export default dashboardService;
