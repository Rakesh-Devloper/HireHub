import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useApp } from '../../context/AppContext.jsx';

export const SkillsManager = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useApp();
  const [newSkill, setNewSkill] = useState('');
  const skills = user?.skills || [];

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    if (skills.includes(newSkill.trim())) {
      showToast('Skill already in list', 'info');
      return;
    }

    const updated = [...skills, newSkill.trim()];
    updateProfile({ skills: updated });
    setNewSkill('');
    showToast(`Added "${newSkill.trim()}" to your skills!`, 'success');
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updated = skills.filter((s) => s !== skillToRemove);
    updateProfile({ skills: updated });
    showToast(`Removed "${skillToRemove}"`, 'info');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-colors">
      <h3 className="text-base font-black text-slate-900 dark:text-white mb-2">Technical Skills</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
        Add the skills you excel at to get automatically matched with suitable job postings.
      </p>

      {/* Input */}
      <form onSubmit={handleAddSkill} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="e.g. Next.js, TypeScript, Docker"
          className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-[#6D4AFF] dark:focus:border-indigo-500"
        />
        <button
          type="submit"
          className="px-4 py-2.5 bg-[#6D4AFF] hover:bg-[#5835E5] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer glowing-btn"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </form>

      {/* Pill Badges */}
      <div className="flex flex-wrap gap-2">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50/70 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-800 text-[#6D4AFF] dark:text-indigo-400 rounded-xl text-xs font-bold"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="hover:text-rose-600 dark:hover:text-rose-400 rounded-full p-0.5 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))
        ) : (
          <p className="text-xs text-slate-400 dark:text-slate-500 italic py-1">
            No skills added yet. Type a skill above and click Add.
          </p>
        )}
      </div>
    </div>
  );
};

export default SkillsManager;
