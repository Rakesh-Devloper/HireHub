import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Users,
  Plus,
  Calendar,
  CheckCircle,
  XCircle,
  FileText,
  ExternalLink,
} from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import Modal from '../components/common/Modal.jsx';
import Loader from '../components/common/Loader.jsx';
import UserAvatar from '../components/common/UserAvatar.jsx';
import dashboardService from '../services/dashboardService.js';
import jobService from '../services/jobService.js';
import applicationService from '../services/applicationService.js';
import { useApp } from '../context/AppContext.jsx';
import { formatDate, getStatusBadgeColor } from '../utils/helpers.js';

export const EmployerDashboard = () => {
  const { showToast } = useApp();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);

  // New Job Form State
  const [jobForm, setJobForm] = useState({
    title: '',
    company: 'Google',
    category: 'Software Development',
    jobType: 'Full Time',
    location: 'Bengaluru, India',
    salaryRange: '$120,000 - $150,000',
    description: '',
    requirements: '',
    skills: 'React, Node.js, TypeScript',
  });

  const fetchEmployerData = async () => {
    setLoading(true);
    try {
      const res = await dashboardService.getEmployerDashboard();
      if (res?.data) setData(res.data);
    } catch (err) {
      console.error('Employer dash error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployerData();
  }, []);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...jobForm,
        companyName: jobForm.company,
        skills: jobForm.skills.split(',').map((s) => s.trim()),
        requirements: jobForm.requirements ? jobForm.requirements.split('\n').filter(Boolean) : [],
      };
      await jobService.createJob(payload);
      showToast('New job opportunity posted successfully!', 'success');
      setIsPostJobOpen(false);
      fetchEmployerData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to post job', 'danger');
    }
  };

  const handleUpdateStatus = async (appId, newStatus) => {
    try {
      await applicationService.updateStatus(appId, newStatus);
      showToast(`Updated application status to "${newStatus}"`, 'success');
      fetchEmployerData();
    } catch (err) {
      showToast('Failed to update status', 'danger');
    }
  };

  if (loading) return <Loader text="Loading Employer portal..." />;

  const stats = data?.stats || {
    totalJobsPosted: 0,
    activeJobs: 0,
    totalApplicants: 0,
    shortlistedCandidates: 0,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold text-[#6D4AFF] dark:text-indigo-400 uppercase tracking-wider">
            Employer Portal
          </span>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
            Talent & Recruitment Dashboard
          </h1>
        </div>

        <Button
          onClick={() => setIsPostJobOpen(true)}
          variant="primary"
          size="md"
          icon={Plus}
          className="shadow-lg shadow-indigo-500/20 glowing-btn"
        >
          Post New Position
        </Button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/70 text-[#6D4AFF] dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Briefcase className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {stats.activeJobs}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Active Job Posts
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/70 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {stats.totalApplicants}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Total Applicants
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/70 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {stats.shortlistedCandidates}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Shortlisted
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
              98%
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Response Rate
            </span>
          </div>
        </div>
      </div>

      {/* Recent Applicants Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden mb-8 transition-colors">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">Recent Candidate Applications</h3>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-400 mt-0.5">
              Review candidates and update recruitment pipeline statuses
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">Candidate</th>
                <th className="py-3.5 px-6">Applied Role</th>
                <th className="py-3.5 px-6">Resume</th>
                <th className="py-3.5 px-6">Status</th>
                <th className="py-3.5 px-6 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold">
              {(data?.recentApplications || []).map((app) => (
                <tr key={app._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={app.applicant} size="md" />
                      <div>
                        <p className="font-extrabold text-slate-900 dark:text-white text-sm">
                          {app.applicant?.name || 'Applicant'}
                        </p>
                        <p className="text-slate-400 dark:text-slate-400 text-xs">
                          {app.applicant?.email || 'Confidential'}{app.phone ? ` • ${app.phone}` : ''}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6 text-slate-700 dark:text-slate-200 font-bold">
                    {app.job?.title || 'Senior Software Engineer'}
                  </td>

                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 text-[#6D4AFF] dark:text-indigo-400 font-bold bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-100 dark:border-indigo-800/60 px-2.5 py-1 rounded-md">
                      <FileText className="w-3.5 h-3.5" />
                      PDF Resume
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold border ${getStatusBadgeColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleUpdateStatus(app._id, 'Interview')}
                      className="px-2.5 py-1 bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/60 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Interview
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(app._id, 'Offer')}
                      className="px-2.5 py-1 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Offer
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(app._id, 'Rejected')}
                      className="px-2.5 py-1 bg-rose-50 dark:bg-rose-950/70 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Post New Job Modal */}
      <Modal
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
        title="Post a New Job Opportunity"
      >
        <form onSubmit={handleCreateJob} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Job Title *
            </label>
            <input
              type="text"
              required
              value={jobForm.title}
              onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
              placeholder="e.g. Senior Frontend Engineer"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                value={jobForm.category}
                onChange={(e) => setJobForm({ ...jobForm, category: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
              >
                <option value="Software Development">Software Development</option>
                <option value="Data & Analytics">Data & Analytics</option>
                <option value="Design & Creative">Design & Creative</option>
                <option value="Product Management">Product Management</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Job Type *
              </label>
              <select
                value={jobForm.jobType}
                onChange={(e) => setJobForm({ ...jobForm, jobType: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
              >
                <option value="Full Time">Full Time</option>
                <option value="Part Time">Part Time</option>
                <option value="Remote">Remote</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Location *
              </label>
              <input
                type="text"
                required
                value={jobForm.location}
                onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                placeholder="e.g. Bengaluru, India or Remote"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Salary Range *
              </label>
              <input
                type="text"
                required
                value={jobForm.salaryRange}
                onChange={(e) => setJobForm({ ...jobForm, salaryRange: e.target.value })}
                placeholder="e.g. $130,000 - $160,000"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Required Skills (comma separated)
            </label>
            <input
              type="text"
              value={jobForm.skills}
              onChange={(e) => setJobForm({ ...jobForm, skills: e.target.value })}
              placeholder="React, Next.js, Node.js"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Job Description *
            </label>
            <textarea
              rows={4}
              required
              value={jobForm.description}
              onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
              placeholder="Describe the role mission and key impact..."
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
            ></textarea>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="secondary" size="md" onClick={() => setIsPostJobOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Publish Position
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EmployerDashboard;
