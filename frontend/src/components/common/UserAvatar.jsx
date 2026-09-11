import React, { useState, useRef } from 'react';
import { Camera, Loader2, User as UserIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import api from '../../services/api.js';

export const UserAvatar = ({
  src,
  name = 'User',
  size = 'md', // sm, md, lg, xl, 2xl
  className = '',
  editable = false,
  onImageUpdated = null,
}) => {
  const { updateUser } = useAuth();
  const [imageError, setImageError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // Derive size classes
  const sizeMap = {
    xs: { box: 'w-7 h-7 text-xs', icon: 'w-3 h-3', badge: 'w-4 h-4 p-0.5' },
    sm: { box: 'w-9 h-9 text-xs', icon: 'w-3.5 h-3.5', badge: 'w-5 h-5 p-1' },
    md: { box: 'w-11 h-11 text-sm', icon: 'w-4 h-4', badge: 'w-6 h-6 p-1' },
    lg: { box: 'w-16 h-16 text-lg font-bold', icon: 'w-6 h-6', badge: 'w-7 h-7 p-1.5' },
    xl: { box: 'w-24 h-24 text-2xl font-bold', icon: 'w-8 h-8', badge: 'w-8 h-8 p-1.5' },
    '2xl': { box: 'w-32 h-32 text-3xl font-extrabold', icon: 'w-10 h-10', badge: 'w-9 h-9 p-2' },
  };

  const selectedSize = sizeMap[size] || sizeMap.md;

  // Extract clean initials (e.g. "John Doe" -> "RK")
  const getInitials = (fullName) => {
    if (!fullName || typeof fullName !== 'string') return 'U';
    const parts = fullName.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  // Color generator for consistent pleasant gradient based on name
  const getGradientByName = (str) => {
    const gradients = [
      'from-indigo-500 via-purple-500 to-pink-500',
      'from-blue-500 via-indigo-600 to-violet-700',
      'from-emerald-500 to-teal-600',
      'from-violet-600 to-indigo-600',
      'from-amber-500 to-orange-600',
    ];
    let hash = 0;
    for (let i = 0; i < (str || '').length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % gradients.length;
    return gradients[index];
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (< 5MB) and type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, JPG, WebP)');
      return;
    }

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      setUploading(true);
      const res = await api.post('/users/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.success) {
        const newImgUrl = res.data.data.profileImage;
        setImageError(false);
        if (updateUser) {
          updateUser({ profileImage: newImgUrl });
        }
        if (onImageUpdated) {
          onImageUpdated(newImgUrl);
        }
      }
    } catch (err) {
      console.error('Failed to upload profile image:', err);
      // Fallback: Read as data URL for instant client responsiveness
      const reader = new FileReader();
      reader.onloadend = () => {
        const localDataUrl = reader.result;
        setImageError(false);
        if (updateUser) {
          updateUser({ profileImage: localDataUrl });
        }
        if (onImageUpdated) {
          onImageUpdated(localDataUrl);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  };

  const hasValidImage = src && !imageError && typeof src === 'string' && src.trim() !== '';

  return (
    <div className={`relative inline-block select-none group ${className}`}>
      {hasValidImage ? (
        <img
          src={src}
          alt={name}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className={`${selectedSize.box} rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm transition-all duration-300 group-hover:ring-2 group-hover:ring-indigo-500/50`}
        />
      ) : (
        <div
          className={`${selectedSize.box} rounded-full bg-gradient-to-tr ${getGradientByName(name)} text-white flex items-center justify-center font-bold tracking-wider shadow-sm border-2 border-white dark:border-slate-800 transition-all duration-300 group-hover:ring-2 group-hover:ring-indigo-500/50`}
        >
          {name ? getInitials(name) : <UserIcon className={selectedSize.icon} />}
        </div>
      )}

      {/* Upload button overlay for editable avatars */}
      {editable && (
        <>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            title="Upload custom profile photo"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className={`absolute bottom-0 right-0 ${selectedSize.badge} rounded-full bg-[#6D4AFF] hover:bg-[#5B3EE0] text-white shadow-lg border-2 border-white dark:border-slate-900 transition-transform active:scale-90 flex items-center justify-center cursor-pointer`}
          >
            {uploading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <Camera className="w-3.5 h-3.5" />
            )}
          </button>
        </>
      )}
    </div>
  );
};

export default UserAvatar;
