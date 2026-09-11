import mongoose from 'mongoose';
import { memoryDB } from '../config/db.js';

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      default: 'HireHub System',
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['application', 'status', 'job', 'system'],
      default: 'application',
    },
    read: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

let MongooseNotificationModel;
try {
  MongooseNotificationModel = mongoose.model('Notification', notificationSchema);
} catch {
  MongooseNotificationModel = mongoose.models.Notification;
}

export const NotificationModel = {
  find: (q) => (mongoose.connection.readyState === 1 ? MongooseNotificationModel.find(q) : memoryDB.notifications.find(q)),
  findByIdAndUpdate: (id, update, opt) =>
    mongoose.connection.readyState === 1 ? MongooseNotificationModel.findByIdAndUpdate(id, update, opt) : memoryDB.notifications.findByIdAndUpdate(id, update, opt),
  create: (data) => (mongoose.connection.readyState === 1 ? MongooseNotificationModel.create(data) : memoryDB.notifications.create(data)),
  countDocuments: (q) =>
    mongoose.connection.readyState === 1 ? MongooseNotificationModel.countDocuments(q) : memoryDB.notifications.countDocuments(q),
};

export default NotificationModel;
