import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-white dark:bg-[#0B0F19] border-t border-slate-200/80 dark:border-slate-800/80 mt-20 pt-12 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-100 dark:border-slate-800">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#6D4AFF] to-[#8B5CF6] flex items-center justify-center shadow-md shadow-indigo-500/20">
              <div className="grid grid-cols-2 gap-1 p-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/80"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white/80"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                Hire<span className="text-[#6D4AFF]">Hub</span>
              </span>
              <span className="text-[10px] font-medium text-slate-400 dark:text-slate-400 mt-0.5">
                Dream Jobs. Real People.
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-bold text-slate-500 dark:text-slate-400">
            <Link to="/jobs" className="hover:text-slate-900 dark:hover:text-white transition-colors">Browse Jobs</Link>
            <Link to="/companies" className="hover:text-slate-900 dark:hover:text-white transition-colors">Companies</Link>
            <Link to="/resources" className="hover:text-slate-900 dark:hover:text-white transition-colors">Guides & Resources</Link>
            <Link to="/pricing" className="hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</Link>
            <Link to="/employer/dashboard" className="hover:text-slate-900 dark:hover:text-white transition-colors">For Employers</Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-[#6D4AFF] dark:hover:text-indigo-400 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-[#6D4AFF] dark:hover:text-indigo-400 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#6D4AFF] dark:hover:text-indigo-400 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-[#6D4AFF] dark:hover:text-indigo-400 transition-colors p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 text-xs text-slate-400 dark:text-slate-500 gap-3">
          <p>© 2026 HireHub. All rights reserved.</p>
          <p className="flex items-center gap-1 font-medium">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline mx-0.5" /> for a better future.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
