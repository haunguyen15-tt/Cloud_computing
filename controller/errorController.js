const AppError = require('../utils/appError');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.name === 'JsonWebTokenError') {
    err = new AppError(
      'Invalid token. Please log in again!',
      401
    );
  }

  if (err.name === 'TokenExpiredError') {
    err = new AppError(
      'Your token has expired! Please log in again.',
      401
    );
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
  });
};
