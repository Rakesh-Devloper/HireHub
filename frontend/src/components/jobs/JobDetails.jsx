import React, { useState } from 'react';
import {
  MapPin,
  Briefcase,
  DollarSign,
  Calendar,
  Building2,
  Bookmark,
  Share2,
  CheckCircle2,
  Globe,
  Users,
} from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import jobService from '../../services/jobService.js';
import Button from '../ui/Button.jsx';
import { formatDate } from '../../utils/helpers.js';

export const JobDetailsView = ({ job, relatedJobs = [] }) => {
  const { openApplyModal, showToast } = useApp();
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(user?.savedJobs?.includes(job._id) || false);

  const handleSave = async () => {
    try {
      await jobService.toggleSaveJob(job._id);
      setIsSaved(!isSaved);
      showToast(isSaved ? 'Removed from saved jobs' : 'Job saved to your bookmarks!', 'success');
    } catch {
      setIsSaved(!isSaved);
      showToast(isSaved ? 'Removed from saved jobs' : 'Job saved to your bookmarks!', 'success');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Job link copied to clipboard!', 'success');
  };

  const companyLogo =
    job.company?.logo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company?.name || 'Tech')}&background=6D4AFF&color=fff&rounded=true`;

  const companyDomain = job.company?.website || `${(job.company?.name || 'company').toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

  return (
    <div className="space-y-8">
      {/* Top Hero Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 shadow-xs flex items-center justify-center shrink-0">
              <img
                src={companyLogo}
                alt={job.company?.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{job.company?.name}</span>
                {job.featured && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-indigo-50 dark:bg-indigo-950/70 text-[#6D4AFF] dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/60">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {job.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                  {job.jobType}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400" />
                  {job.salaryRange}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Posted {formatDate(job.createdAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSave}
              className={`p-3 rounded-2xl border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-200 dark:border-indigo-800 text-[#6D4AFF] dark:text-indigo-400'
                  : 'border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-[#6D4AFF] dark:fill-indigo-400' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Share job link"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <Button
              onClick={() => openApplyModal(job)}
              variant="primary"
              size="md"
              className="px-8 shadow-lg shadow-indigo-500/25 glowing-btn"
            >
              Apply For Position
            </Button>
          </div>
        </div>

        {/* Key Attributes Tags */}
        <div className="pt-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Required Skills & Tools
          </h4>
          <div className="flex flex-wrap gap-2">
            {(job.skills || []).map((skill, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 bg-slate-100/80 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold border border-slate-200 dark:border-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Description & Responsibilities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
            <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4">About The Role</h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 mb-6 whitespace-pre-line">
              {job.description}
            </p>

            {job.responsibilities && job.responsibilities.length > 0 && (
              <div className="mb-6">
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-3">
                  Key Responsibilities
                </h4>
                <ul className="space-y-2.5">
                  {job.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#6D4AFF] dark:text-indigo-400 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {job.requirements && job.requirements.length > 0 && (
              <div>
                <h4 className="text-base font-extrabold text-slate-900 dark:text-white mb-3">
                  Requirements & Qualifications
                </h4>
                <ul className="space-y-2.5">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Company Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors">
            <h4 className="text-base font-black text-slate-900 dark:text-white mb-4">About Company</h4>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center">
                <img src={companyLogo} alt={job.company?.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <h5 className="font-extrabold text-slate-900 dark:text-white text-sm">{job.company?.name}</h5>
                <span className="text-xs text-slate-400 dark:text-slate-400">Verified Employer Partner</span>
              </div>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-400">
                  <Globe className="w-4 h-4" /> Website
                </span>
                <span className="text-[#6D4AFF] dark:text-indigo-400 font-bold">{companyDomain}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-400">
                  <Users className="w-4 h-4" /> Organization Size
                </span>
                <span className="text-slate-700 dark:text-slate-300">{job.company?.size || '500+ Specialists'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsView;
