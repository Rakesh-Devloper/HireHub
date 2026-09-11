import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, Phone, Globe } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import applicationService from '../../services/applicationService.js';
import Modal from './Modal.jsx';
import Button from '../ui/Button.jsx';

export const ApplyModal = () => {
  const { activeApplicationModalJob, closeApplyModal, showToast } = useApp();
  const { user } = useAuth();

  const [phone, setPhone] = useState(user?.phone || '');
  const [coverLetter, setCoverLetter] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeFileName, setResumeFileName] = useState(user?.resume ? (user.resume.split('/').pop() || 'resume.pdf') : '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!activeApplicationModalJob) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      setResumeFileName(file.name);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!phone) {
      setError('Please provide a contact phone number');
      return;
    }

    setLoading(true);
    try {
      const res = await applicationService.applyForJob({
        jobId: activeApplicationModalJob._id,
        phone,
        coverLetter,
        portfolioUrl,
        resume: resumeFileName || user?.resume || '',
      });

      if (res.success) {
        showToast(`Successfully applied for ${activeApplicationModalJob.title}!`, 'success');
        closeApplyModal();
      } else {
        setError(res.message || 'Could not submit application');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit application. You may have already applied.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={Boolean(activeApplicationModalJob)}
      onClose={closeApplyModal}
      title={`Apply for ${activeApplicationModalJob.title}`}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3.5 bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-900 rounded-2xl flex items-center gap-3 text-xs font-bold text-rose-700 dark:text-rose-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Company and Job Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200/80 dark:border-slate-750 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={activeApplicationModalJob.company?.logo}
              alt=""
              className="w-10 h-10 object-contain rounded-xl bg-white dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700"
            />
            <div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{activeApplicationModalJob.company?.name}</p>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">{activeApplicationModalJob.title}</p>
            </div>
          </div>
          <span className="text-xs font-bold text-[#6D4AFF] dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/70 px-2.5 py-1 rounded-lg border border-indigo-100 dark:border-indigo-800/60">
            {activeApplicationModalJob.location}
          </span>
        </div>

        {/* Phone number */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Phone Number *
          </label>
          <div className="relative flex items-center">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+1 (555) 000-0000"
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-white focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Portfolio or GitHub URL */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Portfolio / GitHub URL (Optional)
          </label>
          <div className="relative flex items-center">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="url"
              value={portfolioUrl}
              onChange={(e) => setPortfolioUrl(e.target.value)}
              placeholder="https://github.com/yourhandle"
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-800 dark:text-white focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Resume Upload Box */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Resume / CV (PDF or DOCX) *
          </label>
          <label className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-[#6D4AFF] dark:hover:border-indigo-500 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50/60 dark:bg-slate-800/40 transition-colors">
            <Upload className="w-6 h-6 text-[#6D4AFF] dark:text-indigo-400 mb-1.5" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {resumeFileName ? resumeFileName : 'Click to upload your resume'}
            </span>
            <span className="text-[11px] text-slate-400 mt-0.5">Supports PDF, DOCX up to 10MB</span>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* Cover Letter */}
        <div>
          <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
            Cover Letter / Note (Optional)
          </label>
          <textarea
            rows={3}
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            placeholder="Introduce yourself and explain why you are a great fit for this role..."
            className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-white focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
          ></textarea>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="secondary" size="md" onClick={closeApplyModal}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={loading}
            className="px-6"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ApplyModal;
