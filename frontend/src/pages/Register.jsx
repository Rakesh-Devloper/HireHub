import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useApp } from '../context/AppContext.jsx';
import Button from '../components/ui/Button.jsx';

export const Register = () => {
  const { register } = useAuth();
  const { showToast } = useApp();
  const navigate = useNavigate();

  const [role, setRole] = useState('jobseeker');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await register({
      name,
      email,
      password,
      role,
      company: role === 'employer' ? company : undefined,
    });
    setLoading(false);

    if (res.success) {
      showToast('Account created! Welcome to HireHub.', 'success');
      navigate(role === 'employer' ? '/employer/dashboard' : '/dashboard');
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200/90 dark:border-slate-800 shadow-xl shadow-indigo-500/5 glowing-card transition-colors">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Create Your Account
          </h2>
          <p className="text-xs font-semibold text-slate-400 dark:text-slate-400 mt-1">
            Join thousands of professionals finding and posting dream roles
          </p>
        </div>

        {/* Role toggle */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100/80 dark:bg-slate-800 rounded-2xl mb-6">
          <button
            type="button"
            onClick={() => setRole('jobseeker')}
            className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              role === 'jobseeker'
                ? 'bg-white dark:bg-slate-900 text-[#6D4AFF] dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            I'm a Job Seeker
          </button>
          <button
            type="button"
            onClick={() => setRole('employer')}
            className={`py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
              role === 'employer'
                ? 'bg-white dark:bg-slate-900 text-[#6D4AFF] dark:text-indigo-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            I'm an Employer
          </button>
        </div>

        {error && (
          <div className="p-3.5 mb-5 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-2xl text-xs font-bold text-rose-700 dark:text-rose-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. John Doe"
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
              />
            </div>
          </div>

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

          {role === 'employer' && (
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Company Name
              </label>
              <div className="relative flex items-center">
                <Briefcase className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <input
                  type="text"
                  required
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Google, Microsoft, Stripe..."
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5" />
              <input
                type="password"
                required
                minLength={6}
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
            className="w-full justify-center shadow-md shadow-indigo-500/20 mt-2"
          >
            {loading ? 'Registering...' : 'Complete Sign Up'}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>

        <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#6D4AFF] dark:text-indigo-400 font-bold hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
