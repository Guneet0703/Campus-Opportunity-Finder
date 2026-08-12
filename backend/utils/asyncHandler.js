/**
 * Wraps an async route handler and forwards any thrown error to Express's
 * error-handling middleware instead of requiring try/catch in every
 * controller function.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
