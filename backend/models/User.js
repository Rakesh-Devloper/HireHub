import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { memoryDB } from '../config/db.js';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: 6,
    },
    role: {
      type: String,
      enum: ['jobseeker', 'employer', 'admin'],
      default: 'jobseeker',
    },
    company: {
      type: String,
      default: '',
    },
    profileImage: {
      type: String,
      default: '',
    },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    bio: { type: String, default: '' },
    skills: { type: [String], default: [] },
    experience: { type: Array, default: [] },
    education: { type: Array, default: [] },
    resume: {
      type: String,
      default: '',
    },
    savedJobs: {
      type: [String],
      default: [],
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  if (this.password && (this.password.startsWith('$2a$') || this.password.startsWith('$2b$'))) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

let MongooseUserModel;
try {
  MongooseUserModel = mongoose.model('User', userSchema);
} catch {
  MongooseUserModel = mongoose.models.User;
}

// Unified model wrapper
export const UserModel = {
  find: (q) => (mongoose.connection.readyState === 1 ? MongooseUserModel.find(q) : memoryDB.users.find(q)),
  findOne: (q) => (mongoose.connection.readyState === 1 ? MongooseUserModel.findOne(q) : memoryDB.users.findOne(q)),
  findById: (id) => (mongoose.connection.readyState === 1 ? MongooseUserModel.findById(id) : memoryDB.users.findById(id)),
  create: async (data) => {
    if (mongoose.connection.readyState === 1) return MongooseUserModel.create(data);
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = data.password ? await bcrypt.hash(data.password, salt) : '';
    return memoryDB.users.create({
      ...data,
      password: hashedPassword,
      savedJobs: data.savedJobs || [],
      skills: data.skills || [],
      profileImage: data.profileImage || '',
    });
  },
  findByIdAndUpdate: (id, update, opt) =>
    mongoose.connection.readyState === 1 ? MongooseUserModel.findByIdAndUpdate(id, update, opt) : memoryDB.users.findByIdAndUpdate(id, update, opt),
  findByIdAndDelete: (id) =>
    mongoose.connection.readyState === 1 ? MongooseUserModel.findByIdAndDelete(id) : memoryDB.users.findByIdAndDelete(id),
  deleteMany: (q) => (mongoose.connection.readyState === 1 ? MongooseUserModel.deleteMany(q) : memoryDB.users.deleteMany(q)),
  countDocuments: (q) =>
    mongoose.connection.readyState === 1 ? MongooseUserModel.countDocuments(q) : memoryDB.users.countDocuments(q),
};

export default UserModel;
