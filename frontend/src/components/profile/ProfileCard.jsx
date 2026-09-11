import React from 'react';
import { MapPin, Phone, Mail, Edit3, Briefcase, GraduationCap, Sparkles } from 'lucide-react';
import Button from '../ui/Button.jsx';
import UserAvatar from '../common/UserAvatar.jsx';

export const ProfileCard = ({ user, onEdit }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs glowing-card transition-all">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="relative">
            <UserAvatar
              src={user?.profileImage}
              name={user?.name}
              size="xl"
              editable={true}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{user?.name || "Your Name"}</h2>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/60 text-[#6D4AFF] dark:text-indigo-400 border border-indigo-100 dark:border-indigo-800/40">
                <Sparkles className="w-2.5 h-2.5" /> Verified
              </span>
            </div>
            <p className="text-sm font-semibold text-[#6D4AFF] dark:text-indigo-400 capitalize mt-0.5">
              {user?.role === "jobseeker" ? "Job Seeker" : (user?.role || "Member")}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                {user?.location || "Not specified"}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                {user?.email || "Not specified"}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                {user?.phone || "Not specified"}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-2 flex items-center gap-1">
              Click the camera icon on your photo to upload a custom profile picture
            </p>
          </div>
        </div>

        <Button
          onClick={onEdit}
          variant="secondary"
          size="sm"
          icon={Edit3}
          className="shadow-2xs self-stretch sm:self-auto glowing-btn"
        >
          Edit Profile
        </Button>
      </div>

      {/* Bio */}
      <div className="py-6 border-b border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
          About Me
        </h4>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {user?.bio || "No bio added yet. Click Edit Profile to add your career summary."}
        </p>
      </div>

      {/* Experience & Education */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-[#6D4AFF] dark:text-indigo-400" />
            Experience
          </h4>
          <div className="space-y-3">
            {user?.experience && user.experience.length > 0 ? (
              user.experience.map((exp, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{exp.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{exp.company} • {exp.period}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 dark:text-slate-500 italic py-2">No experience entries listed yet.</p>
            )}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <GraduationCap className="w-3.5 h-3.5 text-[#6D4AFF] dark:text-indigo-400" />
            Education
          </h4>
          <div className="space-y-3">
            {user?.education && user.education.length > 0 ? (
              user.education.map((edu, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">{edu.degree}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{edu.institution} • {edu.year}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 dark:text-slate-500 italic py-2">No education entries listed yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
