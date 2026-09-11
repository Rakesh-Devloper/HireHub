import express from 'express';
import {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
} from '../controllers/companyController.js';
import protect from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/', getCompanies);
router.get('/:id', getCompanyById);
router.post('/', protect, authorizeRoles('employer', 'admin'), createCompany);
router.put('/:id', protect, authorizeRoles('employer', 'admin'), updateCompany);

export default router;
