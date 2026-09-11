import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BadgeCheck,
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  Clock,
  Briefcase,
  Building2,
  CheckCircle2,
  ArrowRight,
  Award,
} from 'lucide-react';

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Senior Frontend Engineer',
    company: 'Google',
    companyLogo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    location: 'Bengaluru, India',
    category: 'Engineering',
    hiredTimeline: '14 days',
    salaryUplift: '+42% compensation bump',
    verifiedDate: 'March 2026',
    verifiedBadge: 'Verified Hire • Offer Accepted',
    rating: 5,
    highlight: 'Received 3 interview requests in 48 hours',
    quote:
      'I received three direct interview requests within my first 48 hours on HireHub. The salary transparency and direct access to Google engineering leaders eliminated all the traditional back-and-forth.',
    skills: ['React', 'TypeScript', 'System Design'],
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'Staff DevOps & Cloud Architect',
    company: 'Apple',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    location: 'Cupertino, CA',
    category: 'Engineering',
    hiredTimeline: '11 days',
    salaryUplift: '+$55K base increase',
    verifiedDate: 'February 2026',
    verifiedBadge: 'Verified Hire • Fast-Track',
    rating: 5,
    highlight: 'Direct hiring manager interview loop',
    quote:
      'HireHub completely bypassed the black hole of standard career boards. The Apple cloud director reviewed my verified credentials, scheduled a direct technical loop, and made an offer within 11 days.',
    skills: ['Kubernetes', 'AWS', 'Terraform'],
  },
  {
    id: 3,
    name: 'Elena Rostova',
    role: 'Principal Product Designer',
    company: 'Adobe',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Adobe_Corporate_Horizontal_Red_HEX.svg',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    location: 'San Jose, CA',
    category: 'Design',
    hiredTimeline: '16 days',
    salaryUplift: '100% Remote Global Contract',
    verifiedDate: 'January 2026',
    verifiedBadge: 'Verified Portfolio • Offer Verified',
    rating: 5,
    highlight: 'Negotiated 100% remote contract',
    quote:
      'Having my verified case studies on HireHub allowed Adobe’s Creative Cloud leadership to see my actual craft before the first call. It turned what used to be a 2-month ordeal into a smooth, respectful conversation.',
    skills: ['Design Systems', 'Figma', 'UX Strategy'],
  },
  {
    id: 4,
    name: 'David Chen',
    role: 'Senior Growth Marketing Manager',
    company: 'Stripe',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    location: 'San Francisco, CA',
    category: 'Marketing',
    hiredTimeline: '12 days',
    salaryUplift: '+38% compensation bump',
    verifiedDate: 'March 2026',
    verifiedBadge: 'Verified Hire • Direct Outreach',
    rating: 5,
    highlight: 'Zero ghosting, 100% transparent pay',
    quote:
      'The compensation ranges posted on HireHub are genuinely real and honored. Stripe contacted me based on my growth track record, and the total package exceeded my initial target expectations.',
    skills: ['Growth Marketing', 'SQL', 'B2B SaaS'],
  },
  {
    id: 5,
    name: 'Amina Al-Mansoor',
    role: 'Director of Product Management',
    company: 'Spotify',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=300&q=80',
    location: 'Stockholm, Sweden',
    category: 'Product',
    hiredTimeline: '18 days',
    salaryUplift: 'Executive Relocation + Equity',
    verifiedDate: 'February 2026',
    verifiedBadge: 'Verified Leadership Hire',
    rating: 5,
    highlight: 'Pre-screened executive opportunity',
    quote:
      'Finding senior executive roles that respect candidate time is rare. On HireHub, all employer profiles are thoroughly vetted, compensation is upfront, and you talk straight with executive peers.',
    skills: ['Product Strategy', 'Roadmapping', 'Agile'],
  },
  {
    id: 6,
    name: 'Carlos Mendez',
    role: 'Lead UI/UX Designer & Engineer',
    company: 'Meta',
    companyLogo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    location: 'Menlo Park, CA',
    category: 'Design',
    hiredTimeline: '13 days',
    salaryUplift: '+48% total package bump',
    verifiedDate: 'March 2026',
    verifiedBadge: 'Verified Hire • Multiple Bids',
    rating: 5,
    highlight: '3 competing offers managed in 1 app',
    quote:
      'I had three offers competing in parallel. The HireHub application tracker kept timeline milestones, interview notes, and compensation details perfectly clear until I signed with Meta.',
    skills: ['Interaction Design', 'React', 'Prototyping'],
  },
];

