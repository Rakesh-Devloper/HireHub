import React, { useState, useRef } from 'react';
import { Upload, Camera, Sparkles } from 'lucide-react';
import ProfileCard from '../components/profile/ProfileCard.jsx';
import ResumeUpload from '../components/profile/ResumeUpload.jsx';
import SkillsManager from '../components/profile/SkillsManager.jsx';
import Modal from '../components/common/Modal.jsx';
import Button from '../components/ui/Button.jsx';
import UserAvatar from '../components/common/UserAvatar.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { useApp } from '../context/AppContext.jsx';
import { uploadFile } from '../services/api.js';

export const Profile = () => {
  const { user, updateProfile, updateUser } = useAuth();
  const { showToast } = useApp();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    name: user?.name || '',
    location: user?.location || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    profileImage: user?.profileImage || '',
  });

  const handleAvatarFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/') || file.size > 10 * 1024 * 1024) {
      showToast('Please choose an image up to 10MB.', 'danger');
      e.target.value = '';
      return;
    }

    try {
      const result = await uploadFile(file, 'avatar', '/users/avatar');
      const avatarUrl = result?.data?.profileImage;
      if (!avatarUrl) throw new Error('Upload did not return a profile image URL');

      setForm((prev) => ({ ...prev, profileImage: avatarUrl }));
      updateUser(result.data.user);
      showToast('Profile photo uploaded successfully.', 'success');
    } catch (error) {
      showToast(error.response?.data?.message || error.message || 'Profile photo upload failed.', 'danger');
    } finally {
      e.target.value = '';
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const result = await updateProfile(form);
    if (!result.success) {
      showToast(result.message || 'Failed to update profile.', 'danger');
      return;
    }

    if (updateUser) updateUser(result.data);
    showToast('Profile information updated successfully!', 'success');
    setIsEditOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          My Career Profile
        </h1>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal details, custom photo, uploaded resume, and verified skills
        </p>
      </div>

      <ProfileCard user={user} onEdit={() => {
        setForm({
          name: user?.name || '',
          location: user?.location || '',
          phone: user?.phone || '',
          bio: user?.bio || '',
          profileImage: user?.profileImage || '',
        });
        setIsEditOpen(true);
      }} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ResumeUpload />
        <SkillsManager />
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        title="Edit Profile Information"
      >
        <form onSubmit={handleSave} className="space-y-4">
          {/* Avatar Preview & Upload in Edit modal */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <UserAvatar src={form.profileImage} name={form.name} size="lg" />
            <div className="flex-1">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Profile Photo</p>
              <p className="text-[11px] text-slate-400 dark:text-slate-400">
                Upload your own photo from your device
              </p>
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleAvatarFile}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#6D4AFF] hover:bg-[#5B3EE0] text-white flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <Upload className="w-3 h-3" /> Choose Image
                </button>
                {form.profileImage && (
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, profileImage: '' }))}
                    className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors cursor-pointer"
                  >
                    Remove Photo
                  </button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-[#6D4AFF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-[#6D4AFF]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Phone
              </label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:border-[#6D4AFF]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
              Professional Bio
            </label>
            <textarea
              rows={4}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:outline-hidden focus:border-[#6D4AFF]"
            ></textarea>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <Button variant="secondary" size="md" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md" className="glowing-btn">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Profile;
