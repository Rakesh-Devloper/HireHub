export const notFound = (req, res, next) => {
  // API requests should receive a JSON 404. Non-API requests are left
  // for the frontend (Vite in development / SPA fallback in production).
  if (!req.path.startsWith('/api/')) {
    return next();
  }

  const error = new Error(`Resource Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || [err.message],
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