export const TRUST_STATS = [
  {
    value: '94.2%',
    label: 'Interview Placement Rate',
    detail: 'Within 30 days of active profile verification',
    icon: TrendingUp,
  },
  {
    value: '13 Days',
    label: 'Average Time to Offer',
    detail: '3.5x faster than conventional job portals',
    icon: Clock,
  },
  {
    value: '+$36,500',
    label: 'Average Salary Uplift',
    detail: 'Verified candidate salary gain on new roles',
    icon: Award,
  },
  {
    value: '100% Vetted',
    label: 'Enterprise Employers',
    detail: 'Direct access to hiring teams with zero spam',
    icon: ShieldCheck,
  },
];

/**
 * Main Testimonials Component
 * Supports both full 'section' layout and compact 'card' layout
 */
export const Testimonials = ({
  variant = 'section', // 'section' | 'card'
  title = 'Real People. Real Dream Offers.',
  subtitle = 'Discover how ambitious professionals leveraged HireHub to bypass traditional recruiter filters and step into top-tier roles.',
  autoPlayInterval = 5500,
}) => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef(null);

  // Filter items by category
  const filteredStories =
    selectedCategory === 'All'
      ? TESTIMONIALS_DATA
      : TESTIMONIALS_DATA.filter((item) => item.category === selectedCategory);

  const total = filteredStories.length;
  const currentStory = filteredStories[activeIndex % total] || filteredStories[0];

  // Auto-rotation effect
  useEffect(() => {
    if (!isPlaying || isHovered || total <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, total, autoPlayInterval, activeIndex]);

  // Safe navigation
  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const handleSelectStory = (idx) => {
    setActiveIndex(idx);
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setActiveIndex(0);
  };

  // ==========================================
  // 1. Compact Card Variant (e.g., Sidebar / Widget)
  // ==========================================
  if (variant === 'card') {
    return (
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/90 dark:border-slate-800 shadow-xs glowing-card relative overflow-hidden transition-all duration-300 hover:shadow-md"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
              <Sparkles className="w-3.5 h-3.5 fill-amber-500" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 dark:text-white leading-none">
                Success Stories
              </h3>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                Verified Hires
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              aria-label="Previous story"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next story"
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Verified Badge Pill */}
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[11px] font-extrabold mb-3">
          <BadgeCheck className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 dark:fill-emerald-900" />
          <span>{currentStory.verifiedBadge}</span>
        </div>

        {/* Quote */}
        <blockquote className="text-xs font-semibold text-slate-600 dark:text-slate-300 leading-relaxed mb-4 italic bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-100 dark:border-slate-800">
          &ldquo;{currentStory.quote}&rdquo;
        </blockquote>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-50/70 dark:bg-slate-800/40 p-2 rounded-xl border border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Timeline</span>
            <span className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1">
              <Clock className="w-3 h-3 text-indigo-500" />
              {currentStory.hiredTimeline}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase block">Impact</span>
            <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              {currentStory.salaryUplift}
            </span>
          </div>
        </div>

        {/* Author Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={currentStory.avatar}
                alt={currentStory.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-white dark:bg-slate-800 p-0.5 border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <img
                  src={currentStory.companyLogo}
                  alt={currentStory.company}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h5 className="text-xs font-extrabold text-slate-900 dark:text-white leading-none">
                  {currentStory.name}
                </h5>
                <BadgeCheck className="w-3 h-3 text-blue-500 fill-blue-50" />
              </div>
              <span className="text-[11px] font-semibold text-slate-400 block mt-0.5">
                {currentStory.role} at {currentStory.company}
              </span>
            </div>
          </div>

          {/* Carousel Dots */}
          <div className="flex items-center gap-1">
            {filteredStories.map((_, i) => (
              <button
                key={i}
                onClick={() => handleSelectStory(i)}
                aria-label={`Jump to story ${i + 1}`}
                className={`transition-all rounded-full ${
                  i === activeIndex % total
                    ? 'w-4 h-1.5 bg-[#6D4AFF]'
                    : 'w-1.5 h-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. Full Section Variant (Landing / Home Page)
  // ==========================================
  return (
    <section className="w-full relative py-16 sm:py-20 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-[#0B0F19] dark:via-slate-900/50 dark:to-[#0B0F19] transition-colors overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-indigo-200/25 via-purple-100/30 to-blue-200/20 dark:from-indigo-900/20 dark:via-purple-900/20 dark:to-blue-900/20 blur-3xl rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/50 text-[#6D4AFF] dark:text-indigo-400 border border-indigo-200/70 dark:border-indigo-800 mb-3 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#6D4AFF] dark:text-indigo-400" />
            <span>Verified Candidate Success</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium mt-3 leading-relaxed">
            {subtitle}
          </p>

          {/* Industry Category Filter Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 mt-6">
            {['All', 'Engineering', 'Design', 'Marketing', 'Product'].map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#6D4AFF] text-white shadow-md shadow-indigo-500/25 scale-105 glowing-btn'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-indigo-50/40 dark:hover:bg-slate-800'
                }`}
              >
                {cat === 'All' ? 'All Stories' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Rotating Story Card & Showcase */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative max-w-5xl mx-auto mb-16"
        >
          {/* Card Container */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none glowing-card relative overflow-hidden transition-all duration-300">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#6D4AFF] via-indigo-500 to-emerald-400" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Left Column: Candidate Avatar, Company & Verified Metrics (5 cols) */}
              <div className="lg:col-span-5 flex flex-col items-center sm:items-start text-center sm:text-left border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800 pb-6 lg:pb-0 lg:pr-8">
                {/* Avatar with Company Badge */}
                <div className="relative mb-5">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden p-1 bg-gradient-to-tr from-[#6D4AFF] to-indigo-300 shadow-lg">
                    <img
                      src={currentStory.avatar}
                      alt={currentStory.name}
                      className="w-full h-full object-cover rounded-[22px]"
                    />
                  </div>
                  {/* Floating Company Badge */}
                  <div className="absolute -bottom-2 -right-2 bg-white dark:bg-slate-800 rounded-2xl p-2 border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center w-10 h-10">
                    <img
                      src={currentStory.companyLogo}
                      alt={currentStory.company}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src =
                          'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg';
                      }}
                    />
                  </div>
                </div>

                {/* Candidate Name & Role */}
                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {currentStory.name}
                  </h3>
                  <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-50 shrink-0" />
                </div>
                <p className="text-sm font-bold text-[#6D4AFF] dark:text-indigo-400 mb-1">
                  {currentStory.role}
                </p>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-400 flex items-center gap-1 mb-4">
                  <Building2 className="w-3.5 h-3.5" />
                  {currentStory.company} • {currentStory.location}
                </span>

                {/* Verified Trust Pill */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-black mb-4">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{currentStory.verifiedBadge}</span>
                </div>

                {/* Metrics Breakdown Grid */}
                <div className="w-full grid grid-cols-2 gap-2.5 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="bg-slate-50/90 dark:bg-slate-800/60 rounded-2xl p-2.5 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Hiring Speed
                    </span>
                    <span className="text-xs sm:text-sm font-black text-slate-800 dark:text-white flex items-center gap-1 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-indigo-500" />
                      {currentStory.hiredTimeline}
                    </span>
                  </div>
                  <div className="bg-slate-50/90 dark:bg-slate-800/60 rounded-2xl p-2.5 border border-slate-100 dark:border-slate-800">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                      Comp Lift
                    </span>
                    <span className="text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {currentStory.salaryUplift}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Quote, Star Rating, Skills & Story Detail (7 cols) */}
              <div className="lg:col-span-7 flex flex-col justify-between h-full">
                {/* Star Rating & Highlight */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(currentStory.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                    <span className="text-xs font-black text-slate-700 dark:text-slate-300 ml-1.5">
                      5.0 Verified Review
                    </span>
                  </div>

                  <span className="text-xs font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                    {currentStory.verifiedDate}
                  </span>
                </div>

                {/* Quoted Story Content */}
                <div className="relative mb-6">
                  <Quote className="w-10 h-10 text-indigo-100 dark:text-indigo-950/80 absolute -top-4 -left-2 pointer-events-none -z-0" />
                  <blockquote className="text-base sm:text-xl font-medium text-slate-700 dark:text-slate-200 leading-relaxed relative z-10 italic">
                    &ldquo;{currentStory.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Key Skills Tag Cloud */}
                <div className="mb-6">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2">
                    Verified Competencies on HireHub
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {currentStory.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800 text-[#6D4AFF] dark:text-indigo-400 text-xs font-extrabold"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                    <span className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold border border-slate-200 dark:border-slate-700">
                      {currentStory.highlight}
                    </span>
                  </div>
                </div>

                {/* Story Navigation Controls & Progress Tracker */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 flex-wrap gap-4">
                  {/* Play / Pause Auto-Rotation */}
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 text-[#6D4AFF] dark:text-indigo-400" />
                        <span>Pause Auto-Rotation</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-[#6D4AFF] dark:text-indigo-400 fill-[#6D4AFF]" />
                        <span>Resume Auto-Rotation</span>
                      </>
                    )}
                  </button>

                  {/* Direction Controls & Page Count */}
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-extrabold text-slate-400">
                      {((activeIndex % total) + 1).toString().padStart(2, '0')} /{' '}
                      {total.toString().padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                      <button
                        type="button"
                        onClick={handlePrev}
                        aria-label="Previous testimonial"
                        className="w-8 h-8 rounded-xl flex items-center justify-center bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-[#6D4AFF] hover:text-white transition-all cursor-pointer"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={handleNext}
                        aria-label="Next testimonial"
                        className="w-8 h-8 rounded-xl flex items-center justify-center bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-2xs hover:bg-[#6D4AFF] hover:text-white transition-all cursor-pointer"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Avatar Selector Strip */}
          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            {filteredStories.map((story, idx) => {
              const isActive = idx === activeIndex % total;
              return (
                <button
                  key={story.id}
                  onClick={() => handleSelectStory(idx)}
                  className={`flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-slate-800 border-[#6D4AFF] ring-2 ring-[#6D4AFF]/20 shadow-md -translate-y-0.5'
                      : 'bg-white/80 dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 opacity-75 hover:opacity-100'
                  }`}
                >
                  <img
                    src={story.avatar}
                    alt={story.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <span className="text-xs font-black text-slate-800 dark:text-white block leading-none">
                      {story.name.split(' ')[0]}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400 leading-none">
                      {story.company}
                    </span>
                  </div>
                  {isActive && (
                    <BadgeCheck className="w-3.5 h-3.5 text-[#6D4AFF] fill-indigo-100 dark:fill-indigo-900 ml-0.5" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Global Trust Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto pt-8 border-t border-slate-200/80 dark:border-slate-800">
          {TRUST_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card flex flex-col justify-between"
              >
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center text-[#6D4AFF] dark:text-indigo-400 mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-extrabold text-slate-700 dark:text-slate-300 mt-1">
                    {stat.label}
                  </div>
                  <p className="text-[11px] font-medium text-slate-400 mt-0.5 leading-snug">
                    {stat.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 sm:px-6 bg-slate-900 dark:bg-slate-800/90 rounded-3xl text-white shadow-xl max-w-2xl mx-auto border border-slate-800 dark:border-slate-700">
            <div className="flex items-center gap-3 text-left">
              <div className="w-10 h-10 rounded-2xl bg-[#6D4AFF] flex items-center justify-center shrink-0 shadow-md">
                <Sparkles className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h4 className="text-sm font-black leading-tight">
                  Ready to be our next verified success story?
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  Join 50,000+ candidates who found direct hiring matches.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/jobs')}
              className="sm:ml-auto px-5 py-2.5 bg-[#6D4AFF] hover:bg-[#5835E5] text-white font-extrabold text-xs rounded-2xl transition-all shadow-md hover:scale-105 active:scale-95 shrink-0 flex items-center gap-1.5 cursor-pointer glowing-btn"
            >
              <span>Explore Roles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
