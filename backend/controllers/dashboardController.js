import UserModel from '../models/User.js';
import JobModel from '../models/Job.js';
import ApplicationModel from '../models/Application.js';
import CompanyModel from '../models/Company.js';

// @desc    Get job seeker dashboard data
// @route   GET /api/dashboard/jobseeker
// @access  Private (Job Seeker / Admin)
export const getJobSeekerDashboard = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await UserModel.findById(userId);

    // Get user applications
    const allApps = await ApplicationModel.find({});
    const myApps = allApps.filter((a) => String(a.applicant) === String(userId));

    const totalApplications = myApps.length;
    const interviewsCount = myApps.filter((a) => a.status === 'Interview').length;
    const offersCount = myApps.filter((a) => a.status === 'Offer' || a.status === 'Accepted' || a.status === 'Hired').length;
    const underReviewCount = myApps.filter((a) => a.status === 'Under Review').length;
    const appliedCount = totalApplications;

    // Calculate dynamic profile strength
    let strength = 20; // base
    const checklist = {
      profileCompleted: Boolean(user?.name && user?.bio),
      resumeUploaded: Boolean(user?.resume),
      skillsAdded: Boolean(user?.skills && user?.skills.length > 0),
      readyToApply: true,
    };
    if (checklist.profileCompleted) strength += 25;
    if (checklist.resumeUploaded) strength += 25;
    if (checklist.skillsAdded) strength += 15;

    const profileStrength = Math.min(85, strength);

    // Application status breakdown for Donut Chart (matching reference UI)
    const applicationStatusChart = [
      { name: 'Applied', value: appliedCount, color: '#6D4AFF' },
      { name: 'Under Review', value: underReviewCount, color: '#3B82F6' },
      { name: 'Interview', value: interviewsCount, color: '#8B5CF6' },
      { name: 'Offer', value: offersCount, color: '#10B981' },
    ];

    // Top skills in demand
    const topSkillsInDemand = [
      { name: 'JavaScript', percentage: 85, color: '#3B82F6' },
      { name: 'Python', percentage: 72, color: '#3B82F6' },
      { name: 'React.js', percentage: 68, color: '#6D4AFF' },
      { name: 'Node.js', percentage: 60, color: '#6D4AFF' },
      { name: 'UI/UX', percentage: 52, color: '#8B5CF6' },
    ];

    // Monthly chart
    const monthlyApplications = [
      { month: 'Jan', count: 2 },
      { month: 'Feb', count: 4 },
      { month: 'Mar', count: 6 },
      { month: 'Apr', count: 8 },
      { month: 'May', count: 12 },
    ];

    // Featured company (Google as in screenshot)
    const featuredCompany = {
      name: 'Google',
      logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
      openJobsCount: '10K+ Jobs',
      tagline: 'Build for everyone. Create for a better tomorrow.',
      images: [
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80',
      ],
    };

    res.json({
      success: true,
      data: {
        user: {
          name: user?.name || 'User',
          email: user?.email,
          role: 'Job Seeker',
          profileImage: user?.profileImage,
        },
        stats: {
          applied: totalApplications,
          totalApplications,
          underReview: underReviewCount,
          interviews: interviewsCount,
          interviewScheduled: interviewsCount,
          offers: offersCount,
        },
        profileStrength: {
          percentage: profileStrength,
          label: profileStrength >= 80 ? 'Excellent!' : 'Good Progress',
          checklist,
        },
        applicationStatusChart,
        applicationBreakdown: {
          total: totalApplications,
          chartData: applicationStatusChart,
        },
        totalDonutApplications: totalApplications,
        topSkillsInDemand,
        monthlyApplications,
        featuredCompany,
        recentApplications: myApps.slice(0, 5),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get employer dashboard data
// @route   GET /api/dashboard/employer
// @access  Private (Employer / Admin)
export const getEmployerDashboard = async (req, res, next) => {
  try {
    const allJobs = await JobModel.find({});
    const myJobs = allJobs.filter(
      (j) => String(j.employer) === String(req.user._id) || req.user.role === 'admin'
    );

    const allApps = await ApplicationModel.find({});
    const jobIds = myJobs.map((j) => String(j._id));
    const applicants = allApps.filter((a) => jobIds.includes(String(a.job)));

    const activeJobs = myJobs.filter((j) => j.status === 'active').length;
    const totalApplicants = applicants.length;
    const interviews = applicants.filter((a) => a.status === 'Interview').length;
    const hired = applicants.filter((a) => a.status === 'Hired' || a.status === 'Accepted').length;
    const shortlistedCandidates = applicants.filter((a) => a.status === 'Shortlisted').length;

    res.json({
      success: true,
      data: {
        stats: {
          totalJobsPosted: myJobs.length,
          activeJobs,
          totalApplicants,
          interviews,
          hiredCandidates: hired,
          shortlistedCandidates,
        },
        recentJobs: myJobs.slice(0, 5),
        recentApplicants: applicants.slice(0, 8),
        monthlyHiring: [
          { month: 'Jan', applicants: 12, hires: 1 },
          { month: 'Feb', applicants: 18, hires: 2 },
          { month: 'Mar', applicants: 24, hires: 3 },
          { month: 'Apr', applicants: 30, hires: 4 },
        ],
      },
    });
  } catch (error) {
    next(error);
  }
};
