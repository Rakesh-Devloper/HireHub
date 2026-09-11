import express from 'express';
import {
  getJobSeekerDashboard,
  getEmployerDashboard,
} from '../controllers/dashboardController.js';
import protect from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/jobseeker', protect, authorizeRoles('jobseeker'), getJobSeekerDashboard);
router.get('/employer', protect, authorizeRoles('employer', 'admin'), getEmployerDashboard);

export default router;
