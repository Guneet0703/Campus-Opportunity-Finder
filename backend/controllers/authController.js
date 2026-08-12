const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Admin = require('../models/Admin');
const generateToken = require('../utils/generateToken');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Register a new student account
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerStudent = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: 'Email already exists.',
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password: hashedPassword,
  });

  res.status(201).json({
    success: true,
    message: 'Registration successful. Please log in.',
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  });
});

/**
 * @desc    Authenticate a student and return a JWT
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginStudent = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');

  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password.',
    });
  }

  const token = generateToken(user._id, 'student');

  res.status(200).json({
    success: true,
    message: 'Login successful.',
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: 'student',
      },
    },
  });
});

/**
 * @desc    Authenticate an administrator and return a JWT
 * @route   POST /api/auth/admin/login
 * @access  Public
 */
const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');

  if (!admin) {
    return res.status(401).json({
      success: false,
      message: 'Invalid administrator credentials.',
    });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: 'Invalid administrator credentials.',
    });
  }

  const token = generateToken(admin._id, 'admin');

  res.status(200).json({
    success: true,
    message: 'Login successful.',
    data: {
      token,
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: 'admin',
      },
    },
  });
});

/**
 * @desc    Get the currently authenticated account (student or admin)
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.userRole,
    },
  });
});

module.exports = { registerStudent, loginStudent, loginAdmin, getMe };
