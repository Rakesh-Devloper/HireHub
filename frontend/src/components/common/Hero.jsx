import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  MapPin,
  Briefcase,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Building2,
  SlidersHorizontal,
  ChevronDown,
  Star,
} from 'lucide-react';

export const Hero = ({ onSearch }) => {
  const navigate = useNavigate();

  // Search filter state
  const [activeTab, setActiveTab] = useState('All');
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('All Levels');
  const [isExpDropdownOpen, setIsExpDropdownOpen] = useState(false);

  const tabs = [
    { label: 'All Positions', value: 'All' },
    { label: 'Remote Only', value: 'Remote' },
    { label: 'Full Time', value: 'Full Time' },
    { label: 'Tech & Engineering', value: 'Engineering' },
    { label: 'Product & Design', value: 'Design' },
  ];

  const popularSearches = [
    { label: 'React', category: 'Software' },
    { label: 'Python', category: 'Backend' },
    { label: 'Node.js', category: 'Backend' },
    { label: 'Product Designer', category: 'Design' },
    { label: 'AI Engineer', category: 'AI/ML' },
    { label: 'Remote', category: 'Workstyle' },
    { label: 'Data Analyst', category: 'Analytics' },
  ];

  const experienceOptions = [
    'All Levels',
    'Entry Level (0-2 yrs)',
    'Mid Level (3-5 yrs)',
    'Senior Level (5-8 yrs)',
    'Lead / Executive (8+ yrs)',
  ];

  const handleExecuteSearch = (e) => {
    e?.preventDefault();
    const searchData = {
      keyword: keyword.trim(),
      location: location.trim(),
      jobType: activeTab === 'All' ? '' : activeTab,
      experience: experienceLevel === 'All Levels' ? '' : experienceLevel,
    };

    if (onSearch) {
      onSearch(searchData);
    } else {
      const params = new URLSearchParams();
      if (searchData.keyword) params.set('keyword', searchData.keyword);
      if (searchData.location) params.set('location', searchData.location);
      if (searchData.jobType) {
        if (searchData.jobType === 'Remote') params.set('remote', 'true');
        else params.set('jobType', searchData.jobType);
      }
      navigate(`/jobs?${params.toString()}`);
    }
  };

  const handlePopularTagClick = (tagLabel) => {
    if (tagLabel === 'Remote') {
      setActiveTab('Remote');
      if (onSearch) {
        onSearch({ keyword, location: 'Remote', jobType: 'Remote' });
      } else {
        navigate('/jobs?remote=true');
      }
    } else {
      setKeyword(tagLabel);
      if (onSearch) {
        onSearch({ keyword: tagLabel, location, jobType: activeTab === 'All' ? '' : activeTab });
      } else {
        navigate(`/jobs?keyword=${encodeURIComponent(tagLabel)}`);
      }
    }
  };

  return (
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background Animated Atmosphere */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none select-none">
        {/* Subtle geometric dot grid pattern with center radial mask */}
        <div 
          className="absolute inset-0 bg-subtle-grid opacity-60"
          style={{
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 40%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 40%, transparent 80%)',
          }}
        />

        {/* Primary Animated Ambient Light Orbs */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-[#6D4AFF]/18 via-[#8B5CF6]/12 to-transparent rounded-full blur-3xl animate-hero-orb-drift" />
        <div className="absolute top-28 -left-20 w-[420px] h-[420px] bg-blue-400/10 rounded-full blur-3xl animate-hero-float-slow" />
        <div className="absolute top-12 -right-20 w-[460px] h-[460px] bg-indigo-500/10 rounded-full blur-3xl animate-hero-float-reverse" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[260px] bg-purple-400/8 rounded-full blur-3xl animate-hero-pulse-glow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Floating Social Proof Micro-Cards (Visible on Large Screens) */}
        <div className="hidden xl:block absolute -left-6 top-8 pointer-events-none z-10 animate-hero-float">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none glowing-card rounded-2xl p-3.5 flex items-center gap-3 w-64">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-sm">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-slate-800 dark:text-white flex items-center gap-1.5">
                <span>Staff React Architect</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </p>
              <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-400">Google • $145k - $180k</p>
              <p className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">Applied 12m ago</p>
            </div>
          </div>
        </div>

        <div className="hidden xl:block absolute -right-6 top-16 pointer-events-none z-10 animate-hero-float-reverse">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none glowing-card rounded-2xl p-3.5 flex items-center gap-3 w-60">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-800">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-extrabold text-slate-800 dark:text-white">Offer Received 🎉</p>
              <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Stripe • Product Design</p>
              <span className="inline-block text-[9px] font-extrabold text-[#6D4AFF] dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-full mt-0.5">
                98% Skill Match
              </span>
            </div>
          </div>
        </div>

        {/* Central Content Area */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          {/* Eyebrow Pill Tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 border border-indigo-100 dark:border-slate-800 text-[#6D4AFF] dark:text-indigo-400 text-xs font-bold mb-6 shadow-xs shadow-indigo-500/5 hover:border-indigo-200 dark:hover:border-indigo-700 transition-colors">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6D4AFF]"></span>
            </span>
            <span className="tracking-wide">Over 50,000+ Verified Openings Live Today</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          </div>

          {/* High-Impact Main Catchy Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.12] mb-6">
            Connecting Ambitious Minds With{' '}
            <span className="relative whitespace-nowrap">
              <span className="gradient-text">Dream Careers</span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-2.5 text-[#6D4AFF]/30 -z-10"
                viewBox="0 0 100 12"
                preserveAspectRatio="none"
                fill="currentColor"
              >
                <path d="M0,8 Q50,0 100,8 L100,12 Q50,4 0,12 Z" />
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg font-medium text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Discover transparent salaries, direct recruiter channels, and verified roles at 10,000+ top global employers and high-growth innovators.
          </p>
        </div>

        {/* Search Bar Container Card */}
        <div className="max-w-4xl mx-auto">
          {/* Top Filter Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 sm:pb-0 mb-3.5 no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.value
                    ? 'bg-[#6D4AFF] text-white shadow-md shadow-indigo-500/25 scale-[1.02] glowing-btn'
                    : 'bg-white/95 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800 border border-slate-200/90 dark:border-slate-800 shadow-2xs'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Main Integrated Job Search Bar */}
          <form
            onSubmit={handleExecuteSearch}
            className="bg-white dark:bg-slate-900 rounded-3xl p-2.5 sm:p-3 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-indigo-500/8 glowing-card transition-all focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-100/60 dark:focus-within:ring-indigo-900/40"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-center">
              {/* Keyword / Role Input (5 cols on md) */}
              <div className="md:col-span-5 flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors">
                <Search className="w-5 h-5 text-indigo-500 shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                    Role or Skill
                  </label>
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="e.g. Senior Frontend, React, Python"
                    className="w-full bg-transparent border-none text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-8 bg-slate-200 dark:bg-slate-800 my-auto"></div>

              {/* Location Input (3 cols on md) */}
              <div className="md:col-span-3 flex items-center gap-3 px-3.5 py-2.5 rounded-2xl hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors">
                <MapPin className="w-5 h-5 text-slate-400 shrink-0" />
                <div className="w-full text-left">
                  <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                    Location / Place
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Bengaluru, Pune, London..."
                    className="w-full bg-transparent border-none text-xs sm:text-sm font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Experience Dropdown (2 cols on md) */}
              <div className="md:col-span-2 relative">
                <button
                  type="button"
                  onClick={() => setIsExpDropdownOpen(!isExpDropdownOpen)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl hover:bg-slate-50/80 dark:hover:bg-slate-800/80 transition-colors text-left cursor-pointer"
                >
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-wider">
                      Seniority
                    </label>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block truncate">
                      {experienceLevel.split(' ')[0]}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
                </button>

                {/* Dropdown Menu */}
                {isExpDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {experienceOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          setExperienceLevel(opt);
                          setIsExpDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                          experienceLevel === opt
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 text-[#6D4AFF] dark:text-indigo-400 font-bold'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span>{opt}</span>
                        {experienceLevel === opt && <CheckCircle2 className="w-3.5 h-3.5 text-[#6D4AFF] dark:text-indigo-400" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* CTA Search Button (2 cols on md) */}
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full h-12 rounded-2xl gradient-btn text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-indigo-500/25 active:scale-95 transition-transform glowing-btn text-white"
                >
                  <span>Find Jobs</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Popular Tag Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span className="text-slate-400 dark:text-slate-500 font-bold mr-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-indigo-500" />
              Trending:
            </span>
            {popularSearches.map((tag) => (
              <button
                key={tag.label}
                type="button"
                onClick={() => handlePopularTagClick(tag.label)}
                className="px-3 py-1 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-[#6D4AFF] dark:hover:text-indigo-300 text-slate-600 dark:text-slate-300 rounded-full border border-slate-200/90 dark:border-slate-800 transition-all text-xs font-semibold cursor-pointer shadow-2xs hover:border-indigo-200"
              >
                {tag.label}
              </button>
            ))}
          </div>
        </div>

        {/* Brand Proof / Company Badges Row */}
        <div className="mt-12 pt-8 border-t border-slate-200/60 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold text-slate-400">
          <span className="flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <Building2 className="w-4 h-4 text-indigo-500" />
            Recruiters active from top global teams
          </span>

          <div className="flex items-center gap-6 opacity-75 grayscale hover:grayscale-0 transition-all">
            <span className="font-black text-slate-800 text-sm tracking-tight">Google</span>
            <span className="font-black text-slate-800 text-sm tracking-tight">Microsoft</span>
            <span className="font-black text-slate-800 text-sm tracking-tight">stripe</span>
            <span className="font-black text-slate-800 text-sm tracking-tight">amazon</span>
            <span className="font-black text-slate-800 text-sm tracking-tight">Uber</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
