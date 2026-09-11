import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  Users,
  TrendingUp,
  ArrowRight,
} from 'lucide-react';
import Hero from '../components/common/Hero.jsx';
import JobCard from '../components/jobs/JobCard.jsx';
import JobCategories from '../components/jobs/JobCategories.jsx';
import FeaturedJobs from '../components/jobs/FeaturedJobs.jsx';
import Testimonials from '../components/common/Testimonials.jsx';
import StatCard from '../components/ui/StatCard.jsx';
import WelcomeCard from '../components/dashboard/DashboardStats.jsx';
import ProfileStrength from '../components/dashboard/ProfileStrength.jsx';
import ApplicationChart from '../components/dashboard/ApplicationChart.jsx';
import SkillsChart from '../components/dashboard/SkillsChart.jsx';
import {
  FeaturedCompany,
  UpgradeCard,
  SuccessStoriesCard,
} from '../components/dashboard/FeaturedCompany.jsx';
import jobService from '../services/jobService.js';
import dashboardService from '../services/dashboardService.js';
import { useAuth } from '../context/AuthContext.jsx';
import Loader from '../components/common/Loader.jsx';

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [jobsRes, dashRes] = await Promise.all([
          jobService.getJobs({ limit: 6 }),
          dashboardService.getJobSeekerDashboard().catch(() => null),
        ]);

        if (jobsRes?.data) {
          setJobs(jobsRes.data);
        }
        if (dashRes?.data) {
          setDashboardData(dashRes.data);
        }
      } catch (err) {
        console.error('Home load error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchParams) => {
    const query = new URLSearchParams();
    if (searchParams.keyword) query.set('keyword', searchParams.keyword);
    if (searchParams.location) query.set('location', searchParams.location);
    if (searchParams.experience && searchParams.experience !== 'All Levels') {
      query.set('experienceLevel', searchParams.experience);
    }
    if (searchParams.jobType && searchParams.jobType !== 'Jobs' && searchParams.jobType !== 'All') {
      if (searchParams.jobType === 'Remote') {
        query.set('remote', 'true');
      } else if (searchParams.jobType === 'Engineering' || searchParams.jobType === 'Design') {
        query.set('category', searchParams.jobType);
      } else {
        query.set('jobType', searchParams.jobType);
      }
    }
    navigate(`/jobs?${query.toString()}`);
  };

  return (
    <div className="min-h-screen">
      {/* High-Impact Hero Section with Search */}
      <Hero onSearch={handleSearch} />

      {/* 4 Statistics Cards Row */}
      <section className="py-2 -mt-4 mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard
              icon={Briefcase}
              number="50K+"
              label="Active Jobs"
              iconColor="text-indigo-600"
              iconBg="bg-indigo-50 dark:bg-indigo-950/60"
            />
            <StatCard
              icon={Building2}
              number="10K+"
              label="Companies"
              iconColor="text-orange-500"
              iconBg="bg-orange-50 dark:bg-orange-950/60"
            />
            <StatCard
              icon={Users}
              number="2M+"
              label="Job Seekers"
              iconColor="text-blue-600"
              iconBg="bg-blue-50 dark:bg-blue-950/60"
            />
            <StatCard
              icon={TrendingUp}
              number="95%"
              label="Success Rate"
              iconColor="text-emerald-600"
              iconBg="bg-emerald-50 dark:bg-emerald-950/60"
            />
          </div>
        </div>
      </section>

      {/* Candidate Career Intelligence Hub (Balanced 3-column row) */}
      <section className="py-8 bg-slate-50/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Your Career Intelligence Hub
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                Real-time tracking of your profile readiness, application statuses, and market skills
              </p>
            </div>
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#6D4AFF] dark:text-indigo-400 hover:underline cursor-pointer"
            >
              <span>Full Candidate Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* 1. Welcome & Activity Card */}
            <WelcomeCard
              userName={user?.name}
              stats={{
                applied: dashboardData?.stats?.totalApplications || 12,
                interviews: dashboardData?.stats?.interviewScheduled || 3,
                offers: dashboardData?.stats?.offers || 2,
              }}
            />

            {/* 2. Application Pipeline Status Donut */}
            <ApplicationChart
              total={dashboardData?.applicationBreakdown?.total || 24}
              data={
                dashboardData?.applicationBreakdown?.chartData || [
                  { name: 'Applied', value: 12, color: '#6D4AFF' },
                  { name: 'Under Review', value: 6, color: '#3B82F6' },
                  { name: 'Interview', value: 4, color: '#8B5CF6' },
                  { name: 'Offer', value: 2, color: '#10B981' },
                ]
              }
            />

            {/* 3. Top Skills In Demand */}
            <SkillsChart
              skills={
                dashboardData?.topSkillsInDemand || [
                  { name: 'JavaScript', percentage: 85, color: '#3B82F6' },
                  { name: 'Python', percentage: 72, color: '#3B82F6' },
                  { name: 'React.js', percentage: 68, color: '#6D4AFF' },
                  { name: 'Node.js', percentage: 60, color: '#6D4AFF' },
                  { name: 'UI/UX', percentage: 52, color: '#8B5CF6' },
                ]
              }
            />
          </div>
        </div>
      </section>

      {/* Explore Jobs by Category */}
      <section className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <JobCategories />
        </div>
      </section>

      {/* Featured High-Priority Jobs Showcase */}
      <section className="py-10 bg-slate-50/70 dark:bg-slate-900/30 border-y border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeaturedJobs />
        </div>
      </section>

      {/* Latest Job Opportunities (Full-width 3-Column Responsive Grid) */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-[#6D4AFF] dark:text-indigo-400 text-xs font-extrabold mb-2">
                <span>Direct Openings</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                Latest Job Opportunities
              </h2>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                Fresh roles published in the past 24 hours from verified hiring partners
              </p>
            </div>
            <button
              onClick={() => navigate('/jobs')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-black text-slate-800 dark:text-white hover:border-[#6D4AFF] transition-all shadow-xs cursor-pointer shrink-0"
            >
              <span>Explore All 50,000+ Jobs</span>
              <ArrowRight className="w-4 h-4 text-[#6D4AFF]" />
            </button>
          </div>

          {/* Jobs List Grid: 3 columns to fully utilize width with zero empty space */}
          {loading ? (
            <Loader text="Fetching latest positions..." />
          ) : jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              <p className="text-slate-500 dark:text-slate-400 font-bold">No jobs available right now.</p>
            </div>
          )}

          {/* Bottom Browse More Bar */}
          <div className="mt-10 text-center">
            <button
              onClick={() => navigate('/jobs')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl text-xs font-black text-white glowing-btn shadow-lg shadow-indigo-500/20 cursor-pointer"
            >
              <span>View All 50,000+ Verified Openings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Featured Employer Spotlight & Career Accelerators (Balanced 2-Column Grid) */}
      <section className="py-12 bg-slate-50/70 dark:bg-slate-900/30 border-t border-slate-200/60 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured Employers & Accelerators
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
              Connect with top tech companies actively hiring senior engineering, product, and design leaders
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Featured Employer Card */}
            <FeaturedCompany />

            {/* Profile Boost & Upgrade Card */}
            <UpgradeCard />
          </div>
        </div>
      </section>

      {/* Rotating User Success Stories with Verified Badges */}
      <Testimonials />
    </div>
  );
};

export default Home;
