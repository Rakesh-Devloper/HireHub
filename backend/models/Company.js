import mongoose from 'mongoose';
import { memoryDB } from '../config/db.js';

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Company name is required'],
      unique: true,
      trim: true,
    },
    logo: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    tagline: {
      type: String,
      default: '',
    },
    website: {
      type: String,
      default: '',
    },
    industry: {
      type: String,
      default: 'Technology',
    },
    location: {
      type: String,
      default: 'Global',
    },
    companySize: {
      type: String,
      default: '1,000 - 5,000 employees',
    },
    foundedYear: {
      type: Number,
      default: 2010,
    },
    openJobsCount: {
      type: Number,
      default: 12,
    },
    bannerImages: {
      type: [String],
      default: [],
    },
    owner: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

let MongooseCompanyModel;
try {
  MongooseCompanyModel = mongoose.model('Company', companySchema);
} catch {
  MongooseCompanyModel = mongoose.models.Company;
}

export const CompanyModel = {
  find: (q) => (mongoose.connection.readyState === 1 ? MongooseCompanyModel.find(q) : memoryDB.companies.find(q)),
  findOne: (q) => (mongoose.connection.readyState === 1 ? MongooseCompanyModel.findOne(q) : memoryDB.companies.findOne(q)),
  findById: (id) => (mongoose.connection.readyState === 1 ? MongooseCompanyModel.findById(id) : memoryDB.companies.findById(id)),
  create: (data) => (mongoose.connection.readyState === 1 ? MongooseCompanyModel.create(data) : memoryDB.companies.create(data)),
  findByIdAndUpdate: (id, update, opt) =>
    mongoose.connection.readyState === 1 ? MongooseCompanyModel.findByIdAndUpdate(id, update, opt) : memoryDB.companies.findByIdAndUpdate(id, update, opt),
  findByIdAndDelete: (id) =>
    mongoose.connection.readyState === 1 ? MongooseCompanyModel.findByIdAndDelete(id) : memoryDB.companies.findByIdAndDelete(id),
  countDocuments: (q) =>
    mongoose.connection.readyState === 1 ? MongooseCompanyModel.countDocuments(q) : memoryDB.companies.countDocuments(q),
};

export default CompanyModel;
