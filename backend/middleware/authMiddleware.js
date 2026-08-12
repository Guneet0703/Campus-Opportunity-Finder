const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Admin = require('../models/Admin');

/**
 * Verifies the JWT sent in the Authorization header (Bearer token).
 * Attaches the authenticated user (student or admin) and their role to
 * req.user. Used to protect any route that simply requires a logged-in
 * account, regardless of role.
 */
const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Please log in to continue.',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let account;
    if (decoded.role === 'admin') {
      account = await Admin.findById(decoded.id);
    } else {
      account = await User.findById(decoded.id);
    }

    if (!account) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Account no longer exists.',
      });
    }

    req.user = account;
    req.userRole = decoded.role;
    next();
  } catch (error) {
  console.log("AUTH ERROR:", error);

  return res.status(401).json({
    success: false,
    message: error.message,
  });
}
};

/**
 * Restricts access to student accounts only.
 * Must be used after `protect`.
 */
const studentOnly = (req, res, next) => {
  if (req.userRole !== 'student') {
    return res.status(403).json({
      success: false,
      message: 'You are not authorized to perform this action.',
    });
  }
  next();
};

module.exports = { protect, studentOnly };
