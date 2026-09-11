import API from './api.js';

export const applicationService = {
  applyForJob: async (applicationData) => {
    const res = await API.post('/applications', applicationData);
    return res.data;
  },

  getMyApplications: async () => {
    const res = await API.get('/applications/my-applications');
    return res.data;
  },

  getApplicationsForJob: async (jobId) => {
    const res = await API.get(`/applications/job/${jobId}`);
    return res.data;
  },

  updateStatus: async (applicationId, status) => {
    const res = await API.put(`/applications/${applicationId}/status`, { status });
    return res.data;
  },
};

export default applicationService;
