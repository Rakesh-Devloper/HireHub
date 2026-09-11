import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Briefcase, Search, MapPin, SlidersHorizontal, X } from 'lucide-react';
import JobCard from '../components/jobs/JobCard.jsx';
import JobFilter from '../components/jobs/JobFilter.jsx';
import SearchInput from '../components/ui/SearchInput.jsx';
import Loader from '../components/common/Loader.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import jobService from '../services/jobService.js';

export const Jobs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const initialKeyword = searchParams.get('keyword') || '';
  const [searchInput, setSearchInput] = useState(initialKeyword);

  const [filters, setFilters] = useState({
    keyword: initialKeyword,
    location: searchParams.get('location') || '',
    category: searchParams.get('category') || '',
    jobType: searchParams.get('jobType') || '',
    experienceLevel: searchParams.get('experienceLevel') || '',
    remote: searchParams.get('remote') || '',
  });

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filters.keyword) params.keyword = filters.keyword;
      if (filters.location) params.location = filters.location;
      if (filters.category) params.category = filters.category;
      if (filters.jobType) params.jobType = filters.jobType;
      if (filters.experienceLevel) params.experienceLevel = filters.experienceLevel;
      if (filters.remote) params.remote = filters.remote;

      const res = await jobService.getJobs(params);
      if (res?.data) {
        setJobs(res.data);
        setTotalJobs(res.total ?? res.data.length);
      }
    } catch (err) {
      console.error('Fetch jobs error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Sync state from URL params
  useEffect(() => {
    const kw = searchParams.get('keyword') || '';
    setSearchInput(kw);
    setFilters({
      keyword: kw,
      location: searchParams.get('location') || '',
      category: searchParams.get('category') || '',
      jobType: searchParams.get('jobType') || '',
      experienceLevel: searchParams.get('experienceLevel') || '',
      remote: searchParams.get('remote') || '',
    });
  }, [searchParams]);

  // Fetch when filters change
  useEffect(() => {
    fetchJobs();
  }, [filters]);

  // Debounce search input typing to filters.keyword
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== filters.keyword) {
        updateFiltersAndParams({ ...filters, keyword: searchInput });
      }
    }, 280);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const updateFiltersAndParams = (newFilters) => {
    setFilters(newFilters);
    const newParams = new URLSearchParams();
    if (newFilters.keyword) newParams.set('keyword', newFilters.keyword);
    if (newFilters.location) newParams.set('location', newFilters.location);
    if (newFilters.category) newParams.set('category', newFilters.category);
    if (newFilters.jobType) newParams.set('jobType', newFilters.jobType);
    if (newFilters.experienceLevel) newParams.set('experienceLevel', newFilters.experienceLevel);
    if (newFilters.remote) newParams.set('remote', String(newFilters.remote));
    setSearchParams(newParams);
  };

  const handleFilterChange = (newFilters) => {
    updateFiltersAndParams(newFilters);
  };

  const handleResetFilters = () => {
    const emptyFilters = {
      keyword: '',
      location: '',
      category: '',
      jobType: '',
      experienceLevel: '',
      remote: '',
    };
    setSearchInput('');
    setFilters(emptyFilters);
    setSearchParams({});
  };

  const removeSingleFilter = (key) => {
    if (key === 'keyword') setSearchInput('');
    updateFiltersAndParams({ ...filters, [key]: '' });
  };

  const hasActiveFilters = Boolean(
    filters.keyword ||
    filters.location ||
    filters.category ||
    filters.jobType ||
    filters.experienceLevel ||
    filters.remote
  );

  const quickPlaces = [
    { label: 'All Places', value: '' },
    { label: 'Bengaluru', value: 'Bengaluru' },
    { label: 'Hyderabad', value: 'Hyderabad' },
    { label: 'Pune', value: 'Pune' },
    { label: 'Mumbai', value: 'Mumbai' },
    { label: 'Delhi NCR', value: 'Delhi' },
    { label: 'San Francisco', value: 'San Francisco' },
    { label: 'New York', value: 'New York' },
    { label: 'London', value: 'London' },
    { label: 'Tokyo', value: 'Tokyo' },
    { label: 'Remote', value: 'Remote' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Browse All Jobs
          </h1>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
            Showing {jobs.length} of {totalJobs} active career opportunities
            {filters.location && (
              <span className="ml-2 inline-flex items-center gap-1 text-xs font-bold text-[#6D4AFF] dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
                <MapPin className="w-3 h-3" />
                in {filters.location}
              </span>
            )}
          </p>
        </div>

        {/* Mobile Filter Toggle Button */}
        <button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-black text-slate-700 dark:text-slate-200 shadow-xs cursor-pointer"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#6D4AFF]" />
          <span>{showMobileFilter ? 'Hide Filters' : 'Filter Opportunities'}</span>
        </button>
      </div>

      {/* Main Layout: Filters Sidebar + Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filters (Sidebar on desktop, expandable on mobile) */}
        <div className={`lg:col-span-1 ${showMobileFilter ? 'block' : 'hidden lg:block'}`}>
          <JobFilter
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
          />
        </div>

        {/* Right Jobs List */}
        <div className="lg:col-span-3 space-y-5">
          {/* Quick Places Pills Bar */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-[#6D4AFF] dark:text-indigo-400" />
              <span>Filter by Popular Place:</span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {quickPlaces.map((place) => {
                const isActive =
                  (!filters.location && !place.value) ||
                  (filters.location && filters.location.toLowerCase().includes(place.value.toLowerCase()));
                return (
                  <button
                    key={place.label}
                    onClick={() => {
                      updateFiltersAndParams({ ...filters, location: place.value });
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#6D4AFF] text-white shadow-xs scale-105 glowing-btn'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    {place.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Industry Pills Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[
              { label: 'All Industries', value: '' },
              { label: 'Engineering & Tech', value: 'Software Development' },
              { label: 'Product & Design', value: 'Design & Creative' },
              { label: 'Marketing', value: 'Marketing' },
              { label: 'Data & Analytics', value: 'Data & Analytics' },
              { label: 'Product Management', value: 'Product Management' },
              { label: 'Finance', value: 'Finance' },
            ].map((cat) => {
              const isActive =
                (!filters.category && !cat.value) ||
                (filters.category && filters.category.toLowerCase() === cat.value.toLowerCase());
              return (
                <button
                  key={cat.label}
                  onClick={() => {
                    updateFiltersAndParams({ ...filters, category: cat.value });
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#6D4AFF] text-white shadow-xs'
                      : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Top Search Bar & Search Action */}
          <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center gap-2 sm:gap-3 glowing-card transition-colors">
            <div className="flex-1">
              <SearchInput
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onClear={() => {
                  setSearchInput('');
                  updateFiltersAndParams({ ...filters, keyword: '' });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    updateFiltersAndParams({ ...filters, keyword: searchInput.trim() });
                  }
                }}
                placeholder="Search job titles, skills (e.g. React, Python), or companies (e.g. Google)..."
              />
            </div>
            <button
              onClick={() => updateFiltersAndParams({ ...filters, keyword: searchInput.trim() })}
              className="px-4 py-3 bg-[#6D4AFF] hover:bg-[#5A3AE0] text-white text-xs font-black rounded-2xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500">Active Filters:</span>

              {filters.keyword && (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 bg-indigo-50 dark:bg-indigo-950/70 text-[#6D4AFF] dark:text-indigo-400 rounded-full border border-indigo-200 dark:border-indigo-800">
                  <span>Keyword: "{filters.keyword}"</span>
                  <button
                    onClick={() => removeSingleFilter('keyword')}
                    className="hover:text-rose-500 cursor-pointer ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.location && (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <MapPin className="w-3 h-3" />
                  <span>{filters.location}</span>
                  <button
                    onClick={() => removeSingleFilter('location')}
                    className="hover:text-rose-500 cursor-pointer ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.category && (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-400 rounded-full border border-sky-200 dark:border-sky-800">
                  <span>Category: {filters.category}</span>
                  <button
                    onClick={() => removeSingleFilter('category')}
                    className="hover:text-rose-500 cursor-pointer ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.jobType && (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 bg-amber-50 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 rounded-full border border-amber-200 dark:border-amber-800">
                  <span>Type: {filters.jobType}</span>
                  <button
                    onClick={() => removeSingleFilter('jobType')}
                    className="hover:text-rose-500 cursor-pointer ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.experienceLevel && (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 bg-purple-50 dark:bg-purple-950/70 text-purple-700 dark:text-purple-400 rounded-full border border-purple-200 dark:border-purple-800">
                  <span>Level: {filters.experienceLevel}</span>
                  <button
                    onClick={() => removeSingleFilter('experienceLevel')}
                    className="hover:text-rose-500 cursor-pointer ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {filters.remote && (
                <span className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1 bg-teal-50 dark:bg-teal-950/70 text-teal-700 dark:text-teal-400 rounded-full border border-teal-200 dark:border-teal-800">
                  <span>Remote Only</span>
                  <button
                    onClick={() => removeSingleFilter('remote')}
                    className="hover:text-rose-500 cursor-pointer ml-1"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-rose-500 hover:text-rose-700 underline cursor-pointer ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {loading ? (
            <Loader text="Searching positions..." />
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No jobs match your criteria"
              description="Try clearing some filters or searching with different keywords or places."
              actionText="Reset All Filters"
              onAction={handleResetFilters}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
