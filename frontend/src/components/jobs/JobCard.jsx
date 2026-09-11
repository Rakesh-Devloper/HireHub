import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Bookmark, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import jobService from '../../services/jobService.js';
import { formatDate } from '../../utils/helpers.js';

export const JobCard = ({ job }) => {
  const navigate = useNavigate();
  const { openApplyModal, showToast } = useApp();
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(user?.savedJobs?.includes(job._id) || false);

  const handleSaveToggle = async (e) => {
    e.stopPropagation();
    try {
      await jobService.toggleSaveJob(job._id);
      setIsSaved(!isSaved);
      showToast(isSaved ? 'Removed from saved jobs' : 'Job saved to your bookmarks!', 'success');
    } catch {
      setIsSaved(!isSaved);
      showToast(isSaved ? 'Removed from saved jobs' : 'Job saved to your bookmarks!', 'success');
    }
  };

  const handleApplyClick = (e) => {
    e.stopPropagation();
    openApplyModal(job);
  };

  const companyLogo =
    job.company?.logo ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company?.name || 'Tech')}&background=6D4AFF&color=fff&rounded=true`;

  return (
    <div
      onClick={() => navigate(`/jobs/${job._id}`)}
      className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all duration-300 flex flex-col justify-between cursor-pointer group relative glowing-card"
    >
      {/* Top row: Logo, Company & Featured Badge, Save Icon */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xs p-2 flex items-center justify-center shrink-0">
              <img
                src={companyLogo}
                alt={job.company?.name}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.src = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg';
                }}
              />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block leading-tight">
                {job.company?.name}
              </span>
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-[#6D4AFF] dark:group-hover:text-indigo-400 transition-colors leading-snug">
                {job.title}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {job.featured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold bg-indigo-50 dark:bg-indigo-950/60 text-[#6D4AFF] dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
            <button
              onClick={handleSaveToggle}
              title={isSaved ? 'Remove from saved' : 'Save job'}
              className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                isSaved
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-[#6D4AFF] dark:text-indigo-400'
                  : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#6D4AFF]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Location & Salary */}
        <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            {job.location}
          </span>
          {job.salaryRange && (
            <span className="text-slate-700 dark:text-slate-300 font-bold bg-slate-100/70 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200/50 dark:border-slate-700/60">
              {job.salaryRange}
            </span>
          )}
        </div>

        {/* Skill Pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(job.skills || []).slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/80 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-semibold"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom row: Posted Date & Apply Now button */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 font-medium">
          <Clock className="w-3.5 h-3.5" />
          <span>{formatDate(job.createdAt)}</span>
        </div>

        <button
          onClick={handleApplyClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/50 text-[#6D4AFF] dark:text-indigo-300 hover:bg-[#6D4AFF] hover:text-white dark:hover:bg-[#6D4AFF] dark:hover:text-white font-extrabold text-xs transition-all cursor-pointer glowing-btn"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default JobCard;
