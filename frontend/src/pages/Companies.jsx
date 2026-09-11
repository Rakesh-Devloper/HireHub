import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Users, Globe, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import SearchInput from '../components/ui/SearchInput.jsx';

export const Companies = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const companyList = [
    {
      id: 'google',
      name: 'Google',
      industry: 'Technology & Cloud',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
      location: 'Mountain View, CA & Bengaluru, India',
      employees: '180,000+',
      openJobs: 142,
      description: 'Our mission is to organize the world’s information and make it universally accessible and useful.',
    },
    {
      id: 'microsoft',
      name: 'Microsoft',
      industry: 'Software & Cloud',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      location: 'Redmond, WA & Hyderabad, India',
      employees: '220,000+',
      openJobs: 98,
      description: 'Empowering every person and every organization on the planet to achieve more.',
    },
    {
      id: 'amazon',
      name: 'Amazon',
      industry: 'E-commerce & AWS',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      location: 'Seattle, WA & Hyderabad, India',
      employees: '1,500,000+',
      openJobs: 215,
      description: 'Earth’s most customer-centric company, where customers can find and discover anything they might want to buy.',
    },
    {
      id: 'meta',
      name: 'Meta',
      industry: 'Social Media & AI',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
      location: 'Menlo Park, CA & London, UK',
      employees: '67,000+',
      openJobs: 64,
      description: 'Building technologies that help people connect, find communities, and grow businesses.',
    },
    {
      id: 'netflix',
      name: 'Netflix',
      industry: 'Entertainment & Streaming',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
      location: 'Los Gatos, CA & Remote',
      employees: '13,000+',
      openJobs: 32,
      description: 'At Netflix, we want to entertain the world. We offer TV series, documentaries, and feature films across a wide variety of genres.',
    },
    {
      id: 'spotify',
      name: 'Spotify',
      industry: 'Audio Streaming & Media',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
      location: 'Stockholm, Sweden & New York, NY',
      employees: '9,000+',
      openJobs: 41,
      description: 'Unlocking the potential of human creativity—by giving a million creative artists the opportunity to live off their art.',
    },
  ];

  const filtered = companyList.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Top Hiring Companies
          </h1>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
            Discover company cultures, benefits, and current job openings
          </p>
        </div>
        <div className="w-full md:w-80">
          <SearchInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search companies..."
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-2.5 shadow-xs flex items-center justify-center">
                  <img src={c.logo} alt={c.name} className="w-full h-full object-contain" />
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-50 dark:bg-indigo-950/70 text-[#6D4AFF] dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/60">
                  {c.openJobs} Openings
                </span>
              </div>

              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">{c.name}</h3>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-400 mb-3">{c.industry}</p>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-5">
                {c.description}
              </p>

              <div className="space-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4 mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{c.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  <span>{c.employees} Employees</span>
                </div>
              </div>
            </div>

            <Button
              onClick={() => navigate(`/jobs?keyword=${encodeURIComponent(c.name)}`)}
              variant="secondary"
              size="sm"
              className="w-full justify-center"
            >
              <span>View Jobs at {c.name}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Companies;
