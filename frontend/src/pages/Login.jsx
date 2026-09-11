import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useApp } from '../context/AppContext.jsx';
import Button from '../components/ui/Button.jsx';

export const Login = () => {
  const { login } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      showToast('Welcome back to HireHub!', 'success');
      const requestedPath = location.state?.from?.pathname;
      const dest =
        requestedPath ||
        (res.user?.role === 'admin'
          ? '/admin/dashboard'
          : res.user?.role === 'employer'
            ? '/employer/dashboard'
            : '/dashboard');
      navigate(dest, { replace: true });
    } else {
      setError(res.message);
    }
  };


  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-indigo-500/5 glowing-card transition-colors">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#6D4AFF] to-[#8B5CF6] flex items-center justify-center mx-auto mb-3 shadow-md shadow-indigo-500/20">
            <div className="grid grid-cols-2 gap-1 p-2">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              <span className="w-2 h-2 rounded-full bg-white/80"></span>
              <span className="w-2 h-2 rounded-full bg-white/80"></span>
              <span className="w-2 h-2 rounded-full bg-white"></span>
            </div>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Sign In to HireHub
          </h2>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-400 mt-1">
            Access your job applications, saved listings, or recruitment center
          </p>
        </div>

        {error && (
          <div className="p-3.5 mb-6 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-2xl text-xs font-bold text-rose-700 dark:text-rose-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={loading}
            className="w-full justify-center shadow-md shadow-indigo-500/20 mt-2 glowing-btn"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-center mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-[#6D4AFF] dark:text-indigo-400 font-bold hover:underline">
            Sign up now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
