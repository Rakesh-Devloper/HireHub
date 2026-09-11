import ApplicationModel from '../models/Application.js';
import JobModel from '../models/Job.js';
import NotificationModel from '../models/Notification.js';

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private (Job Seeker)
export const applyForJob = async (req, res, next) => {
  try {
    const { resume, coverLetter, phone, portfolioUrl } = req.body;
    const jobId = req.body.jobId || req.body.job;

    if (!jobId) {
      return res.status(400).json({ success: false, message: 'Job ID is required' });
    }

    if (!phone && !req.user?.phone) {
      return res.status(400).json({ success: false, message: 'Contact phone number is required' });
    }

    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Target job not found' });
    }

    // Check duplicate application
    const existing = await ApplicationModel.findOne({
      job: jobId,
      applicant: req.user._id,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already submitted an application for this position',
      });
    }

    const application = await ApplicationModel.create({
      job: jobId,
      jobTitle: job.title,
      companyName: job.company?.name || 'Company',
      companyLogo: job.company?.logo || '',
      applicant: req.user._id,
      applicantName: req.user.name,
      applicantEmail: req.user.email,
      resume: resume || req.user.resume || '',
      coverLetter: coverLetter || '',
      phone: phone || req.user.phone || '',
      portfolioUrl: portfolioUrl || '',
      status: 'Applied',
    });

    // Increment job applications count
    await JobModel.findByIdAndUpdate(jobId, {
      $set: { applicationsCount: (job.applicationsCount || 0) + 1 },
    });

    // Notify user
    await NotificationModel.create({
      recipient: req.user._id,
      title: 'Application Submitted Successfully',
      message: `Your application for ${job.title} at ${job.company.name} has been received.`,
      type: 'application',
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully!',
      data: application,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's submitted applications
// @route   GET /api/applications/my-applications
// @access  Private (Job Seeker)
export const getMyApplications = async (req, res, next) => {
  try {
    const allApps = await ApplicationModel.find({});
    const myApps = allApps.filter((a) => String(a.applicant) === String(req.user._id));

    res.json({
      success: true,
      count: myApps.length,
      data: myApps,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get applicants for a specific job
// @route   GET /api/applications/job/:jobId
// @access  Private (Employer / Admin)
export const getApplicationsForJob = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    const job = await JobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' });
    }

    if (req.user.role !== 'admin' && String(job.employer) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view applicants for this job',
      });
    }

    const allApps = await ApplicationModel.find({});
    const jobApps = allApps.filter((a) => String(a.job) === String(jobId));

    res.json({
      success: true,
      count: jobApps.length,
      data: jobApps,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update status of an application
// @route   PUT /api/applications/:id/status
// @access  Private (Employer / Admin)
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = [
      'Applied',
      'Under Review',
      'Shortlisted',
      'Interview',
      'Rejected',
      'Accepted',
      'Offer',
      'Hired',
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Choose from: ${validStatuses.join(', ')}`,
      });
    }

    const application = await ApplicationModel.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    const job = await JobModel.findById(application.job);
    if (!job) {
      return res.status(404).json({ success: false, message: 'Related job not found' });
    }

    if (req.user.role !== 'admin' && String(job.employer) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to update this application',
      });
    }

    const updated = await ApplicationModel.findByIdAndUpdate(
      req.params.id,
      { $set: { status } },
      { new: true }
    );

    // Notify applicant
    await NotificationModel.create({
      recipient: application.applicant,
      title: `Application Status Updated: ${status}`,
      message: `Your application for ${application.jobTitle} at ${application.companyName} is now "${status}".`,
      type: 'status',
    });

    res.json({
      success: true,
      message: `Application status updated to ${status}`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
