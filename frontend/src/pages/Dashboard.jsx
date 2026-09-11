import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Send,
  CalendarCheck,
  Award,
  Bookmark,
  Clock,
  MapPin,
  ExternalLink,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import dashboardService from '../services/dashboardService.js';
import applicationService from '../services/applicationService.js';
import Loader from '../components/common/Loader.jsx';
import Button from '../components/ui/Button.jsx';
import UserAvatar from '../components/common/UserAvatar.jsx';
import ProfileStrength from '../components/dashboard/ProfileStrength.jsx';
import ApplicationChart from '../components/dashboard/ApplicationChart.jsx';
import SkillsChart from '../components/dashboard/SkillsChart.jsx';
import { formatDate, getStatusBadgeColor } from '../utils/helpers.js';

export const Dashboard = () => {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState('applications'); // 'applications' | 'saved'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const [dashRes, appsRes] = await Promise.all([
          dashboardService.getJobSeekerDashboard(),
          applicationService.getMyApplications().catch(() => ({ data: [] })),
        ]);
        if (dashRes?.data) setData(dashRes.data);
        if (appsRes?.data) setApplications(appsRes.data);
      } catch (err) {
        console.error('Dashboard load error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <Loader text="Loading your dashboard..." />;

  const stats = data?.stats || {
    totalApplications: applications?.length || 0,
    underReview: 0,
    interviewScheduled: 0,
    offers: 0,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#6D4AFF] via-indigo-600 to-[#3B82F6] rounded-3xl p-6 sm:p-8 text-white shadow-xl shadow-indigo-500/15 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <UserAvatar
            src={user?.profileImage}
            name={user?.name}
            size="lg"
            className="ring-4 ring-white/30"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black">
              Welcome back{user?.name ? `, ${user.name}` : ""}! 👋
            </h1>
            <p className="text-xs sm:text-sm text-white/90 mt-1 font-medium">
              You have {stats.interviewScheduled} upcoming interviews and {stats.offers} pending offers.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <Link to="/profile">
            <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white text-slate-800 shadow-md">
              Edit Profile
            </Button>
          </Link>
          <Link to="/jobs">
            <Button variant="primary" size="sm" className="bg-white text-[#6D4AFF] hover:bg-slate-100 shadow-md font-bold glowing-btn">
              Browse More Jobs
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4 glowing-card transition-all">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-[#6D4AFF] dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {stats.totalApplications}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Applied Jobs
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4 glowing-card transition-all">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {stats.underReview}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Under Review
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4 glowing-card transition-all">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
            <CalendarCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {stats.interviewScheduled}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Interviews
            </span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4 glowing-card transition-all">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
              {stats.offers}
            </span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">
              Job Offers
            </span>
          </div>
        </div>
      </div>

      {/* Analytics & Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ProfileStrength user={user} />
        <ApplicationChart applications={applications.length > 0 ? applications : data?.recentApplications} />
        <SkillsChart />
      </div>

      {/* Tabs: My Applications vs Saved Jobs */}
      <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'applications'
              ? 'bg-[#6D4AFF] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          My Applications ({applications.length || data?.recentApplications?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
            activeTab === 'saved'
              ? 'bg-[#6D4AFF] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          Saved Bookmarks ({data?.savedJobsList?.length || 0})
        </button>
      </div>

      {/* Applications Table */}
      {activeTab === 'applications' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white">Submitted Applications</h3>
            <span className="text-xs font-bold text-slate-400">Real-time status updates</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-6">Company & Position</th>
                  <th className="py-3.5 px-6">Applied Date</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold">
                {(applications.length > 0 ? applications : data?.recentApplications || []).map(
                  (app) => (
                    <tr key={app._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={
                              app.job?.company?.logo ||
                              'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg'
                            }
                            alt=""
                            className="w-10 h-10 object-contain rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-1"
                          />
                          <div>
                            <p className="font-extrabold text-slate-900 dark:text-white text-sm">
                              {app.job?.title || 'Senior Software Engineer'}
                            </p>
                            <p className="text-slate-400 text-xs">
                              {app.job?.company?.name || 'Technology Partner'} • {app.job?.location || 'Remote'}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                        {formatDate(app.appliedAt || app.createdAt)}
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

                      <td className="py-4 px-6 text-right">
                        <Link
                          to={`/jobs/${app.job?._id || app.job}`}
                          className="inline-flex items-center gap-1 text-[#6D4AFF] dark:text-indigo-400 hover:underline font-bold"
                        >
                          <span>View Job</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Saved Bookmarks */}
      {activeTab === 'saved' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data?.savedJobsList || []).map((job) => (
            <div
              key={job._id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-1 flex items-center justify-center">
                    <img src={job.company?.logo} alt="" className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                    {job.location}
                  </span>
                </div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base mb-1">{job.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{job.company?.name}</p>
              </div>
              <Link to={`/jobs/${job._id}`}>
                <Button variant="primary" size="sm" className="w-full justify-center">
                  View Opportunity
                </Button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
