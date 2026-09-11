import React from 'react';
import { Filter, RotateCcw, MapPin, Briefcase, Layers, GraduationCap, Globe } from 'lucide-react';

export const JobFilter = ({ filters, onFilterChange, onReset }) => {
  const jobTypes = ['All', 'Full Time', 'Part Time', 'Remote', 'Internships'];
  const experienceLevels = ['All', 'Entry Level', 'Mid Level', 'Senior Level', 'Lead / Director'];
  const categories = [
    'All',
    'Software Development',
    'Data & Analytics',
    'Design & Creative',
    'Product Management',
    'Marketing',
    'Finance',
    'Human Resources',
    'Customer Support',
  ];

  const popularPlaces = [
    { label: 'All Places', value: '' },
    { label: 'Bengaluru, India', value: 'Bengaluru' },
    { label: 'Hyderabad, India', value: 'Hyderabad' },
    { label: 'Pune, India', value: 'Pune' },
    { label: 'Mumbai, India', value: 'Mumbai' },
    { label: 'Delhi NCR, India', value: 'Delhi' },
    { label: 'San Francisco, CA', value: 'San Francisco' },
    { label: 'New York, NY', value: 'New York' },
    { label: 'Seattle, WA', value: 'Seattle' },
    { label: 'Austin, TX', value: 'Austin' },
    { label: 'London, UK', value: 'London' },
    { label: 'Berlin, Germany', value: 'Berlin' },
    { label: 'Singapore', value: 'Singapore' },
    { label: 'Tokyo, Japan', value: 'Tokyo' },
    { label: 'Remote', value: 'Remote' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors">
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-base">
          <Filter className="w-4 h-4 text-[#6D4AFF] dark:text-indigo-400" />
          <span>Filters</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs font-bold text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Places / Location Filter */}
      <div className="mb-6">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2.5">
          <MapPin className="w-3.5 h-3.5 text-[#6D4AFF] dark:text-indigo-400" />
          <span>Places & Locations</span>
        </label>

        {/* Location search text input */}
        <input
          type="text"
          value={filters.location || ''}
          onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          placeholder="Type city (e.g. Pune, London)..."
          className="w-full text-xs font-semibold text-slate-800 dark:text-slate-200 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 mb-2.5 focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500 transition-colors"
        />

        {/* Quick Places select dropdown */}
        <select
          value={filters.location || ''}
          onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          className="w-full text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500 cursor-pointer transition-colors"
        >
          {popularPlaces.map((place) => (
            <option key={place.label} value={place.value}>
              {place.label}
            </option>
          ))}
        </select>
      </div>

      {/* Job Type */}
      <div className="mb-6">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2.5">
          <Briefcase className="w-3.5 h-3.5 text-[#6D4AFF] dark:text-indigo-400" />
          <span>Job Type</span>
        </label>
        <div className="space-y-1.5">
          {jobTypes.map((type) => (
            <label
              key={type}
              className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <input
                type="radio"
                name="jobType"
                checked={filters.jobType === type || (!filters.jobType && type === 'All')}
                onChange={() => onFilterChange({ ...filters, jobType: type === 'All' ? '' : type })}
                className="text-[#6D4AFF] focus:ring-indigo-500 rounded-full"
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2.5">
          <Layers className="w-3.5 h-3.5 text-[#6D4AFF] dark:text-indigo-400" />
          <span>Category</span>
        </label>
        <select
          value={filters.category || 'All'}
          onChange={(e) => onFilterChange({ ...filters, category: e.target.value === 'All' ? '' : e.target.value })}
          className="w-full text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500 transition-colors cursor-pointer"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Experience Level */}
      <div className="mb-6">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider mb-2.5">
          <GraduationCap className="w-3.5 h-3.5 text-[#6D4AFF] dark:text-indigo-400" />
          <span>Experience Level</span>
        </label>
        <div className="space-y-1.5">
          {experienceLevels.map((lvl) => (
            <label
              key={lvl}
              className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              <input
                type="radio"
                name="experienceLevel"
                checked={filters.experienceLevel === lvl || (!filters.experienceLevel && lvl === 'All')}
                onChange={() => onFilterChange({ ...filters, experienceLevel: lvl === 'All' ? '' : lvl })}
                className="text-[#6D4AFF] focus:ring-indigo-500 rounded-full"
              />
              <span>{lvl}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Remote Only Toggle */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
            <Globe className="w-3.5 h-3.5 text-emerald-500" />
            Remote Only
          </span>
          <input
            type="checkbox"
            checked={filters.remote === 'true' || filters.remote === true}
            onChange={(e) => onFilterChange({ ...filters, remote: e.target.checked })}
            className="w-4 h-4 text-[#6D4AFF] rounded-md focus:ring-indigo-500 cursor-pointer"
          />
        </label>
      </div>
    </div>
  );
};

export default JobFilter;
