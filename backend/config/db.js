import mongoose from 'mongoose';

// In-memory fallback database for environments without an active MongoDB daemon
class MemoryCollection {
  constructor(name) {
    this.name = name;
    this.documents = [];
  }

  _getProp(doc, key) {
    if (!key.includes('.')) return doc[key];
    return key.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), doc);
  }

  _matchesQuery(doc, query) {
    if (!query || Object.keys(query).length === 0) return true;
    for (const key of Object.keys(query)) {
      const val = query[key];
      if (key === '$or' && Array.isArray(val)) {
        const anyMatch = val.some(subQ => this._matchesQuery(doc, subQ));
        if (!anyMatch) return false;
        continue;
      }
      const targetVal = this._getProp(doc, key);
      if (val && typeof val === 'object' && val.$regex) {
        const regex = new RegExp(val.$regex, val.$options || 'i');
        if (!regex.test(targetVal || '')) return false;
        continue;
      }
      if (val && typeof val === 'object' && val.$in) {
        const inArr = val.$in;
        if (Array.isArray(targetVal)) {
          if (!targetVal.some(t => inArr.includes(t))) return false;
        } else if (!inArr.includes(targetVal)) {
          return false;
        }
        continue;
      }
      if (val && typeof val === 'object' && (val.$gte !== undefined || val.$lte !== undefined)) {
        const num = Number(targetVal);
        if (val.$gte !== undefined && num < val.$gte) return false;
        if (val.$lte !== undefined && num > val.$lte) return false;
        continue;
      }
      if (String(targetVal) !== String(val)) {
        return false;
      }
    }
    return true;
  }

  async find(query = {}) {
    let docs = this.documents.filter(d => this._matchesQuery(d, query));
    return {
      sort: (sortObj = {}) => ({
        skip: (s = 0) => ({
          limit: (l = 100) => {
            const keys = Object.keys(sortObj);
            if (keys.length > 0) {
              const sortKey = keys[0];
              const sortDir = sortObj[sortKey] === -1 ? -1 : 1;
              docs.sort((a, b) => {
                const aVal = a[sortKey] || '';
                const bVal = b[sortKey] || '';
                return aVal > bVal ? sortDir : aVal < bVal ? -sortDir : 0;
              });
            }
            return docs.slice(s, s + l);
          }
        }),
        limit: (l = 100) => docs.slice(0, l)
      }),
      populate: () => docs,
      then: (resolve) => resolve(docs)
    };
  }

  async findOne(query = {}) {
    const doc = this.documents.find(d => this._matchesQuery(d, query));
    return doc ? { ...doc, save: async () => doc } : null;
  }

  async findById(id) {
    const doc = this.documents.find(d => String(d._id) === String(id));
    return doc ? { ...doc, save: async () => doc } : null;
  }

  async create(data) {
    const newDoc = {
      _id: 'doc_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };
    newDoc.save = async function() { return this; };
    this.documents.unshift(newDoc);
    return newDoc;
  }

  async insertMany(arr) {
    const created = [];
    for (const item of arr) {
      created.push(await this.create(item));
    }
    return created;
  }

  async findByIdAndUpdate(id, update, options = {}) {
    const idx = this.documents.findIndex(d => String(d._id) === String(id));
    if (idx === -1) return null;
    const oldDoc = this.documents[idx];
    const updateData = update.$set ? { ...update.$set } : { ...update };
    delete updateData.$set;
    const updated = {
      ...oldDoc,
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    this.documents[idx] = updated;
    return updated;
  }

  async findByIdAndDelete(id) {
    const idx = this.documents.findIndex(d => String(d._id) === String(id));
    if (idx === -1) return null;
    const removed = this.documents.splice(idx, 1)[0];
    return removed;
  }

  async updateMany(query, update) {
    const updateData = update.$set ? { ...update.$set } : { ...update };
    delete updateData.$set;
    let count = 0;
    for (let i = 0; i < this.documents.length; i++) {
      if (this._matchesQuery(this.documents[i], query)) {
        this.documents[i] = {
          ...this.documents[i],
          ...updateData,
          updatedAt: new Date().toISOString(),
        };
        count++;
      }
    }
    return { acknowledged: true, modifiedCount: count };
  }

  async deleteMany(query = {}) {
    const before = this.documents.length;
    this.documents = this.documents.filter((doc) => !this._matchesQuery(doc, query));
    return {
      acknowledged: true,
      deletedCount: before - this.documents.length,
    };
  }

  async countDocuments(query = {}) {
    return this.documents.filter(d => this._matchesQuery(d, query)).length;
  }
}

export const memoryDB = {
  users: new MemoryCollection('users'),
  jobs: new MemoryCollection('jobs'),
  applications: new MemoryCollection('applications'),
  companies: new MemoryCollection('companies'),
  notifications: new MemoryCollection('notifications'),
};

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri === 'your_mongodb_connection_string') {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('MONGODB_URI must be configured in production.');
    }
    console.warn('⚠️ MongoDB URI not configured. Using in-memory storage for local development only.');
    return true;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`MongoDB connection failed: ${error.message}`);
    }
    console.warn(`⚠️ MongoDB connection failed (${error.message}). Falling back to in-memory storage for local development.`);
    return false;
  }
};

export default connectDB;
