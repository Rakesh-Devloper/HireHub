import React, { useState } from 'react';
import {
  BookOpen,
  FileText,
  Code2,
  DollarSign,
  TrendingUp,
  Search,
  ExternalLink,
  ArrowRight,
  Download,
  Bookmark,
} from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';

export const Resources = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const { showToast } = useApp();

  const categories = ['All', 'Resume & CV', 'Interview Prep', 'Salary Guides', 'Career Growth'];

  const articles = [
    {
      id: 1,
      title: 'The Modern Software Engineer Resume: 2026 Blueprint',
      category: 'Resume & CV',
      readTime: '6 min read',
      date: 'Sep 2026',
      description:
        'Proven action-verb formulas and metrics that pass ATS scans and capture recruiter interest within 6 seconds.',
      icon: FileText,
      tag: 'Most Popular',
    },
    {
      id: 2,
      title: 'Cracking the System Design Interview: Real-World Distributed Systems',
      category: 'Interview Prep',
      readTime: '12 min read',
      date: 'Aug 2026',
      description:
        'Step-by-step frameworks for designing scalable streaming architectures, database partitioning, and cache strategies.',
      icon: Code2,
      tag: 'Technical',
    },
    {
      id: 3,
      title: 'Global Tech Salary Benchmark Report 2026',
      category: 'Salary Guides',
      readTime: '8 min read',
      date: 'Jul 2026',
      description:
        'Comprehensive compensation breakdown across Silicon Valley, Bengaluru, London, and remote roles by experience level.',
      icon: DollarSign,
      tag: 'Data Report',
    },
    {
      id: 4,
      title: 'How to Negotiate Your Tech Offer: The Complete Script & Playbook',
      category: 'Salary Guides',
      readTime: '7 min read',
      date: 'Aug 2026',
      description:
        'Word-for-word email templates and talking points to comfortably negotiate equity, signing bonuses, and base pay.',
      icon: DollarSign,
      tag: 'Career Advice',
    },
    {
      id: 5,
      title: 'Mastering Asynchronous Communication for Remote Tech Teams',
      category: 'Career Growth',
      readTime: '5 min read',
      date: 'Jun 2026',
      description:
        'Best practices for documentation, PR reviews, and Slack etiquette to maximize productivity across timezones.',
      icon: TrendingUp,
      tag: 'Remote Work',
    },
    {
      id: 6,
      title: 'Top 50 Frontend & Full Stack Coding Interview Challenges',
      category: 'Interview Prep',
      readTime: '15 min read',
      date: 'Sep 2026',
      description:
        'Curated React hooks, closures, debounce algorithms, and concurrency patterns tested at Google, Meta, and Stripe.',
      icon: Code2,
      tag: 'Practice Guide',
    },
  ];

  const filtered = articles.filter((art) => {
    const matchesTab = activeTab === 'All' || art.category === activeTab;
    const matchesSearch =
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.description.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 text-[#6D4AFF] dark:text-indigo-400 text-xs font-bold mb-4">
          <BookOpen className="w-3.5 h-3.5" />
          <span>HireHub Knowledge Base & Playbooks</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-4">
          Career Guides & Engineering Playbooks
        </h1>
        <p className="text-sm sm:text-base font-semibold text-slate-500 dark:text-slate-400">
          Curated guides, compensation data, and interview frameworks written by senior tech leaders and recruiters.
        </p>

        {/* Search Input */}
        <div className="mt-8 max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search guides, topics, frameworks..."
            className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#6D4AFF] shadow-xs"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === cat
                ? 'bg-[#6D4AFF] text-white shadow-md shadow-indigo-500/20 glowing-btn'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {filtered.map((art) => {
          const Icon = art.icon;
          return (
            <div
              key={art.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between glowing-card transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-[#6D4AFF] dark:text-indigo-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-indigo-50 dark:bg-indigo-950/60 text-[#6D4AFF] dark:text-indigo-400 border border-indigo-100/60 dark:border-indigo-800/40">
                    {art.tag}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400 mb-2">
                  <span>{art.category}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="text-base font-black text-slate-900 dark:text-white mb-2 leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  {art.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() =>
                    showToast(`Opening "${art.title}"`, 'info')
                  }
                  className="inline-flex items-center gap-1.5 text-xs font-black text-[#6D4AFF] dark:text-indigo-400 hover:underline cursor-pointer"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() =>
                    showToast('Article saved to your bookmarks!', 'success')
                  }
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                  title="Bookmark"
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Free Resume Checklist Download Card */}
      <div className="bg-gradient-to-r from-[#6D4AFF] via-indigo-600 to-[#3B82F6] rounded-3xl p-8 sm:p-10 text-white shadow-xl shadow-indigo-500/15 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-indigo-200 mb-1 block">
            Free Downloadable PDF
          </span>
          <h3 className="text-2xl sm:text-3xl font-black">2026 Tech Resume Checklist & ATS Audit</h3>
          <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-xl">
            A 20-point self-inspection checklist used by FAANG candidates to verify formatting, metrics, keywords, and typography before submitting applications.
          </p>
        </div>
        <button
          onClick={() => showToast('Downloading 2026 Tech Resume Checklist PDF...', 'success')}
          className="px-6 py-3.5 bg-white text-[#6D4AFF] rounded-2xl text-xs font-black flex items-center gap-2 hover:bg-slate-100 shadow-lg cursor-pointer transition-colors shrink-0 glowing-btn"
        >
          <Download className="w-4 h-4" />
          <span>Download Free PDF</span>
        </button>
      </div>
    </div>
  );
};

export default Resources;
