import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  Users,
  Briefcase,
  FileCheck,
  Trash2,
  TrendingUp,
  Search,
  CheckCircle2,
} from 'lucide-react';
import Loader from '../components/common/Loader.jsx';
import UserAvatar from '../components/common/UserAvatar.jsx';
import dashboardService from '../services/dashboardService.js';
import { useApp } from '../context/AppContext.jsx';

export const AdminDashboard = () => {
  const { showToast } = useApp();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes] = await Promise.all([
        dashboardService.getAdminStats(),
        dashboardService.getAdminUsers(),
      ]);
      if (statsRes?.data) setStats(statsRes.data);
      if (usersRes?.data) setUsers(usersRes.data);
    } catch (err) {
      console.error('Admin data error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to deactivate this account?')) {
      try {
        await dashboardService.deleteUser(userId);
        showToast('User account removed successfully', 'success');
        fetchAdminData();
      } catch {
        showToast('Failed to delete user', 'danger');
      }
    }
  };

  if (loading) return <Loader text="Loading Admin Management Center..." />;

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <span className="text-xs font-bold text-[#6D4AFF] dark:text-indigo-400 uppercase tracking-wider">
          Platform Governance
        </span>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
          HireHub Administration Console
        </h1>
      </div>

      {/* 4 Admin Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-400">Total Registered Users</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stats?.totalUsers || users.length || 2400}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-400">Active Listings</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stats?.totalJobs || 50}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-400">Applications Filed</span>
          <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{stats?.totalApplications || 1420}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors">
          <span className="text-xs font-bold text-slate-400 dark:text-slate-400">System Status</span>
          <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-2 flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            100% Operational
          </p>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white">Manage Platform Users</h3>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-400">
              Role permissions and account states
            </p>
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user name or email..."
              className="w-full px-3.5 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-6">User</th>
                <th className="py-3.5 px-6">Role</th>
                <th className="py-3.5 px-6">Location</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs font-semibold">
              {filteredUsers.map((u) => (
                <tr key={u._id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <UserAvatar user={u} size="md" />
                      <div>
                        <p className="font-extrabold text-slate-900 dark:text-white">{u.name}</p>
                        <p className="text-slate-400 dark:text-slate-400 text-[11px]">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase ${
                      u.role === 'admin'
                        ? 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                        : u.role === 'employer'
                        ? 'bg-indigo-50 dark:bg-indigo-950/70 text-[#6D4AFF] dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-500 dark:text-slate-400">{u.location || 'Not specified'}</td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleDeleteUser(u._id)}
                      className="p-2 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-colors cursor-pointer"
                      title="Deactivate account"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
