import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Send, CalendarCheck, Award } from 'lucide-react';
import Button from '../ui/Button.jsx';

export const WelcomeCard = ({ stats, userName = '' }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <span>Welcome Back!</span>
          <span>👋</span>
        </h3>
      </div>
      <p className="text-xs font-semibold text-slate-400 dark:text-slate-400 mb-5">
        Track your applications and grow your career.
      </p>

      {/* 3 Quick Stats columns matching screenshot */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {/* Applied */}
        <div className="bg-slate-50/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-2xl p-3.5 flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-xl bg-cyan-100/70 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-1.5 shadow-2xs">
            <Send className="w-4 h-4" />
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            {stats?.applied || 12}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 mt-0.5">
            Applied
          </span>
        </div>

        {/* Interviews */}
        <div className="bg-slate-50/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-2xl p-3.5 flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-xl bg-purple-100/70 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-1.5 shadow-2xs">
            <CalendarCheck className="w-4 h-4" />
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            {stats?.interviews || 3}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 mt-0.5">
            Interviews
          </span>
        </div>

        {/* Offers */}
        <div className="bg-slate-50/70 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 rounded-2xl p-3.5 flex flex-col items-center text-center">
          <div className="w-8 h-8 rounded-xl bg-emerald-100/70 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5 shadow-2xs">
            <Award className="w-4 h-4" />
          </div>
          <span className="text-xl font-black text-slate-900 dark:text-white leading-tight">
            {stats?.offers || 2}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 mt-0.5">
            Offers
          </span>
        </div>
      </div>

      {/* View Dashboard Button */}
      <Button
        onClick={() => navigate('/dashboard')}
        variant="primary"
        size="md"
        className="w-full justify-center shadow-md shadow-indigo-500/20 glowing-btn"
      >
        <span>View Dashboard</span>
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default WelcomeCard;
