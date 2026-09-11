import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  User,
  Bookmark,
  Send,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  Building2,
  Menu,
  X,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useApp } from '../../context/AppContext.jsx';
import UserAvatar from './UserAvatar.jsx';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications, unreadCount, markAllNotificationsRead, isDarkMode, toggleDarkMode } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'Companies', path: '/companies' },
    { name: 'For Employers', path: '/employer/dashboard' },
    { name: 'Resources', path: '/resources' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#6D4AFF] to-[#8B5CF6] flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="grid grid-cols-2 gap-1 p-2">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                <span className="w-2 h-2 rounded-full bg-white/80"></span>
                <span className="w-2 h-2 rounded-full bg-white/80"></span>
                <span className="w-2 h-2 rounded-full bg-white"></span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                Hire<span className="text-[#6D4AFF]">Hub</span>
              </span>
              <span className="text-[11px] font-medium text-slate-400 dark:text-slate-400 mt-0.5 tracking-wide">
                Dream Jobs. Real People.
              </span>
            </div>
          </Link>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive =
                link.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-full text-[14px] font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-[#6D4AFF] bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100/60 dark:border-indigo-800/40 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/60 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle icon */}
            <button
              id="theme-toggle-btn"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              onClick={toggleDarkMode}
              className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* Notifications with Dropdown */}
            <div className="relative" ref={notifRef}>
              <button
                id="notifications-bell-btn"
                title="Notifications"
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  if (!notificationsOpen) markAllNotificationsRead();
                }}
                className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                )}
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">Notifications</h3>
                    <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer hover:underline" onClick={markAllNotificationsRead}>
                      Mark all as read
                    </span>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                    {notifications.map((n) => (
                      <div key={n.id} className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">{n.title}</p>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">{n.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile / Auth Area */}
            {isAuthenticated && user ? (
              <div className="relative" ref={profileRef}>
                <button
                  id="user-profile-menu-btn"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-3 pl-1 pr-2 py-1 rounded-full border border-slate-200/90 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all cursor-pointer"
                >
                  <UserAvatar src={user.profileImage} name={user.name} size="sm" />
                  <div className="hidden sm:flex flex-col text-left">
                    <span className="text-[13px] font-bold text-slate-900 dark:text-white leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-400 capitalize">
                      {user.role === 'jobseeker' ? 'Job Seeker' : user.role}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500 ml-0.5" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-xs text-slate-400 uppercase font-semibold tracking-wider">Signed in as</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate mt-0.5">{user.name}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-[#6D4AFF] dark:hover:text-indigo-400 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Job Seeker Dashboard
                      </Link>

                      <Link
                        to="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-[#6D4AFF] dark:hover:text-indigo-400 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        My Profile & Photo
                      </Link>

                      <Link
                        to="/saved-jobs"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-[#6D4AFF] dark:hover:text-indigo-400 transition-colors"
                      >
                        <Bookmark className="w-4 h-4" />
                        Saved Jobs
                      </Link>

                      <Link
                        to="/applications"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 hover:text-[#6D4AFF] dark:hover:text-indigo-400 transition-colors"
                      >
                        <Send className="w-4 h-4" />
                        Applied Jobs
                      </Link>
                    </div>

                    <div className="border-t border-slate-100 dark:border-slate-800 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                          navigate('/login');
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-full text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 rounded-full text-sm font-bold text-white glowing-btn"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-100 dark:border-slate-800 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-[#6D4AFF] dark:hover:text-indigo-400 rounded-xl"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 px-4 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Appearance</span>
              <button
                id="mobile-theme-toggle-btn"
                onClick={toggleDarkMode}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-slate-600" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
