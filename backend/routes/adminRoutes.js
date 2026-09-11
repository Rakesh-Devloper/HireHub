import express from 'express';
import {
  getAdminStats,
  getUsers,
  deleteUser,
  getAdminJobs,
  getAdminAnalytics,
} from '../controllers/adminController.js';
import protect from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/stats', getAdminStats);
router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);
router.get('/jobs', getAdminJobs);
router.get('/analytics', getAdminAnalytics);

export default router;
