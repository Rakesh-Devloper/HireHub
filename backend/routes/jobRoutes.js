import express from 'express';
import {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  getMyJobs,
  getJobCategories,
} from '../controllers/jobController.js';
import protect from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/categories', getJobCategories);
router.get('/', getJobs);
router.get('/my-jobs', protect, authorizeRoles('employer', 'admin'), getMyJobs);
router.get('/:id', getJobById);
router.post('/', protect, authorizeRoles('employer', 'admin'), createJob);
router.put('/:id', protect, authorizeRoles('employer', 'admin'), updateJob);
router.delete('/:id', protect, authorizeRoles('employer', 'admin'), deleteJob);

export default router;
