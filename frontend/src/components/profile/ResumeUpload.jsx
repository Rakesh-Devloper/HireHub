import React, { useState } from 'react';
import { Upload, FileText, Download, CheckCircle, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useApp } from '../../context/AppContext.jsx';
import { uploadFile } from '../../services/api.js';

export const ResumeUpload = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useApp();
  const [resumeName, setResumeName] = useState(
    user?.resume ? (user.resume.split("/").pop() || "resume.pdf") : ""
  );

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!allowed.includes(file.type) || file.size > 10 * 1024 * 1024) {
      showToast('Please choose a PDF, DOC, or DOCX file up to 10MB.', 'danger');
      e.target.value = '';
      return;
    }

    try {
      const result = await uploadFile(file);
      const resumeUrl = result?.data?.url;
      if (!resumeUrl) throw new Error('Upload did not return a file URL');

      const profileResult = await updateProfile({ resume: resumeUrl });
      if (!profileResult.success) throw new Error(profileResult.message || 'Profile update failed');

      setResumeName(file.name);
      showToast('Resume uploaded and attached to your profile.', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || error.message || 'Resume upload failed.', 'danger');
    } finally {
      e.target.value = '';
    }
  };

  const handleRemove = () => {
    setResumeName('');
    updateProfile({ resume: '' });
    showToast('Resume removed from profile', 'info');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors">
      <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">Resume / CV</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Upload your latest resume to automatically apply to jobs in 1 click.
      </p>

      {resumeName ? (
        <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800 text-[#6D4AFF] dark:text-indigo-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">{resumeName}</p>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Active & Verified
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => user?.resume && window.open(user.resume, '_blank', 'noopener,noreferrer')}
              className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={handleRemove}
              className="p-2 text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
              title="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <label className="border-2 border-dashed border-slate-200 dark:border-slate-700 hover:border-[#6D4AFF] dark:hover:border-indigo-500 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-50/60 dark:bg-slate-800/40 transition-colors">
          <Upload className="w-8 h-8 text-[#6D4AFF] dark:text-indigo-400 mb-2" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
            Upload your resume document
          </span>
          <span className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5">
            Supports PDF, DOC, DOCX up to 10MB
          </span>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
};

export default ResumeUpload;
