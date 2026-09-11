import mongoose from 'mongoose';
import { memoryDB } from '../config/db.js';

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'Job',
      required: true,
    },
    jobTitle: {
      type: String,
      default: '',
    },
    companyName: {
      type: String,
      default: '',
    },
    companyLogo: {
      type: String,
      default: '',
    },
    applicant: {
      type: mongoose.Schema.Types.Mixed,
      ref: 'User',
      required: true,
    },
    applicantName: {
      type: String,
      default: '',
    },
    applicantEmail: {
      type: String,
      default: '',
    },
    resume: {
      type: String,
      required: [true, 'Please provide resume link or file'],
    },
    coverLetter: {
      type: String,
      default: '',
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    portfolioUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Applied', 'Under Review', 'Shortlisted', 'Interview', 'Rejected', 'Accepted', 'Offer', 'Hired'],
      default: 'Applied',
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

let MongooseApplicationModel;
try {
  MongooseApplicationModel = mongoose.model('Application', applicationSchema);
} catch {
  MongooseApplicationModel = mongoose.models.Application;
}

export const ApplicationModel = {
  find: (q) => (mongoose.connection.readyState === 1 ? MongooseApplicationModel.find(q) : memoryDB.applications.find(q)),
  findOne: (q) => (mongoose.connection.readyState === 1 ? MongooseApplicationModel.findOne(q) : memoryDB.applications.findOne(q)),
  findById: (id) => (mongoose.connection.readyState === 1 ? MongooseApplicationModel.findById(id) : memoryDB.applications.findById(id)),
  create: (data) => (mongoose.connection.readyState === 1 ? MongooseApplicationModel.create(data) : memoryDB.applications.create(data)),
  findByIdAndUpdate: (id, update, opt) =>
    mongoose.connection.readyState === 1 ? MongooseApplicationModel.findByIdAndUpdate(id, update, opt) : memoryDB.applications.findByIdAndUpdate(id, update, opt),
  findByIdAndDelete: (id) =>
    mongoose.connection.readyState === 1 ? MongooseApplicationModel.findByIdAndDelete(id) : memoryDB.applications.findByIdAndDelete(id),
  countDocuments: (q) =>
    mongoose.connection.readyState === 1 ? MongooseApplicationModel.countDocuments(q) : memoryDB.applications.countDocuments(q),
};

export default ApplicationModel;
