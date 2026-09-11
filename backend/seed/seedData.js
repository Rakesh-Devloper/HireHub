import bcrypt from 'bcryptjs';
import UserModel from '../models/User.js';
import JobModel from '../models/Job.js';
import CompanyModel from '../models/Company.js';
import ApplicationModel from '../models/Application.js';
import NotificationModel from '../models/Notification.js';

export const seedDatabase = async () => {
  try {
    const existingUsers = await UserModel.countDocuments();
    if (existingUsers > 0) {
      // Ensure marketing and finance jobs exist
      const existingMarketing = await JobModel.findOne({ category: 'Marketing' });
      if (!existingMarketing) {
        await JobModel.create({
          title: 'Senior Growth Marketing Manager',
          company: {
            name: 'Stripe',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
          },
          location: 'Remote',
          jobType: 'Full Time',
          experienceLevel: 'Senior Level',
          category: 'Marketing',
          salaryMin: 125000,
          salaryMax: 165000,
          salaryRange: '$125K - $165K',
          skills: ['Growth Marketing', 'SEO', 'Analytics', 'Paid Acquisition'],
          featured: true,
          remote: true,
          status: 'active',
          description:
            'Scale acquisition channels and lifecycle strategies for Stripe developer and enterprise payment solutions across global markets.',
          responsibilities: [
            'Lead global inbound marketing campaigns and organic conversion optimization.',
            'Analyze user conversion funnels and run multivariate performance tests.',
          ],
          requirements: [
            '5+ years in high-growth B2B or fintech SaaS marketing.',
            'Proficiency with data-driven analytics and marketing automation.',
          ],
        });
      }
      const existingFinance = await JobModel.findOne({ category: 'Finance' });
      if (!existingFinance) {
        await JobModel.create({
          title: 'Financial Strategy & FinTech Analyst',
          company: {
            name: 'Uber',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png',
          },
          location: 'Bengaluru, India',
          jobType: 'Full Time',
          experienceLevel: 'Mid Level',
          category: 'Finance',
          salaryMin: 90000,
          salaryMax: 130000,
          salaryRange: '₹14L - ₹19L',
          skills: ['Fintech', 'Financial Modeling', 'SQL', 'Forecasting'],
          featured: false,
          remote: false,
          status: 'active',
          description:
            'Partner with product and engineering leaders to optimize transaction unit economics and financial forecasting for mobility products.',
          responsibilities: [
            'Develop quantitative financial models and scenario forecasts.',
            'Evaluate payment processing efficiencies and partner margins.',
          ],
          requirements: [
            '3+ years experience in corporate finance, investment banking, or fintech.',
            'High proficiency in financial modeling and analytical tools.',
          ],
        });
      }
      console.log('Database already populated with initial records.');
      // Ensure key top-tier enterprise jobs are marked as featured for high priority showcases
      await JobModel.updateMany(
        { 'company.name': { $in: ['Amazon', 'Apple', 'Meta', 'Google', 'Adobe', 'Stripe'] } },
        { featured: true }
      );
      return;
    }

    console.log('Seeding initial MERN database data...');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    const hashedAdminPassword = await bcrypt.hash('adminpassword', salt);

    // 1. Create Companies
    const companies = [
      {
        name: 'Google',
        logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
        description: 'Build for everyone. Create for a better tomorrow.',
        tagline: 'Search, Cloud, AI & Hardware',
        website: 'https://careers.google.com',
        industry: 'Technology & AI',
        location: 'Bengaluru, India / Mountain View, CA',
        companySize: '150,000+ employees',
        foundedYear: 1998,
        openJobsCount: 10450,
        bannerImages: [
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
          'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=600&q=80',
        ],
      },
      {
        name: 'Microsoft',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
        description: 'Empower every person and organization on the planet to achieve more.',
        tagline: 'Productivity and Business Processes',
        website: 'https://careers.microsoft.com',
        industry: 'Software & Cloud',
        location: 'Hyderabad, India / Redmond, WA',
        companySize: '220,000+ employees',
        foundedYear: 1975,
        openJobsCount: 8200,
      },
      {
        name: 'Amazon',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        description: "Earth's most customer-centric company and provider of AWS cloud services.",
        tagline: 'Cloud, E-Commerce, Logistics',
        website: 'https://amazon.jobs',
        industry: 'E-Commerce & Cloud',
        location: 'Remote / Seattle, WA',
        companySize: '1,500,000+ employees',
        foundedYear: 1994,
        openJobsCount: 15120,
      },
      {
        name: 'Meta',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
        description: 'Building technologies that help people connect, find communities, and grow businesses.',
        tagline: 'Social Media & VR',
        website: 'https://metacareers.com',
        industry: 'Social Technologies',
        location: 'Bengaluru, India / Menlo Park, CA',
        companySize: '86,000+ employees',
        foundedYear: 2004,
        openJobsCount: 6300,
      },
      {
        name: 'Apple',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        description: 'Innovative hardware, software, and services that empower creativity.',
        tagline: 'Consumer Electronics & Software',
        website: 'https://apple.com/careers',
        industry: 'Consumer Technology',
        location: 'Cupertino, CA',
        companySize: '160,000+ employees',
        foundedYear: 1976,
        openJobsCount: 5100,
      },
      {
        name: 'Netflix',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
        description: 'World-leading entertainment service with stories that inspire and connect.',
        tagline: 'Streaming Entertainment',
        website: 'https://jobs.netflix.com',
        industry: 'Entertainment & Media',
        location: 'Remote / Los Gatos, CA',
        companySize: '13,000+ employees',
        foundedYear: 1997,
        openJobsCount: 3200,
      },
      {
        name: 'Spotify',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
        description: 'Unlocking the potential of human creativity by giving artists opportunity to live off art.',
        tagline: 'Audio Streaming & Podcasts',
        website: 'https://spotifyjobs.com',
        industry: 'Audio & Music',
        location: 'Stockholm, Sweden / New York, NY',
        companySize: '9,500+ employees',
        foundedYear: 2006,
        openJobsCount: 4100,
      },
      {
        name: 'Adobe',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Adobe_Corporate_Horizontal_Red_HEX.svg',
        description: 'Changing the world through digital experiences with Photoshop, Premiere, and Creative Cloud.',
        tagline: 'Creative Software & Cloud',
        website: 'https://adobe.com/careers',
        industry: 'Digital Media & Software',
        location: 'San Jose, CA',
        companySize: '29,000+ employees',
        foundedYear: 1982,
        openJobsCount: 4200,
      },
    ];

    const createdCompanies = [];
    for (const c of companies) {
      createdCompanies.push(await CompanyModel.create(c));
    }

    // 2. Create Users
    const jobSeeker = await UserModel.create({
      name: 'Demo Candidate',
      email: 'candidate@example.com',
      password: hashedPassword,
      role: 'jobseeker',
      profileImage: '',
      phone: '',
      location: 'Hyderabad, India',
      bio: 'Full Stack Engineer specializing in modern MERN architecture, responsive UI craft, and scalable backend services.',
      skills: ['JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'Next.js'],
      resume: '',
      isVerified: true,
      experience: [
        {
          title: 'Frontend Developer',
          company: 'TechFlow Systems',
          period: '2023 - Present',
          description: 'Engineered clean React interfaces and optimized web portal applications.',
        },
      ],
      education: [
        {
          degree: 'B.Tech in Computer Science',
          institution: 'National Institute of Technology',
          year: '2023',
        },
      ],
    });

    const employerUser = await UserModel.create({
      name: 'Sarah Jenkins',
      email: 'recruiter@google.com',
      password: hashedPassword,
      role: 'employer',
      profileImage: '',
      phone: '+1 (555) 234-5678',
      location: 'Mountain View, CA',
      bio: 'Senior Technical Talent Partner at Google leading frontend & backend software engineering hiring.',
    });

    const adminUser = await UserModel.create({
      name: 'HireHub Administrator',
      email: 'admin@hirehub.com',
      password: hashedAdminPassword,
      role: 'admin',
      profileImage: '',
      phone: '+1 (555) 999-0000',
      location: 'San Francisco, CA',
      bio: 'Platform super-admin with global oversight of jobs, users, organizations, and security.',
    });

    // 3. Create Jobs
    const jobs = [
      {
        title: 'Senior Frontend Developer',
        company: {
          name: 'Google',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
        },
        location: 'Bengaluru, India',
        jobType: 'Full Time',
        experienceLevel: 'Senior Level',
        category: 'Software Development',
        salaryMin: 120000,
        salaryMax: 160000,
        salaryRange: '₹12L - ₹18L',
        skills: ['React', 'JavaScript', 'Next.js'],
        featured: true,
        remote: false,
        status: 'active',
        description:
          'Join the Google Web Experience team to build fast, accessible, and delightful interactive applications used by billions.',
        responsibilities: [
          'Architect and develop performant, scalable web client architectures in React.',
          'Collaborate with UX designers, product managers, and backend engineers.',
          'Optimize user-facing applications for maximum speed and scalability.',
        ],
        requirements: [
          '5+ years of experience with modern JavaScript and React.',
          'Deep mastery of state management, accessibility, and component design systems.',
          'Proficiency with automated unit and integration testing.',
        ],
      },
      {
        title: 'Backend Developer',
        company: {
          name: 'Microsoft',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
        },
        location: 'Hyderabad, India',
        jobType: 'Full Time',
        experienceLevel: 'Mid Level',
        category: 'Software Development',
        salaryMin: 110000,
        salaryMax: 150000,
        salaryRange: '₹10L - ₹15L',
        skills: ['Node.js', 'Express', 'MongoDB'],
        featured: false,
        remote: false,
        status: 'active',
        description:
          'Work on Microsoft Cloud Services building resilient REST and GraphQL APIs, distributed caching layers, and high-throughput data pipelines.',
        responsibilities: [
          'Design robust RESTful APIs and microservices using Node.js and Express.',
          'Implement secure database schemas, indexing, and transactional integrity.',
          'Monitor system health, latency, and telemetry using modern logging frameworks.',
        ],
        requirements: [
          '3+ years building backend systems using Node.js, Express, and MongoDB or PostgreSQL.',
          'Strong understanding of asynchronous programming, event loops, and REST patterns.',
          'Hands-on experience with cloud deployment and containerization.',
        ],
      },
      {
        title: 'Full Stack Engineer',
        company: {
          name: 'Amazon',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        },
        location: 'Remote',
        jobType: 'Full Time',
        experienceLevel: 'Senior Level',
        category: 'Software Development',
        salaryMin: 130000,
        salaryMax: 175000,
        salaryRange: '$130K - $175K',
        skills: ['React', 'Node.js', 'AWS'],
        featured: true,
        remote: true,
        status: 'active',
        description:
          'Build end-to-end cloud products that scale to millions of concurrent requests across the Amazon Web Services infrastructure.',
        responsibilities: [
          'Deliver end-to-end full-stack features from UI wireframes to deployed AWS Lambdas.',
          'Lead technical discussions and mentor junior and mid-level software engineers.',
          'Maintain high test coverage and enforce clean code standards.',
        ],
        requirements: [
          '4+ years full stack engineering with React, Node.js, and cloud platforms.',
          'Familiarity with AWS services such as S3, DynamoDB, and ECS.',
          'Demonstrated problem-solving agility and proactive communication skills.',
        ],
      },
      {
        title: 'UI/UX Designer',
        company: {
          name: 'Meta',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
        },
        location: 'Bengaluru, India',
        jobType: 'Full Time',
        experienceLevel: 'Mid Level',
        category: 'Design & Creative',
        salaryMin: 95000,
        salaryMax: 130000,
        salaryRange: '₹9L - ₹14L',
        skills: ['Figma', 'UI/UX', 'Design'],
        featured: true,
        remote: false,
        status: 'active',
        description:
          'Craft delightful and intuitive digital experiences for Meta social ecosystems, creating design systems, wireframes, and prototypes.',
        responsibilities: [
          'Develop comprehensive design systems and interactive prototypes in Figma.',
          'Conduct user research, synthesize usability feedback, and iterate rapidly.',
          'Partner with front-end engineers to ensure pixel-perfect fidelity.',
        ],
        requirements: [
          'Strong portfolio demonstrating mastery of typography, color, spacing, and micro-interactions.',
          '3+ years designing web and mobile applications.',
        ],
      },
      {
        title: 'Data Analyst',
        company: {
          name: 'Netflix',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
        },
        location: 'Remote',
        jobType: 'Full Time',
        experienceLevel: 'Mid Level',
        category: 'Data & Analytics',
        salaryMin: 100000,
        salaryMax: 140000,
        salaryRange: '$100K - $140K',
        skills: ['Python', 'SQL', 'Data Visualization'],
        featured: false,
        remote: true,
        status: 'active',
        description:
          'Drive viewer engagement insights and content performance analytics using big data, SQL querying, and insightful dashboarding.',
        responsibilities: [
          'Query petabyte-scale data lakes with SQL and Python.',
          'Build executive dashboards and automated KPI reporting pipelines.',
          'Present actionable data stories to business and creative stakeholders.',
        ],
        requirements: [
          'Strong SQL proficiency and experience with Python (Pandas, NumPy).',
          'Experience with data visualization tools (Tableau, PowerBI, or D3).',
        ],
      },
      {
        title: 'Product Manager',
        company: {
          name: 'Spotify',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
        },
        location: 'Stockholm, Sweden',
        jobType: 'Full Time',
        experienceLevel: 'Senior Level',
        category: 'Product Management',
        salaryMin: 115000,
        salaryMax: 155000,
        salaryRange: '€95K - €125K',
        skills: ['Strategy', 'Product', 'Analytics'],
        featured: false,
        remote: false,
        status: 'active',
        description:
          'Define the product vision, roadmap, and growth strategies for personalized podcast and music discovery features.',
        responsibilities: [
          'Formulate feature hypotheses, conduct user experiments, and measure conversions.',
          'Lead cross-functional squads of engineers, designers, and data scientists.',
          'Coordinate go-to-market launches with marketing and international partner teams.',
        ],
        requirements: [
          '4+ years in digital consumer product management.',
          'Strong data-driven mindset with experience in A/B testing and experimentation.',
        ],
      },
      {
        title: 'Creative Director',
        company: {
          name: 'Adobe',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Adobe_Corporate_Horizontal_Red_HEX.svg',
        },
        location: 'San Jose, CA',
        jobType: 'Full Time',
        experienceLevel: 'Lead / Director',
        category: 'Design & Creative',
        salaryMin: 160000,
        salaryMax: 210000,
        salaryRange: '$160K - $210K',
        skills: ['Creative Direction', 'Brand Strategy', 'Adobe Suite'],
        featured: true,
        remote: true,
        status: 'active',
        description:
          'Lead global brand campaigns, product launches, and digital creative guidelines for Adobe flagship platforms.',
        responsibilities: [
          'Inspire and direct creative teams across digital, video, and interactive brand touchpoints.',
          'Ensure cohesive aesthetic execution across all worldwide campaigns.',
        ],
        requirements: [
          '8+ years in design and creative leadership.',
          'Proven portfolio of world-class creative campaigns.',
        ],
      },
      {
        title: 'DevOps & Cloud Architect',
        company: {
          name: 'Apple',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        },
        location: 'Cupertino, CA',
        jobType: 'Full Time',
        experienceLevel: 'Senior Level',
        category: 'Software Development',
        salaryMin: 150000,
        salaryMax: 195000,
        salaryRange: '$150K - $195K',
        skills: ['Kubernetes', 'Docker', 'CI/CD', 'Go'],
        featured: true,
        remote: false,
        status: 'active',
        description:
          'Design resilient infrastructure pipelines supporting worldwide iCloud and App Store web operations.',
        responsibilities: [
          'Automate multi-region Kubernetes clusters and deployment workflows.',
          'Ensure 99.999% availability and rigorous security compliance.',
        ],
        requirements: [
          '5+ years architecting enterprise cloud infrastructure.',
          'Deep expertise in Linux, networking, container orchestration, and IaC.',
        ],
      },
      {
        title: 'Senior Growth Marketing Manager',
        company: {
          name: 'Stripe',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
        },
        location: 'Remote',
        jobType: 'Full Time',
        experienceLevel: 'Senior Level',
        category: 'Marketing',
        salaryMin: 125000,
        salaryMax: 165000,
        salaryRange: '$125K - $165K',
        skills: ['Growth Marketing', 'SEO', 'Analytics', 'Paid Acquisition'],
        featured: true,
        remote: true,
        status: 'active',
        description:
          'Scale acquisition channels and lifecycle strategies for Stripe developer and enterprise payment solutions across global markets.',
        responsibilities: [
          'Lead global inbound marketing campaigns and organic conversion optimization.',
          'Analyze user conversion funnels and run multivariate performance tests.',
          'Collaborate with product and sales to amplify new product launches.',
        ],
        requirements: [
          '5+ years in high-growth B2B or fintech SaaS marketing.',
          'Proficiency with data-driven analytics and marketing automation.',
        ],
      },
      {
        title: 'Financial Strategy & FinTech Analyst',
        company: {
          name: 'Uber',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png',
        },
        location: 'Bengaluru, India',
        jobType: 'Full Time',
        experienceLevel: 'Mid Level',
        category: 'Finance',
        salaryMin: 90000,
        salaryMax: 130000,
        salaryRange: '₹14L - ₹19L',
        skills: ['Fintech', 'Financial Modeling', 'SQL', 'Forecasting'],
        featured: false,
        remote: false,
        status: 'active',
        description:
          'Partner with product and engineering leaders to optimize transaction unit economics and financial forecasting for mobility products.',
        responsibilities: [
          'Develop quantitative financial models and scenario forecasts.',
          'Evaluate payment processing efficiencies and partner margins.',
        ],
        requirements: [
          '3+ years experience in corporate finance, investment banking, or fintech.',
          'High proficiency in financial modeling and analytical tools.',
        ],
      },
      {
        title: 'Staff Distributed Systems Engineer',
        company: {
          name: 'Google',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
        },
        location: 'London, UK',
        jobType: 'Full Time',
        experienceLevel: 'Senior Level',
        category: 'Software Development',
        salaryMin: 140000,
        salaryMax: 185000,
        salaryRange: '£110K - £145K',
        skills: ['Go', 'Distributed Systems', 'Kubernetes', 'gRPC'],
        featured: true,
        remote: true,
        status: 'active',
        description:
          'Architect resilient distributed systems and low-latency storage engines in the heart of London for Google Cloud and AI infrastructure.',
        responsibilities: [
          'Design and maintain fault-tolerant distributed infrastructure services.',
          'Drive engineering standards and cross-region consensus architectures.',
        ],
        requirements: [
          '6+ years in distributed systems, network programming, and high-concurrency architectures.',
        ],
      },
      {
        title: 'APAC Regional Fintech Lead',
        company: {
          name: 'Stripe',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg',
        },
        location: 'Singapore',
        jobType: 'Full Time',
        experienceLevel: 'Lead / Director',
        category: 'Software Development',
        salaryMin: 155000,
        salaryMax: 210000,
        salaryRange: 'S$180K - S$240K',
        skills: ['Payments', 'System Architecture', 'API Design', 'Ruby'],
        featured: true,
        remote: false,
        status: 'active',
        description:
          'Lead expansion of real-time payment rails and regulatory gateway integrations across the Asia-Pacific region.',
        responsibilities: [
          'Oversee engineering roadmap for Southeast Asian banking integrations.',
          'Interface directly with tier-1 payment partners and regional central banks.',
        ],
        requirements: [
          '7+ years leading software teams in payment gateways, banking, or fintech.',
        ],
      },
      {
        title: 'Cloud Security & Infrastructure Engineer',
        company: {
          name: 'Spotify',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg',
        },
        location: 'Berlin, Germany',
        jobType: 'Full Time',
        experienceLevel: 'Mid Level',
        category: 'Software Development',
        salaryMin: 105000,
        salaryMax: 145000,
        salaryRange: '€85K - €115K',
        skills: ['Cloud Security', 'Terraform', 'GCP', 'Python'],
        featured: false,
        remote: true,
        status: 'active',
        description:
          'Secure Spotify global audio streaming pipelines and backend services from Berlin creative tech hub.',
        responsibilities: [
          'Implement zero-trust security postures across Kubernetes and GCP workloads.',
          'Audit and secure continuous integration release pipelines.',
        ],
        requirements: [
          '3+ years in cloud security, DevSecOps, and container security.',
        ],
      },
      {
        title: 'Lead Mobile Experience Engineer',
        company: {
          name: 'Apple',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
        },
        location: 'Tokyo, Japan',
        jobType: 'Full Time',
        experienceLevel: 'Senior Level',
        category: 'Software Development',
        salaryMin: 135000,
        salaryMax: 180000,
        salaryRange: '¥18M - ¥24M',
        skills: ['Swift', 'SwiftUI', 'iOS', 'Performance Optimization'],
        featured: true,
        remote: false,
        status: 'active',
        description:
          'Create fluid, native user experiences for millions of Apple service customers throughout Japan and the Asia-Pacific region.',
        responsibilities: [
          'Lead technical implementation of iOS and iPadOS experiences.',
          'Collaborate with human interface designers in Tokyo and Cupertino.',
        ],
        requirements: [
          '5+ years building flagship iOS applications in Swift and SwiftUI.',
        ],
      },
      {
        title: 'Quantitative Platform Engineer',
        company: {
          name: 'Meta',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
        },
        location: 'New York, NY',
        jobType: 'Full Time',
        experienceLevel: 'Senior Level',
        category: 'Data & Analytics',
        salaryMin: 160000,
        salaryMax: 220000,
        salaryRange: '$160K - $220K',
        skills: ['Python', 'SQL', 'C++', 'Data Pipelines'],
        featured: false,
        remote: false,
        status: 'active',
        description:
          'Build ultra-scalable data processing frameworks for real-time ad attribution and auction algorithms in Manhattan.',
        responsibilities: [
          'Design low-latency feature stores and high-throughput ingestion pipelines.',
          'Partner with machine learning research scientists to ship production models.',
        ],
        requirements: [
          '4+ years in quantitative software engineering or big data processing.',
        ],
      },
      {
        title: 'Senior Platform Reliability Engineer',
        company: {
          name: 'Amazon',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
        },
        location: 'Austin, TX',
        jobType: 'Full Time',
        experienceLevel: 'Senior Level',
        category: 'Software Development',
        salaryMin: 140000,
        salaryMax: 180000,
        salaryRange: '$140K - $180K',
        skills: ['AWS', 'SRE', 'Python', 'Docker'],
        featured: false,
        remote: true,
        status: 'active',
        description:
          'Ensure continuous operational resilience and automated disaster recovery for high-velocity AWS services in Austin.',
        responsibilities: [
          'Drive chaos engineering drills and observability improvements.',
          'Automate fleet deployments across global availability zones.',
        ],
        requirements: [
          '5+ years in SRE or cloud platform operations.',
        ],
      },
      {
        title: 'AI Systems & ML Infrastructure Engineer',
        company: {
          name: 'Microsoft',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
        },
        location: 'Seattle, WA',
        jobType: 'Full Time',
        experienceLevel: 'Senior Level',
        category: 'Software Development',
        salaryMin: 155000,
        salaryMax: 205000,
        salaryRange: '$155K - $205K',
        skills: ['PyTorch', 'Distributed Training', 'Azure', 'C++'],
        featured: true,
        remote: false,
        status: 'active',
        description:
          'Scale distributed foundation model training clusters and accelerated compute pipelines for Microsoft Azure AI in Redmond.',
        responsibilities: [
          'Optimize GPU communication topologies (RDMA, InfiniBand, NCCL).',
          'Deploy large-scale transformer training clusters.',
        ],
        requirements: [
          '4+ years in ML infrastructure, high performance computing, or GPU programming.',
        ],
      },
      {
        title: 'Senior MERN Stack Engineer',
        company: {
          name: 'Google',
          logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg',
        },
        location: 'Hyderabad, India',
        jobType: 'Full Time',
        experienceLevel: 'Senior Level',
        category: 'Software Development',
        salaryMin: 130000,
        salaryMax: 175000,
        salaryRange: '₹18L - ₹26L',
        skills: ['MongoDB', 'Express', 'React', 'Node.js', 'TypeScript'],
        featured: true,
        remote: false,
        status: 'active',
        description:
          'Build full-stack enterprise portals with real-time analytics, responsive dashboards, and MongoDB aggregations in Hyderabad HITEC City.',
        responsibilities: [
          'Architect modular React applications and robust Express backends.',
          'Optimize MongoDB schemas, index strategies, and complex pipelines.',
        ],
        requirements: [
          '5+ years hands-on MERN stack engineering experience.',
        ],
      },
    ];

    const createdJobs = [];
    for (const j of jobs) {
      createdJobs.push(await JobModel.create(j));
    }

    // 4. Create Applications for Demo Candidate (Matching the screenshot statistics: 12 Applied, 3 Interviews, 2 Offers, 6 Under Review)
    const statuses = [
      'Accepted',
      'Accepted',
      'Interview',
      'Interview',
      'Interview',
      'Under Review',
      'Under Review',
      'Under Review',
      'Under Review',
      'Under Review',
      'Under Review',
      'Applied',
    ];

    for (let i = 0; i < statuses.length; i++) {
      const targetJob = createdJobs[i % createdJobs.length];
      await ApplicationModel.create({
        job: targetJob._id,
        jobTitle: targetJob.title,
        companyName: targetJob.company.name,
        companyLogo: targetJob.company.logo,
        applicant: jobSeeker._id,
        applicantName: jobSeeker.name,
        applicantEmail: jobSeeker.email,
        phone: jobSeeker.phone,
        resume: jobSeeker.resume,
        coverLetter: 'I am enthusiastic about this opportunity and look forward to contributing my full-stack engineering expertise.',
        status: statuses[i],
      });
    }

    // 5. Notifications
    await NotificationModel.create({
      recipient: jobSeeker._id,
      title: 'Interview Scheduled',
      message: 'Google has scheduled your technical interview for Senior Frontend Developer.',
      type: 'status',
      read: false,
    });
    await NotificationModel.create({
      recipient: jobSeeker._id,
      title: 'Job Offer Received! 🎉',
      message: 'Congratulations! Microsoft has extended an official job offer.',
      type: 'status',
      read: false,
    });

    console.log('✅ Database seeded successfully with jobs, users, companies, and applications.');
  } catch (err) {
    console.error('Error during database seed:', err);
  }
};

export default seedDatabase;
