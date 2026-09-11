import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Rocket, ArrowRight } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { useApp } from '../../context/AppContext.jsx';
import Testimonials from '../common/Testimonials.jsx';

export const FeaturedCompany = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { showToast } = useApp();

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    showToast(isFollowing ? 'Unfollowed Google' : 'Following Google for job alerts!', 'success');
  };

  const images = [
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=300&q=80',
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors">
      <h3 className="text-base font-black text-slate-900 dark:text-white mb-4">Featured Company</h3>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center shadow-xs">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm">Google</h4>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-400">10K+ Jobs</span>
          </div>
        </div>

        <button
          onClick={handleFollow}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer glowing-btn ${
            isFollowing
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
              : 'bg-[#6D4AFF] text-white hover:bg-indigo-700 shadow-xs'
          }`}
        >
          {isFollowing ? 'Following' : 'Follow'}
        </button>
      </div>

      <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-4">
        Build for everyone. Create for a better tomorrow.
      </p>

      {/* Office Photos Montage */}
      <div className="grid grid-cols-4 gap-2">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt="Google Office"
            className="w-full h-16 object-cover rounded-xl border border-slate-100 dark:border-slate-800 shadow-2xs"
          />
        ))}
      </div>
    </div>
  );
};

export const UpgradeCard = () => {
  const { showToast } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-tr from-[#6D4AFF] via-[#7B57FF] to-[#3B82F6] rounded-3xl p-6 text-white shadow-xl shadow-indigo-500/20">
      {/* Background soft glow / shapes */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>

      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300">
          <Crown className="w-4 h-4" />
        </div>
      </div>

      <h4 className="text-base font-black tracking-tight leading-snug mb-1">
        Get Noticed by Top Companies
      </h4>
      <p className="text-xs text-white/80 leading-relaxed mb-5">
        Upgrade to Premium and get 3x more chances to get hired.
      </p>

      <button
        onClick={() => showToast('Redirecting to HireHub Premium checkout...', 'success')}
        className="w-full py-2.5 px-4 bg-white text-[#6D4AFF] hover:bg-slate-50 rounded-2xl text-xs font-black flex items-center justify-center gap-2 shadow-md transition-all hover:scale-[1.02] cursor-pointer"
      >
        <span>Upgrade Now</span>
        <ArrowRight className="w-4 h-4" />
      </button>

      {/* Decorative rocket icon */}
      <div className="absolute -bottom-2 right-4 text-white/20 pointer-events-none">
        <Rocket className="w-20 h-20 transform rotate-12" />
      </div>
    </div>
  );
};

export const SuccessStoriesCard = () => {
  return <Testimonials variant="card" autoPlayInterval={6000} />;
};

export default FeaturedCompany;
