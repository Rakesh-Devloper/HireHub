import bcrypt from 'bcryptjs';
import UserModel from '../models/User.js';
import CompanyModel from '../models/Company.js';
import generateToken from '../utils/generateToken.js';
import generateOTP from '../utils/generateOTP.js';
import sendEmail from '../utils/sendEmail.js';

// In-memory OTP storage for password reset tokens
const resetTokens = new Map();

// @desc    Register a new user (Job Seeker or Employer)
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, phone, location, company } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password',
      });
    }

    if (String(password).length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    if (role === 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Admin accounts cannot be registered publicly',
      });
    }

    const assignedRole = role === 'employer' ? 'employer' : 'jobseeker';
    const companyName = assignedRole === 'employer' && company ? company.trim() : '';

    const existingUser = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists',
      });
    }

    const user = await UserModel.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role: assignedRole,
      company: companyName,
      phone: phone || '',
      location: location || '',
    });

    // If registering as an employer with a company name, ensure company profile exists
    if (assignedRole === 'employer' && companyName) {
      try {
        const existingCompany = await CompanyModel.findOne({ name: companyName });
        if (!existingCompany) {
          await CompanyModel.create({
            name: companyName,
            owner: String(user._id),
            location: location || 'Global',
            description: `${companyName} is hiring world-class talent.`,
            tagline: 'Leading the future of innovation.',
          });
        }
      } catch (err) {
        console.warn('Could not auto-create company record:', err.message);
      }
    }

    const token = generateToken(user._id, user.role);

    // Return safe user object
    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company || companyName,
      profileImage: user.profileImage || '',
      phone: user.phone || '',
      location: user.location || '',
      bio: user.bio || '',
      skills: user.skills || [],
      savedJobs: user.savedJobs || [],
      resume: user.resume || '',
    };

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: safeUser,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    let isMatch = false;
    if (user.password) {
      isMatch = await bcrypt.compare(password, user.password);
      // Fallback in case of direct plain text in demo dev mode
      if (!isMatch && password === user.password) {
        isMatch = true;
      }
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id, user.role);

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      company: user.company || '',
      profileImage: user.profileImage,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
      skills: user.skills || [],
      savedJobs: user.savedJobs || [],
      resume: user.resume || '',
      experience: user.experience || [],
      education: user.education || [],
    };

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: safeUser,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get currently logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found',
      });
    }

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      phone: user.phone,
      location: user.location,
      bio: user.bio,
      skills: user.skills || [],
      savedJobs: user.savedJobs || [],
      resume: user.resume || '',
      experience: user.experience || [],
      education: user.education || [],
    };

    res.json({
      success: true,
      data: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user / clear token
// @route   POST /api/auth/logout
// @access  Public
export const logout = async (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully',
  });
};

// @desc    Request password reset email
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email?.toLowerCase().trim() });

    if (!user) {
      return res.json({
        success: true,
        message: 'If an account exists for that email, a reset code has been sent.',
      });
    }

    const otp = generateOTP(6);
    resetTokens.set(email.toLowerCase().trim(), { otp, expires: Date.now() + 15 * 60 * 1000 });

    await sendEmail({
      email,
      subject: 'HireHub - Password Reset Verification Code',
      message: `Your HireHub verification code is: ${otp}. It will expire in 15 minutes.`,
    });

    const response = {
      success: true,
      message: 'If an account exists for that email, a reset code has been sent.',
    };

    if (process.env.NODE_ENV !== 'production') {
      response.data = { otpPreview: otp };
    }

    res.json(response);
  } catch (error) {
    next(error);
  }
};

// @desc    Reset password with token/otp
// @route   POST /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { email, newPassword } = req.body;

    if (!email || !newPassword || String(newPassword).length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Email and a new password of at least 6 characters are required',
      });
    }

    const record = resetTokens.get(email.toLowerCase().trim());
    if (!record || record.otp !== token || record.expires < Date.now()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token',
      });
    }

    const user = await UserModel.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await UserModel.findByIdAndUpdate(user._id, { password: hashedPassword });
    resetTokens.delete(email.toLowerCase().trim());

    res.json({
      success: true,
      message: 'Password has been reset successfully. You can now login.',
    });
  } catch (error) {
    next(error);
  }
};
