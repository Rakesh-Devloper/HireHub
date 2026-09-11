import React, { useState } from 'react';
import { Search, MapPin, ArrowRight } from 'lucide-react';

export const JobSearch = ({ onSearch, initialValues = {} }) => {
  const [activeTab, setActiveTab] = useState(initialValues.jobType || 'Jobs');
  const [keyword, setKeyword] = useState(initialValues.keyword || '');
  const [location, setLocation] = useState(initialValues.location || '');

  const tabs = ['Jobs', 'Companies', 'Remote', 'Internships'];

  const popularSearches = [
    'React',
    'Node.js',
    'Python',
    'UI/UX',
    'Java',
    'Remote',
    'Data Analyst',
  ];

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (onSearch) {
      onSearch({
        keyword,
        location,
        jobType: activeTab,
      });
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (onSearch) {
      onSearch({
        keyword,
        location,
        jobType: tab,
      });
    }
  };

  const handlePopularClick = (item) => {
    if (item === 'Remote') {
      setActiveTab('Remote');
      if (onSearch) onSearch({ keyword, location: 'Remote', jobType: 'Remote' });
    } else {
      setKeyword(item);
      if (onSearch) onSearch({ keyword: item, location, jobType: activeTab });
    }
  };

  return (
    <div className="w-full max-w-3xl">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab
                ? 'bg-[#6D4AFF] text-white shadow-sm shadow-indigo-500/20 glowing-btn'
                : 'bg-white/80 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Search Bar Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-slate-900 rounded-3xl p-2.5 sm:p-3 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-indigo-500/5 glowing-card flex flex-col md:flex-row items-center gap-2 transition-all focus-within:border-indigo-400 dark:focus-within:border-indigo-500"
      >
        {/* Keyword input */}
        <div className="flex items-center gap-3 px-3 py-2 w-full flex-1">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Job title, skills, or company"
            className="w-full bg-transparent border-none text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden"
          />
        </div>

        {/* Divider */}
        <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-800"></div>

        {/* Location input */}
        <div className="flex items-center gap-3 px-3 py-2 w-full flex-1">
          <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Place or City (e.g. Pune, London)"
            className="w-full bg-transparent border-none text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:w-auto px-7 py-3 rounded-2xl gradient-btn text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md glowing-btn text-white shrink-0"
        >
          <span>Search Jobs</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Popular Tags & Places */}
      <div className="space-y-2 mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 dark:text-slate-500 font-bold mr-1">Popular:</span>
          {popularSearches.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handlePopularClick(tag)}
              className="px-3 py-1 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-full border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-slate-400 dark:text-slate-500 font-bold mr-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#6D4AFF] dark:text-indigo-400" />
            Places:
          </span>
          {['Bengaluru', 'Pune', 'Mumbai', 'London', 'San Francisco', 'Remote'].map((place) => (
            <button
              key={place}
              type="button"
              onClick={() => {
                setLocation(place);
                if (onSearch) onSearch({ keyword, location: place, jobType: activeTab });
              }}
              className="px-2.5 py-0.5 bg-indigo-50/60 dark:bg-slate-800/80 hover:bg-indigo-100 dark:hover:bg-slate-800 text-indigo-700 dark:text-indigo-300 rounded-lg border border-indigo-100 dark:border-slate-700 transition-colors cursor-pointer text-[11px] font-bold"
            >
              {place}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
