import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ProgressCircle from '../ui/ProgressCircle.jsx';

export const ProfileStrength = ({
  percentage = 85,
  label = 'Excellent!',
  checklist = {
    profileCompleted: true,
    resumeUploaded: true,
    skillsAdded: true,
    readyToApply: true,
  },
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors">
      <h3 className="text-base font-black text-slate-900 dark:text-white mb-5">
        Your Profile Strength
      </h3>

      <div className="flex items-center gap-6 mb-6">
        {/* Circle Progress */}
        <div className="flex flex-col items-center shrink-0">
          <ProgressCircle percentage={percentage} size={110} strokeWidth={9} />
          <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
            {label}
          </span>
        </div>

        {/* Checklist */}
        <div className="space-y-2 text-xs font-bold text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Profile completed</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Resume uploaded</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Skills added</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Ready to apply</span>
          </div>
        </div>
      </div>

      {/* Action link */}
      <button
        onClick={() => navigate('/profile')}
        className="w-full py-2.5 rounded-2xl border border-indigo-100 dark:border-indigo-900/60 bg-indigo-50/60 dark:bg-indigo-950/40 hover:bg-indigo-50 dark:hover:bg-indigo-900/60 text-[#6D4AFF] dark:text-indigo-400 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors cursor-pointer glowing-btn"
      >
        <span>Improve Profile</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default ProfileStrength;
