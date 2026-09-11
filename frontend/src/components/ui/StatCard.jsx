import React from 'react';

export const StatCard = ({
  icon: Icon,
  number,
  label,
  iconColor = 'text-indigo-600 dark:text-indigo-400',
  iconBg = 'bg-indigo-50 dark:bg-indigo-950/60',
  className = '',
}) => {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-black/40 ${className}`}
    >
      <div
        className={`w-14 h-14 rounded-2xl ${iconBg} ${iconColor} flex items-center justify-center shrink-0 shadow-xs`}
      >
        <Icon className="w-6 h-6 stroke-[2.2]" />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          {number}
        </span>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
          {label}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
