import express from 'express';
import {
  applyForJob,
  getMyApplications,
  getApplicationsForJob,
  updateApplicationStatus,
} from '../controllers/applicationController.js';
import protect from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('jobseeker'), applyForJob);
router.post('/apply', protect, authorizeRoles('jobseeker'), applyForJob);
router.get('/my-applications', protect, getMyApplications);
router.get('/job/:jobId', protect, authorizeRoles('employer', 'admin'), getApplicationsForJob);
router.put('/:id/status', protect, authorizeRoles('employer', 'admin'), updateApplicationStatus);

export default router;
