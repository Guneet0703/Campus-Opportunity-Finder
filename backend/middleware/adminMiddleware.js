/**
 * Restricts access to administrator accounts only.
 * Must be used after the `protect` middleware, which sets req.userRole.
 */
const adminOnly = (req, res, next) => {
  if (req.userRole !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to perform this action.',
    });
  }
  next();
};

module.exports = { adminOnly };
