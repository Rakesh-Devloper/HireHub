import mongoose from 'mongoose';
import { memoryDB } from '../config/db.js';

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    company: {
      name: { type: String, required: true },
      logo: { type: String, default: '' },
      id: { type: String, default: '' },
    },
    employer: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      required: true,
      default: 'Remote',
    },
    jobType: {
      type: String,
      enum: ['Full Time', 'Part Time', 'Contract', 'Internships', 'Remote'],
      default: 'Full Time',
    },
    experienceLevel: {
      type: String,
      enum: ['Entry Level', 'Mid Level', 'Senior Level', 'Lead / Director'],
      default: 'Mid Level',
    },
    category: {
      type: String,
      default: 'Software Development',
    },
    salaryMin: {
      type: Number,
      default: 80000,
    },
    salaryMax: {
      type: Number,
      default: 130000,
    },
    currency: {
      type: String,
      default: '$',
    },
    salaryRange: {
      type: String,
      default: '$80K - $130K',
    },
    skills: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      required: true,
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    requirements: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: ['Health insurance', 'Remote flexibility', 'Annual retreat', 'Learning stipend'],
    },
    remote: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ['active', 'closed', 'draft'],
      default: 'active',
    },
    applicationsCount: {
      type: Number,
      default: 0,
    },
    applicationDeadline: {
      type: String,
      default: '2026-12-31',
    },
  },
  {
    timestamps: true,
  }
);

let MongooseJobModel;
try {
  MongooseJobModel = mongoose.model('Job', jobSchema);
} catch {
  MongooseJobModel = mongoose.models.Job;
}

export const JobModel = {
  find: (q) => (mongoose.connection.readyState === 1 ? MongooseJobModel.find(q) : memoryDB.jobs.find(q)),
  findOne: (q) => (mongoose.connection.readyState === 1 ? MongooseJobModel.findOne(q) : memoryDB.jobs.findOne(q)),
  findById: (id) => (mongoose.connection.readyState === 1 ? MongooseJobModel.findById(id) : memoryDB.jobs.findById(id)),
  create: (data) => (mongoose.connection.readyState === 1 ? MongooseJobModel.create(data) : memoryDB.jobs.create(data)),
  findByIdAndUpdate: (id, update, opt) =>
    mongoose.connection.readyState === 1 ? MongooseJobModel.findByIdAndUpdate(id, update, opt) : memoryDB.jobs.findByIdAndUpdate(id, update, opt),
  findByIdAndDelete: (id) =>
    mongoose.connection.readyState === 1 ? MongooseJobModel.findByIdAndDelete(id) : memoryDB.jobs.findByIdAndDelete(id),
  countDocuments: (q) =>
    mongoose.connection.readyState === 1 ? MongooseJobModel.countDocuments(q) : memoryDB.jobs.countDocuments(q),
  updateMany: (q, u) =>
    mongoose.connection.readyState === 1 ? MongooseJobModel.updateMany(q, u) : memoryDB.jobs.updateMany(q, u),
};

export default JobModel;
