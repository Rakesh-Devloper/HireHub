import bcrypt from 'bcryptjs';
import UserModel from '../models/User.js';
import JobModel from '../models/Job.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const safeUser = { ...user };
    delete safeUser.password;

    res.json({
      success: true,
      data: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateUserProfile = async (req, res, next) => {
  try {
    const { name, phone, location, bio, skills, experience, education, profileImage, resume } = req.body;

    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      {
        $set: {
          ...(name && { name }),
          ...(phone !== undefined && { phone }),
          ...(location !== undefined && { location }),
          ...(bio !== undefined && { bio }),
          ...(skills && { skills }),
          ...(experience && { experience }),
          ...(education && { education }),
          ...(profileImage !== undefined && { profileImage }),
          ...(resume !== undefined && { resume }),
        },
      },
      { new: true }
    );

    const safeUser = updatedUser ? { ...updatedUser } : updatedUser;
    if (safeUser) delete safeUser.password;

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Upload user profile picture
// @route   POST /api/users/avatar
// @access  Private
export const uploadAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please select an image file to upload' });
    }
    const avatarUrl = `${(process.env.API_PUBLIC_URL || '').replace(/\/$/, '')}/uploads/${req.file.filename}`;
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user._id,
      { $set: { profileImage: avatarUrl } },
      { new: true }
    );
    const safeUser = updatedUser ? { ...updatedUser } : updatedUser;
    if (safeUser) delete safeUser.password;

    res.json({
      success: true,
      message: 'Profile picture uploaded successfully',
      data: {
        profileImage: avatarUrl,
        user: safeUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Change user password
// @route   PUT /api/users/change-password
// @access  Private
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword || String(newPassword).length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Current password and a new password of at least 6 characters are required',
      });
    }

    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch && currentPassword !== user.password) {
      return res.status(400).json({ success: false, message: 'Current password does not match' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });

    res.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle save/bookmark a job
// @route   POST /api/users/save-job/:jobId
// @access  Private
export const toggleSaveJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    let saved = user.savedJobs || [];
    const index = saved.indexOf(jobId);
    let isSavedNow = false;

    if (index > -1) {
      saved.splice(index, 1);
      isSavedNow = false;
    } else {
      saved.push(jobId);
      isSavedNow = true;
    }

    await UserModel.findByIdAndUpdate(user._id, { savedJobs: saved });

    res.json({
      success: true,
      message: isSavedNow ? 'Job saved to your bookmarks' : 'Job removed from bookmarks',
      data: { savedJobs: saved, isSaved: isSavedNow },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all saved jobs for current user
// @route   GET /api/users/saved-jobs
// @access  Private
export const getSavedJobs = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    const savedIds = user.savedJobs || [];
    const jobs = await JobModel.find({ _id: { $in: savedIds } });

    res.json({
      success: true,
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
};
