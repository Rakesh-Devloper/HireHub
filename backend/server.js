import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import seedDatabase from './seed/seedData.js';

import upload from './middleware/uploadMiddleware.js';
import protect from './middleware/authMiddleware.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('trust proxy', 1);

/*
|--------------------------------------------------------------------------
| CORS
|--------------------------------------------------------------------------
*/

const allowedOrigins = (
  process.env.CLIENT_URL ||
  'http://localhost:3000,http://localhost:5173,https://hirehub-7wgm.onrender.com'
)
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests without an Origin header.
      if (!origin) {
        return callback(null, true);
      }

      // Allow configured origins.
      if (
        allowedOrigins.includes('*') ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }

      console.warn(`⚠️ CORS blocked origin: ${origin}`);

      // Don't turn CORS failures into HTTP 500 errors.
      return callback(null, false);
    },
    credentials: true,
  })
);

/*
|--------------------------------------------------------------------------
| Body Parsing
|--------------------------------------------------------------------------
*/

app.use(express.json({ limit: '2mb' }));

app.use(
  express.urlencoded({
    extended: true,
    limit: '2mb',
  })
);

/*
|--------------------------------------------------------------------------
| Uploads
|--------------------------------------------------------------------------
*/

const uploadsPath = path.join(__dirname, 'uploads');

fs.mkdirSync(uploadsPath, {
  recursive: true,
});

app.use(
  '/uploads',
  express.static(uploadsPath, {
    maxAge: '1d',
  })
);

/*
|--------------------------------------------------------------------------
| File Upload API
|--------------------------------------------------------------------------
*/

app.post(
  '/api/upload',
  protect,
  upload.single('file'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded',
      });
    }

    const publicUrl = (
      process.env.API_PUBLIC_URL || ''
    ).replace(/\/$/, '');

    return res.status(201).json({
      success: true,
      message: 'File uploaded successfully',
      data: {
        url: `${publicUrl}/uploads/${req.file.filename}`,
        fileName: req.file.originalname,
        size: req.file.size,
      },
    });
  }
);

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

app.use('/api/auth', authRoutes);

app.use('/api/users', userRoutes);

app.use('/api/jobs', jobRoutes);

app.use('/api/applications', applicationRoutes);

app.use('/api/companies', companyRoutes);

app.use('/api/dashboard', dashboardRoutes);

app.use('/api/admin', adminRoutes);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'HireHub API is running',
    timestamp: new Date().toISOString(),
  });
});

/*
|--------------------------------------------------------------------------
| Database Initialization
|--------------------------------------------------------------------------
*/

let initialized = false;

export const initializeBackend = async () => {
  if (initialized) {
    return;
  }

  await connectDB();

  const shouldSeed =
    process.env.SEED_DATABASE === 'true' ||
    (
      process.env.NODE_ENV !== 'production' &&
      process.env.SEED_DATABASE !== 'false'
    );

  if (shouldSeed) {
    await seedDatabase();
  }

  initialized = true;

  console.log('✅ HireHub backend initialized');
};

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export { app };

export default app;