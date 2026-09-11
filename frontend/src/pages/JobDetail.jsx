import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import JobDetailsView from '../components/jobs/JobDetails.jsx';
import Loader from '../components/common/Loader.jsx';
import jobService from '../services/jobService.js';

export const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await jobService.getJobById(id);
        if (res?.data) {
          setJob(res.data);
        } else {
          setError('Job not found');
        }
      } catch (err) {
        setError('Failed to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <Loader text="Loading job posting..." />;

  if (error || !job) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Job Not Found</h2>
        <p className="text-slate-500 mb-6">The job you are looking for may have expired or been removed.</p>
        <Link
          to="/jobs"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#6D4AFF] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to all jobs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/jobs"
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-900 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to job listings
      </Link>
      <JobDetailsView job={job} />
    </div>
  );
};

export default JobDetail;
