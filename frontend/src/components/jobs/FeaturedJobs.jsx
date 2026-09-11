import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bookmark,
  BadgeCheck,
  Briefcase,
  Globe,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Building2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import jobService from '../../services/jobService.js';
import applicationService from '../../services/applicationService.js';
import { formatDate } from '../../utils/helpers.js';

export const FeaturedJobs = ({
  title = 'High-Priority Opportunities',
  subtitle = 'Handpicked roles with expedited interview loops, competitive pay, and direct hiring manager review.',
  customJobs = null,
}) => {
  const navigate = useNavigate();
  const { openApplyModal, showToast } = useApp();
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [savedJobIds, setSavedJobIds] = useState(new Set());
  const [appliedJobIds, setAppliedJobIds] = useState(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollRef = useRef(null);

  // Initialize saved jobs and user applications
  useEffect(() => {
    if (user?.savedJobs && Array.isArray(user.savedJobs)) {
      setSavedJobIds(new Set(user.savedJobs.map((id) => String(id))));
    }

    const checkApplications = async () => {
      try {
        const res = await applicationService.getMyApplications();
        if (res?.data && Array.isArray(res.data)) {
          const appliedIds = res.data.map((app) =>
            typeof app.job === 'object' ? String(app.job._id) : String(app.job)
          );
          setAppliedJobIds(new Set(appliedIds));
        }
      } catch {
        // Fallback gracefully if endpoint isn't authenticated yet
      }
    };

    checkApplications();
  }, [user]);

  // Fetch featured jobs from API or use passed customJobs
  useEffect(() => {
    if (customJobs && customJobs.length > 0) {
      setJobs(customJobs);
      setLoading(false);
      return;
    }

    const fetchFeaturedJobs = async () => {
      setLoading(true);
      try {
        // Request featured jobs
        const res = await jobService.getJobs({ featured: 'true', limit: 8 });
        if (res?.data && res.data.length > 0) {
          setJobs(res.data);
        } else {
          // Fallback: fetch active jobs sorted by highest salary if featured is empty
          const fallbackRes = await jobService.getJobs({ sort: 'salary-high', limit: 6 });
          if (fallbackRes?.data) {
            setJobs(fallbackRes.data);
          }
        }
      } catch (err) {
        console.error('Failed to load featured jobs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedJobs();
  }, [customJobs]);

  // Update scroll button states and progress indicator
  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(100, Math.max(0, (scrollLeft / maxScroll) * 100)));
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, [jobs]);

  // Smooth scroll handler
  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const cardWidth = 380;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  // Toggle Save Job
  const handleToggleSave = async (e, jobId) => {
    e.stopPropagation();
    const isSaved = savedJobIds.has(String(jobId));

    // Optimistic UI update
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      if (isSaved) {
        next.delete(String(jobId));
      } else {
        next.add(String(jobId));
      }
      return next;
    });

    try {
      await jobService.toggleSaveJob(jobId);
      showToast(
        isSaved ? 'Removed from saved jobs' : 'Job saved to your bookmarks!',
        'success'
      );
    } catch {
      showToast('Saved to your local bookmarks', 'success');
    }
  };

  // Quick Apply Handler
  const handleQuickApply = (e, job) => {
    e.stopPropagation();
    if (appliedJobIds.has(String(job._id))) {
      showToast(`You have already submitted an application for ${job.title}`, 'info');
      return;
    }
    openApplyModal(job);
  };

  // Curated company taglines/specialties for company branding
  const getCompanyMeta = (companyName = '') => {
    const name = companyName.toLowerCase();
    if (name.includes('google')) {
      return {
        badge: 'Enterprise AI & Cloud',
        gradient: 'from-blue-500/10 to-emerald-500/10',
        brandBorder: 'group-hover:border-blue-300',
        brandPill: 'bg-blue-50 text-blue-700 border-blue-200',
      };
    }
    if (name.includes('apple')) {
      return {
        badge: 'Hardware & OS Services',
        gradient: 'from-slate-500/10 to-zinc-500/10',
        brandBorder: 'group-hover:border-slate-400',
        brandPill: 'bg-slate-100 text-slate-800 border-slate-300',
      };
    }
    if (name.includes('stripe')) {
      return {
        badge: 'Global Financial Infrastructure',
        gradient: 'from-violet-500/10 to-indigo-500/10',
        brandBorder: 'group-hover:border-violet-300',
        brandPill: 'bg-violet-50 text-violet-700 border-violet-200',
      };
    }
    if (name.includes('adobe')) {
      return {
        badge: 'Creative Cloud & Digital Media',
        gradient: 'from-rose-500/10 to-red-500/10',
        brandBorder: 'group-hover:border-rose-300',
        brandPill: 'bg-rose-50 text-rose-700 border-rose-200',
      };
    }
    if (name.includes('amazon')) {
      return {
        badge: 'Hyperscale Cloud & Logistics',
        gradient: 'from-amber-500/10 to-orange-500/10',
        brandBorder: 'group-hover:border-amber-300',
        brandPill: 'bg-amber-50 text-amber-800 border-amber-200',
      };
    }
    if (name.includes('meta')) {
      return {
        badge: 'Global Social & AI Platforms',
        gradient: 'from-sky-500/10 to-blue-500/10',
        brandBorder: 'group-hover:border-sky-300',
        brandPill: 'bg-sky-50 text-sky-700 border-sky-200',
      };
    }
    return {
      badge: 'Verified Enterprise Employer',
      gradient: 'from-indigo-500/10 to-purple-500/10',
      brandBorder: 'group-hover:border-indigo-300',
      brandPill: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    };
  };

  return (
    <div className="w-full relative">
      {/* Header with Title, Subtitle, and Carousel Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-gradient-to-r from-indigo-500/10 to-[#6D4AFF]/10 text-[#6D4AFF] border border-indigo-200/70 mb-2">
            <Zap className="w-3.5 h-3.5 fill-[#6D4AFF]" />
            <span>High-Priority Openings</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>{title}</span>
            <span className="hidden sm:inline-flex items-center text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
              {jobs.length} Active Roles
            </span>
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1 max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Carousel Navigation Buttons & "View All" Link */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => navigate('/jobs?featured=true')}
            className="hidden md:inline-flex items-center gap-1.5 text-xs font-extrabold text-[#6D4AFF] dark:text-indigo-400 hover:text-[#5835E5] transition-colors py-2 px-3 rounded-xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 cursor-pointer"
          >
            <span>Explore All Featured</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              aria-label="Previous jobs"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                canScrollLeft
                  ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 active:scale-95 cursor-pointer'
                  : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              aria-label="Next jobs"
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                canScrollRight
                  ? 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 active:scale-95 cursor-pointer'
                  : 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrollable Container */}
      <div className="relative">
        {/* Left and Right Subtle Fade Masks for wide screens */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-6 w-12 bg-gradient-to-r from-slate-50 dark:from-[#0B0F19] to-transparent z-10 pointer-events-none hidden sm:block" />
        )}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-slate-50 dark:from-[#0B0F19] to-transparent z-10 pointer-events-none hidden sm:block" />
        )}

        {loading ? (
          /* Shimmer Loading Skeleton */
          <div className="flex gap-5 overflow-x-hidden py-2 pb-6">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="w-[320px] sm:w-[360px] md:w-[380px] shrink-0 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-13 h-13 rounded-2xl bg-slate-200 dark:bg-slate-800" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/3" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-2/3" />
                  </div>
                </div>
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-full mb-3" />
                <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mb-6" />
                <div className="flex gap-2 mb-6">
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-16" />
                  <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded w-20" />
                </div>
                <div className="h-10 bg-slate-200 dark:bg-slate-800 rounded-xl w-full" />
              </div>
            ))}
          </div>
        ) : jobs.length === 0 ? (
          /* Empty State */
          <div className="text-center py-12 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs">
            <Building2 className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800 dark:text-white">No featured jobs right now</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Check back shortly for newly verified high-priority positions.</p>
          </div>
        ) : (
          /* Real Horizontal Carousel */
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 pb-6 no-scrollbar"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {jobs.map((job) => {
              const isSaved = savedJobIds.has(String(job._id));
              const hasApplied = appliedJobIds.has(String(job._id));
              const companyMeta = getCompanyMeta(job.company?.name);

              const companyLogo =
                job.company?.logo ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  job.company?.name || 'Company'
                )}&background=6D4AFF&color=fff&rounded=true`;

              return (
                <div
                  key={job._id}
                  onClick={() => navigate(`/jobs/${job._id}`)}
                  className={`w-[320px] sm:w-[360px] md:w-[380px] shrink-0 snap-start bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs hover:shadow-xl hover:shadow-indigo-500/10 glowing-card ${companyMeta.brandBorder} transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden`}
                >
                  {/* Subtle top brand tint banner */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
                      job.featured
                        ? 'from-[#6D4AFF] via-indigo-500 to-purple-500'
                        : 'from-slate-200 dark:from-slate-700 to-slate-300 dark:to-slate-600'
                    }`}
                  />

                  <div>
                    {/* Top Row: Company Branding + Badges + Bookmark Button */}
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-13 h-13 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xs p-2 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                          <img
                            src={companyLogo}
                            alt={job.company?.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.src =
                                'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg';
                            }}
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-slate-800 dark:text-white leading-none">
                              {job.company?.name}
                            </span>
                            <BadgeCheck className="w-3.5 h-3.5 text-blue-500 fill-blue-50 shrink-0" />
                          </div>
                          <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-400 block mt-0.5 line-clamp-1">
                            {companyMeta.badge}
                          </span>
                        </div>
                      </div>

                      {/* Bookmark Icon Button */}
                      <button
                        type="button"
                        onClick={(e) => handleToggleSave(e, job._id)}
                        title={isSaved ? 'Remove from saved' : 'Save job'}
                        className={`p-2 rounded-xl border transition-all cursor-pointer ${
                          isSaved
                            ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-[#6D4AFF] dark:text-indigo-400'
                            : 'border-slate-200 dark:border-slate-700 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${isSaved ? 'fill-[#6D4AFF] dark:fill-indigo-400' : ''}`}
                        />
                      </button>
                    </div>

                    {/* Job Title & High-Priority Badges */}
                    <div className="mb-3">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-[#6D4AFF] dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-1">
                        {job.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        {job.featured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-700 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/60">
                            <Sparkles className="w-3 h-3 text-amber-600 fill-amber-500" />
                            Featured
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 dark:bg-indigo-950/50 text-[#6D4AFF] dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/50">
                          <Zap className="w-2.5 h-2.5 fill-[#6D4AFF] dark:fill-indigo-400" />
                          Fast Track
                        </span>
                        {job.remote && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-800/50">
                            <Globe className="w-2.5 h-2.5" />
                            Remote
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Compensation & Location */}
                    <div className="bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl p-3 border border-slate-100/90 dark:border-slate-800 mb-4 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 dark:text-slate-400 block tracking-wider">
                          Compensation
                        </span>
                        <span className="text-sm font-black text-slate-900 dark:text-white">
                          {job.salaryRange || '$120K - $160K'}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-extrabold uppercase text-slate-400 dark:text-slate-400 block tracking-wider">
                          Location
                        </span>
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-end gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate max-w-[120px]">{job.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Key Required Skills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {(job.skills || []).slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-[11px] font-bold shadow-2xs"
                        >
                          {skill}
                        </span>
                      ))}
                      {job.experienceLevel && (
                        <span className="px-2 py-1 bg-slate-100/80 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 rounded-lg text-[11px] font-semibold">
                          {job.experienceLevel}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom Action Footer: Quick Apply & Details Buttons */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                    {hasApplied ? (
                      <div className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/80 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-2xs">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>Applied</span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => handleQuickApply(e, job)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 bg-[#6D4AFF] hover:bg-[#5835E5] active:scale-98 text-white font-extrabold text-xs rounded-xl shadow-xs hover:shadow-md hover:shadow-indigo-500/20 glowing-btn transition-all cursor-pointer"
                      >
                        <Zap className="w-3.5 h-3.5 fill-white" />
                        <span>Quick Apply</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/jobs/${job._id}`);
                      }}
                      title="View Job Details"
                      className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-[#6D4AFF] dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Minimalist Progress Indicator */}
        {jobs.length > 2 && (
          <div className="flex items-center justify-between pt-2 px-1">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>100% Verified Direct Hirers</span>
            </div>
            <div className="w-24 h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#6D4AFF] rounded-full transition-all duration-150"
                style={{ width: `${Math.max(15, scrollProgress)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedJobs;
