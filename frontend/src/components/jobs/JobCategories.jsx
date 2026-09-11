import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code2,
  Palette,
  Megaphone,
  BarChart3,
  Layers,
  Coins,
  Users,
  Headphones,
  ArrowRight,
  TrendingUp,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export const JobCategories = ({
  onSelectCategory,
  selectedCategory = '',
  showTitle = true,
  title = 'Explore Jobs by Industry',
  subtitle = 'Find your next career move in high-growth industries hiring top talent today',
  limit,
}) => {
  const navigate = useNavigate();

  // Industry dataset mapped to backend search queries
  const categories = [
    {
      id: 'engineering',
      name: 'Engineering & Tech',
      queryValue: 'Software Development',
      aliasName: 'Engineering',
      openings: '12,400+ jobs',
      growth: '+24% this month',
      isHot: true,
      icon: Code2,
      tags: ['Frontend', 'Backend', 'Full Stack', 'DevOps'],
      theme: {
        iconBg: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
        cardBorder: 'hover:border-indigo-300',
        badge: 'bg-indigo-50/80 text-indigo-700 border-indigo-100',
      },
    },
    {
      id: 'design',
      name: 'Product & Design',
      queryValue: 'Design & Creative',
      aliasName: 'Design',
      openings: '4,250+ jobs',
      growth: '+18% this month',
      isHot: false,
      icon: Palette,
      tags: ['UI/UX', 'Product Design', 'Figma', 'Design Systems'],
      theme: {
        iconBg: 'bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white',
        cardBorder: 'hover:border-orange-300',
        badge: 'bg-orange-50/80 text-orange-700 border-orange-100',
      },
    },
    {
      id: 'marketing',
      name: 'Marketing & Growth',
      queryValue: 'Marketing',
      aliasName: 'Marketing',
      openings: '5,800+ jobs',
      growth: '+15% this month',
      isHot: false,
      icon: Megaphone,
      tags: ['Growth Marketing', 'SEO', 'Brand Strategy', 'Content'],
      theme: {
        iconBg: 'bg-pink-50 text-pink-600 group-hover:bg-pink-600 group-hover:text-white',
        cardBorder: 'hover:border-pink-300',
        badge: 'bg-pink-50/80 text-pink-700 border-pink-100',
      },
    },
    {
      id: 'data-ai',
      name: 'Data & AI Analytics',
      queryValue: 'Data & Analytics',
      aliasName: 'Data & Analytics',
      openings: '6,150+ jobs',
      growth: '+35% this month',
      isHot: true,
      icon: BarChart3,
      tags: ['Machine Learning', 'Python', 'SQL', 'Data Science'],
      theme: {
        iconBg: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
        cardBorder: 'hover:border-purple-300',
        badge: 'bg-purple-50/80 text-purple-700 border-purple-100',
      },
    },
    {
      id: 'product',
      name: 'Product Management',
      queryValue: 'Product Management',
      aliasName: 'Product',
      openings: '3,700+ jobs',
      growth: '+12% this month',
      isHot: false,
      icon: Layers,
      tags: ['Technical PM', 'Agile', 'Product Strategy', 'Roadmaps'],
      theme: {
        iconBg: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600 group-hover:text-white',
        cardBorder: 'hover:border-sky-300',
        badge: 'bg-sky-50/80 text-sky-700 border-sky-100',
      },
    },
    {
      id: 'finance',
      name: 'Finance & Fintech',
      queryValue: 'Finance',
      aliasName: 'Finance',
      openings: '4,100+ jobs',
      growth: '+9% this month',
      isHot: false,
      icon: Coins,
      tags: ['Fintech', 'Financial Analysis', 'Accounting', 'Risk'],
      theme: {
        iconBg: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
        cardBorder: 'hover:border-amber-300',
        badge: 'bg-amber-50/80 text-amber-700 border-amber-100',
      },
    },
    {
      id: 'hr',
      name: 'Human Resources & Talent',
      queryValue: 'Human Resources',
      aliasName: 'HR',
      openings: '2,400+ jobs',
      growth: '+8% this month',
      isHot: false,
      icon: Users,
      tags: ['Talent Acquisition', 'People Ops', 'Culture', 'HRBP'],
      theme: {
        iconBg: 'bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white',
        cardBorder: 'hover:border-teal-300',
        badge: 'bg-teal-50/80 text-teal-700 border-teal-100',
      },
    },
    {
      id: 'support',
      name: 'Customer Success & Ops',
      queryValue: 'Customer Support',
      aliasName: 'Support',
      openings: '3,300+ jobs',
      growth: '+14% this month',
      isHot: false,
      icon: Headphones,
      tags: ['Customer Success', 'Technical Support', 'Client Ops'],
      theme: {
        iconBg: 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white',
        cardBorder: 'hover:border-rose-300',
        badge: 'bg-rose-50/80 text-rose-700 border-rose-100',
      },
    },
  ];

  const displayedCategories = limit ? categories.slice(0, limit) : categories;

  const handleCardClick = (category) => {
    if (onSelectCategory) {
      onSelectCategory(category.queryValue, category);
    } else {
      navigate(`/jobs?category=${encodeURIComponent(category.queryValue)}`);
    }
  };

  const isCategorySelected = (category) => {
    if (!selectedCategory) return false;
    const cleanCurrent = selectedCategory.toLowerCase().trim();
    return (
      cleanCurrent === category.queryValue.toLowerCase() ||
      cleanCurrent === category.name.toLowerCase() ||
      cleanCurrent === category.aliasName.toLowerCase() ||
      cleanCurrent === category.id
    );
  };

  return (
    <section id="job-categories-section" className="w-full">
      {showTitle && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#6D4AFF] text-xs font-black tracking-wide uppercase mb-2 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Popular Industries</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1 max-w-2xl">
              {subtitle}
            </p>
          </div>

          <button
            id="btn-view-all-categories"
            onClick={() => navigate('/jobs')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#6D4AFF] hover:text-indigo-700 hover:underline shrink-0 group cursor-pointer transition-all self-start sm:self-auto"
          >
            <span>Browse All 50,000+ Jobs</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Grid of Clickable Industry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {displayedCategories.map((category) => {
          const Icon = category.icon;
          const active = isCategorySelected(category);

          return (
            <div
              key={category.id}
              id={`category-card-${category.id}`}
              role="button"
              tabIndex={0}
              onClick={() => handleCardClick(category)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(category);
                }
              }}
              className={`group relative bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border transition-all duration-300 flex flex-col justify-between cursor-pointer select-none text-left ${
                active
                  ? 'border-[#6D4AFF] dark:border-indigo-500 ring-4 ring-indigo-500/15 shadow-lg shadow-indigo-500/10'
                  : `border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:shadow-indigo-500/8 hover:-translate-y-1.5 ${category.theme.cardBorder}`
              }`}
            >
              {/* Top Row: Icon + Badges */}
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div
                    className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 shadow-2xs ${category.theme.iconBg} dark:bg-slate-800`}
                  >
                    <Icon className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    {category.isHot && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200/70 dark:border-amber-800 px-2 py-0.5 rounded-full">
                        <TrendingUp className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                        High Demand
                      </span>
                    )}

                    {active && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-[#6D4AFF] dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-[#6D4AFF] dark:text-indigo-400" />
                        Active Filter
                      </span>
                    )}
                  </div>
                </div>

                {/* Title & Stats */}
                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-[#6D4AFF] dark:group-hover:text-indigo-400 transition-colors leading-snug">
                  {category.name}
                </h3>

                <div className="flex items-center gap-2 mt-1.5 mb-3">
                  <span className="text-xs font-extrabold text-slate-700 dark:text-slate-300">
                    {category.openings}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></span>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    {category.growth}
                  </span>
                </div>

                {/* Sub-role tags preview */}
                <div className="flex flex-wrap gap-1.5 my-3">
                  {category.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-bold text-slate-600 dark:text-slate-300 bg-slate-100/90 dark:bg-slate-800 group-hover:bg-slate-50 dark:group-hover:bg-slate-700 px-2 py-0.5 rounded-md transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                  {category.tags.length > 3 && (
                    <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 px-1 py-0.5">
                      +{category.tags.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Action Affordance */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-extrabold text-[#6D4AFF] dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 mt-2">
                <span>Filter by {category.aliasName}</span>
                <div className="w-7 h-7 rounded-full bg-slate-50 dark:bg-slate-800 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-950 flex items-center justify-center transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default JobCategories;
