import JobModel from '../models/Job.js';

// @desc    Get all jobs with multi-facet filtering and search
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req, res, next) => {
  try {
    const {
      keyword,
      location,
      jobType,
      category,
      experienceLevel,
      remote,
      featured,
      sort,
      page = 1,
      limit = 12,
    } = req.query;

    const rawJobs = await JobModel.find({ status: 'active' });
    let allJobs = Array.isArray(rawJobs) ? rawJobs : (rawJobs?.documents || []);

    let filtered = [...allJobs];

    // Multi-token keyword search across title, company, description, skills, category
    if (keyword && keyword.trim()) {
      const q = keyword.toLowerCase().trim();
      const tokens = q.split(/\s+/).filter(Boolean);

      filtered = filtered.filter((job) => {
        const title = (job.title || '').toLowerCase();
        const companyName = (typeof job.company === 'string' ? job.company : job.company?.name || '').toLowerCase();
        const desc = (job.description || '').toLowerCase();
        const jobCat = (job.category || '').toLowerCase();
        const jobLocation = (job.location || '').toLowerCase();
        const skillsList = Array.isArray(job.skills) ? job.skills.map((s) => String(s).toLowerCase()) : [];
        const skillsStr = skillsList.join(' ');

        // Direct full phrase match
        if (
          title.includes(q) ||
          companyName.includes(q) ||
          desc.includes(q) ||
          jobCat.includes(q) ||
          jobLocation.includes(q) ||
          skillsStr.includes(q)
        ) {
          return true;
        }

        // Check if every individual search token is present in at least one attribute
        return tokens.every(
          (t) =>
            title.includes(t) ||
            companyName.includes(t) ||
            desc.includes(t) ||
            jobCat.includes(t) ||
            jobLocation.includes(t) ||
            skillsList.some((s) => s.includes(t))
        );
      });
    }

    // Location search with fuzzy city and remote aliases
    if (location && location.trim() && location.trim().toLowerCase() !== 'all places') {
      const loc = location.toLowerCase().trim();
      filtered = filtered.filter((job) => {
        const jobLoc = (job.location || '').toLowerCase();
        if (loc === 'remote') {
          return job.remote === true || jobLoc.includes('remote');
        }
        if (loc.includes('bangalore') || loc.includes('bengaluru')) {
          return jobLoc.includes('bengaluru') || jobLoc.includes('bangalore');
        }
        if (loc.includes('delhi') || loc.includes('ncr')) {
          return jobLoc.includes('delhi') || jobLoc.includes('ncr') || jobLoc.includes('gurugram') || jobLoc.includes('noida');
        }
        return jobLoc.includes(loc);
      });
    }

    // Job Type & Hero tab categories
    if (jobType && jobType !== 'All' && jobType !== 'Jobs' && jobType !== 'All Positions') {
      const jtLower = jobType.toLowerCase().trim();
      filtered = filtered.filter((job) => {
        if (jtLower === 'remote' || jtLower === 'remote only') {
          return job.remote === true || (job.location || '').toLowerCase().includes('remote');
        }
        if (jtLower.includes('intern')) {
          return (job.jobType || '').toLowerCase().includes('intern');
        }
        if (jtLower === 'full time') {
          return (job.jobType || '').toLowerCase().includes('full');
        }
        if (jtLower === 'part time') {
          return (job.jobType || '').toLowerCase().includes('part');
        }
        if (jtLower === 'contract') {
          return (job.jobType || '').toLowerCase().includes('contract');
        }
        // If passed category as jobType tab (e.g. Engineering or Design)
        if (jtLower === 'engineering' || jtLower.includes('tech')) {
          const cat = (job.category || '').toLowerCase();
          return cat.includes('software') || cat.includes('engineering') || cat.includes('tech');
        }
        if (jtLower === 'design') {
          return (job.category || '').toLowerCase().includes('design');
        }
        return (job.jobType || '').toLowerCase() === jtLower;
      });
    }

    // Category filter
    if (category && category !== 'All' && category !== 'All Industries') {
      const catLower = category.toLowerCase().trim();
      filtered = filtered.filter((job) => {
        const jobCat = (job.category || '').toLowerCase();
        if (jobCat === catLower) return true;
        if (catLower.includes('software') || catLower.includes('engineering') || catLower.includes('tech')) {
          return jobCat.includes('software') || jobCat.includes('engineering') || jobCat.includes('tech');
        }
        if (catLower.includes('design')) return jobCat.includes('design');
        if (catLower.includes('marketing')) return jobCat.includes('marketing');
        if (catLower.includes('data')) return jobCat.includes('data') || jobCat.includes('analytics');
        if (catLower.includes('finance')) return jobCat.includes('finance');
        if (catLower.includes('product')) return jobCat.includes('product');
        if (catLower.includes('human') || catLower.includes('hr')) return jobCat.includes('human') || jobCat.includes('hr');
        if (catLower.includes('support')) return jobCat.includes('support') || jobCat.includes('customer');
        return jobCat.includes(catLower) || catLower.includes(jobCat);
      });
    }

    // Experience level filter (with support for "Entry Level (0-2 yrs)", etc.)
    if (experienceLevel && experienceLevel !== 'All' && experienceLevel !== 'All Levels') {
      const expLower = experienceLevel.toLowerCase().trim();
      filtered = filtered.filter((job) => {
        const jobExp = (job.experienceLevel || '').toLowerCase();
        if (jobExp === expLower) return true;
        if (expLower.includes('entry')) return jobExp.includes('entry');
        if (expLower.includes('mid')) return jobExp.includes('mid');
        if (expLower.includes('senior')) return jobExp.includes('senior');
        if (expLower.includes('lead') || expLower.includes('director') || expLower.includes('exec')) {
          return jobExp.includes('lead') || jobExp.includes('director');
        }
        return jobExp.includes(expLower);
      });
    }

    // Remote boolean flag
    if (remote === 'true' || remote === true) {
      filtered = filtered.filter((job) => job.remote === true || (job.location || '').toLowerCase().includes('remote'));
    }

    // Featured flag
    if (featured === 'true' || featured === true) {
      filtered = filtered.filter((job) => job.featured === true);
    }

    // Sorting
    if (sort === 'oldest') {
      filtered.sort((a, b) => new Date(a.createdAt || 0) - new Date(b.createdAt || 0));
    } else if (sort === 'salary-high') {
      filtered.sort((a, b) => (b.salaryMax || 0) - (a.salaryMax || 0));
    } else {
      // newest default
      filtered.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    const total = filtered.length;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 12);
    const startIndex = (pageNum - 1) * limitNum;
    const paginated = filtered.slice(startIndex, startIndex + limitNum);

    res.json({
      success: true,
      count: paginated.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      data: paginated,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single job by ID
// @route   GET /api/jobs/:id
// @access  Public
export const getJobById = async (req, res, next) => {
  try {
    const job = await JobModel.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Also find related jobs in same category
    const allJobs = await JobModel.find({ status: 'active' });
    const related = allJobs
      .filter((j) => String(j._id) !== String(job._id) && j.category === job.category)
      .slice(0, 3);

    res.json({
      success: true,
      data: {
        job,
        related,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new job post
// @route   POST /api/jobs
// @access  Private (Employer / Admin)
export const createJob = async (req, res, next) => {
  try {
    const {
      title,
      companyName,
      companyLogo,
      location,
      jobType,
      experienceLevel,
      category,
      salaryMin,
      salaryMax,
      salaryRange,
      currency,
      skills,
      description,
      responsibilities,
      requirements,
      benefits,
      remote,
      featured,
      applicationDeadline,
    } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: 'Please provide job title and description',
      });
    }

    const newJob = await JobModel.create({
      title,
      company: {
        name: companyName || req.user.name || 'Hiring Company',
        logo: companyLogo || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
      },
      employer: req.user._id,
      location: location || 'Remote',
      jobType: jobType || 'Full Time',
      experienceLevel: experienceLevel || 'Mid Level',
      category: category || 'Software Development',
      salaryMin: Number(salaryMin) || 80000,
      salaryMax: Number(salaryMax) || 120000,
      salaryRange: salaryRange || `$${salaryMin || 80}K - $${salaryMax || 120}K`,
      currency: currency || '$',
      skills: Array.isArray(skills) ? skills : (skills || '').split(',').map((s) => s.trim()).filter(Boolean),
      description,
      responsibilities: Array.isArray(responsibilities)
        ? responsibilities
        : (responsibilities || '').split('\n').map((s) => s.trim()).filter(Boolean),
      requirements: Array.isArray(requirements)
        ? requirements
        : (requirements || '').split('\n').map((s) => s.trim()).filter(Boolean),
      benefits: Array.isArray(benefits) ? benefits : ['Health Insurance', 'Remote Work Options', 'Learning Budget'],
      remote: Boolean(remote),
      featured: Boolean(featured),
      applicationDeadline: applicationDeadline || '2026-12-31',
      status: 'active',
    });

    res.status(201).json({
      success: true,
      message: 'Job posting created successfully',
      data: newJob,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a job post
// @route   PUT /api/jobs/:id
// @access  Private (Employer / Admin)
export const updateJob = async (req, res, next) => {
  try {
    const job = await JobModel.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    // Check ownership if not admin
    if (req.user.role !== 'admin' && String(job.employer) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to edit this job posting',
      });
    }

    const allowedFields = [
      'title',
      'company',
      'location',
      'jobType',
      'experienceLevel',
      'category',
      'salaryMin',
      'salaryMax',
      'currency',
      'salaryRange',
      'skills',
      'description',
      'responsibilities',
      'requirements',
      'benefits',
      'remote',
      'featured',
      'status',
      'applicationDeadline',
    ];

    const updates = Object.fromEntries(
      allowedFields
        .filter((field) => Object.prototype.hasOwnProperty.call(req.body, field))
        .map((field) => [field, req.body[field]])
    );

    const updatedJob = await JobModel.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true }
    );

    res.json({
      success: true,
      message: 'Job updated successfully',
      data: updatedJob,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete or close a job
// @route   DELETE /api/jobs/:id
// @access  Private (Employer / Admin)
export const deleteJob = async (req, res, next) => {
  try {
    const job = await JobModel.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (req.user.role !== 'admin' && String(job.employer) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to delete this job posting',
      });
    }

    await JobModel.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Job removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get jobs posted by current employer
// @route   GET /api/jobs/my-jobs
// @access  Private (Employer)
export const getMyJobs = async (req, res, next) => {
  try {
    const allJobs = await JobModel.find({});
    // Match employer id or if none assigned match company name
    const myJobs = allJobs.filter(
      (j) => String(j.employer) === String(req.user._id) || j.company.name.toLowerCase().includes(req.user.name.toLowerCase())
    );

    res.json({
      success: true,
      count: myJobs.length,
      data: myJobs,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get job categories summary
// @route   GET /api/jobs/categories
// @access  Public
export const getJobCategories = async (req, res, next) => {
  try {
    const categories = [
      { name: 'Software Development', count: '12K+ Jobs', icon: 'Code' },
      { name: 'Data & Analytics', count: '6K+ Jobs', icon: 'BarChart' },
      { name: 'Design & Creative', count: '4K+ Jobs', icon: 'Palette' },
      { name: 'Product Management', count: '3K+ Jobs', icon: 'Box' },
      { name: 'Marketing', count: '5K+ Jobs', icon: 'Megaphone' },
      { name: 'Human Resources', count: '2K+ Jobs', icon: 'Users' },
      { name: 'Finance', count: '4K+ Jobs', icon: 'Coins' },
      { name: 'Customer Support', count: '3K+ Jobs', icon: 'Headphones' },
    ];

    res.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    next(error);
  }
};
