const validator = require('validator');

const isEmpty = (value) =>
  value === undefined || value === null || String(value).trim() === '';

/**
 * Validates student registration payload.
 */
const validateRegister = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const errors = {};

  if (isEmpty(name)) errors.name = 'Name is required.';
  if (isEmpty(email)) errors.email = 'Email is required.';
  else if (!validator.isEmail(email)) errors.email = 'Please provide a valid email address.';
  if (isEmpty(password)) errors.password = 'Password is required.';
  else if (String(password).length < 6)
    errors.password = 'Password must be at least 6 characters long.';
  if (isEmpty(confirmPassword)) errors.confirmPassword = 'Please confirm your password.';
  else if (password !== confirmPassword)
    errors.confirmPassword = 'Passwords do not match.';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields.',
      errors,
    });
  }
  next();
};

/**
 * Validates student/admin login payload.
 */
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = {};

  if (isEmpty(email)) errors.email = 'Email is required.';
  if (isEmpty(password)) errors.password = 'Password is required.';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields.',
      errors,
    });
  }
  next();
};

/**
 * Validates Add/Edit Opportunity payload.
 */
const validateOpportunity = (req, res, next) => {
  const {
    title,
    category,
    organizer,
    location,
    eligibility,
    deadline,
    description,
    registrationLink,
  } = req.body;

  const errors = {};
  const categories = [
    'Internship',
    'Hackathon',
    'Workshop',
    'Coding Contest',
    'Scholarship',
    'Others',
  ];

  if (isEmpty(title)) errors.title = 'Title is required.';
  if (isEmpty(category)) errors.category = 'Category is required.';
  else if (!categories.includes(category)) errors.category = 'Invalid category selected.';
  if (isEmpty(organizer)) errors.organizer = 'Organizer is required.';
  if (isEmpty(location)) errors.location = 'Location is required.';
  if (isEmpty(eligibility)) errors.eligibility = 'Eligibility is required.';
  if (isEmpty(deadline)) errors.deadline = 'Deadline is required.';
  else if (isNaN(new Date(deadline).getTime())) errors.deadline = 'Deadline must be a valid date.';
  if (isEmpty(description)) errors.description = 'Description is required.';
  if (isEmpty(registrationLink)) errors.registrationLink = 'Registration link is required.';
  else if (!validator.isURL(registrationLink, { require_protocol: true }))
    errors.registrationLink = 'Registration link must be a valid URL (include http:// or https://).';

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields.',
      errors,
    });
  }
  next();
};

module.exports = { validateRegister, validateLogin, validateOpportunity };
