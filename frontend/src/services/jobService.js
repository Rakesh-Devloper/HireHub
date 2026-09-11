import API from './api.js';

export const jobService = {
  getJobs: async (params = {}) => {
    const res = await API.get('/jobs', { params });
    return res.data;
  },

  getJobById: async (id) => {
    const res = await API.get(`/jobs/${id}`);
    return res.data;
  },

  createJob: async (jobData) => {
    const res = await API.post('/jobs', jobData);
    return res.data;
  },

  updateJob: async (id, jobData) => {
    const res = await API.put(`/jobs/${id}`, jobData);
    return res.data;
  },

  deleteJob: async (id) => {
    const res = await API.delete(`/jobs/${id}`);
    return res.data;
  },

  getMyJobs: async () => {
    const res = await API.get('/jobs/my-jobs');
    return res.data;
  },

  getCategories: async () => {
    const res = await API.get('/jobs/categories');
    return res.data;
  },

  toggleSaveJob: async (jobId) => {
    const res = await API.post(`/users/save-job/${jobId}`);
    return res.data;
  },

  getSavedJobs: async () => {
    const res = await API.get('/users/saved-jobs');
    return res.data;
  },
};

export default jobService;
