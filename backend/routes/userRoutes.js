import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  uploadAvatar,
  changePassword,
  toggleSaveJob,
  getSavedJobs,
} from '../controllers/userController.js';
import protect from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.post('/avatar', protect, upload.single('avatar'), uploadAvatar);
router.put('/change-password', protect, changePassword);
router.post('/save-job/:jobId', protect, toggleSaveJob);
router.get('/saved-jobs', protect, getSavedJobs);

export default router;
