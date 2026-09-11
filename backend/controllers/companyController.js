import CompanyModel from '../models/Company.js';
import JobModel from '../models/Job.js';

// @desc    Get all hiring companies
// @route   GET /api/companies
// @access  Public
export const getCompanies = async (req, res, next) => {
  try {
    const companies = await CompanyModel.find({});
    res.json({
      success: true,
      count: companies.length,
      data: companies,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get company details with their jobs
// @route   GET /api/companies/:id
// @access  Public
export const getCompanyById = async (req, res, next) => {
  try {
    let company = await CompanyModel.findById(req.params.id);
    if (!company) {
      // also allow finding by name
      company = await CompanyModel.findOne({ name: req.params.id });
    }

    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    const allJobs = await JobModel.find({ status: 'active' });
    const companyJobs = allJobs.filter(
      (j) => j.company.name.toLowerCase() === company.name.toLowerCase()
    );

    res.json({
      success: true,
      data: {
        company,
        jobs: companyJobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create company profile
// @route   POST /api/companies
// @access  Private (Employer / Admin)
export const createCompany = async (req, res, next) => {
  try {
    const { name, logo, description, tagline, website, industry, location, companySize, foundedYear } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Company name is required' });
    }

    const company = await CompanyModel.create({
      name,
      logo,
      description,
      tagline,
      website,
      industry,
      location,
      companySize,
      foundedYear: Number(foundedYear) || 2020,
      owner: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: 'Company profile created successfully',
      data: company,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update company profile
// @route   PUT /api/companies/:id
// @access  Private (Employer / Admin)
export const updateCompany = async (req, res, next) => {
  try {
    const company = await CompanyModel.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    if (req.user.role !== 'admin' && String(company.owner) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this company',
      });
    }

    const allowedFields = [
      'name',
      'logo',
      'description',
      'tagline',
      'website',
      'industry',
      'location',
      'companySize',
      'foundedYear',
      'bannerImages',
    ];

    const updates = Object.fromEntries(
      allowedFields
        .filter((field) => Object.prototype.hasOwnProperty.call(req.body, field))
        .map((field) => [field, req.body[field]])
    );

    const updated = await CompanyModel.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Company not found' });
    }

    res.json({
      success: true,
      message: 'Company updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
