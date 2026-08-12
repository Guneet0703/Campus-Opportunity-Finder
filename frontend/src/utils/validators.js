/**
 * Simple client-side validation helpers used by forms across the app.
 * The backend performs the same checks again as the source of truth.
 */

export const isValidEmail = (email = '') =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isValidUrl = (value = '') => {
  try {
    const url = new URL(value.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export const isEmpty = (value) =>
  value === undefined || value === null || String(value).trim() === '';

/**
 * Validates the Student Registration form.
 * Returns an object mapping field name -> error message (empty object = valid).
 */
export const validateRegisterForm = ({ name, email, password, confirmPassword }) => {
  const errors = {};
  if (isEmpty(name)) errors.name = 'Name is required.';
  if (isEmpty(email)) errors.email = 'Email is required.';
  else if (!isValidEmail(email)) errors.email = 'Please enter a valid email address.';
  if (isEmpty(password)) errors.password = 'Password is required.';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters long.';
  if (isEmpty(confirmPassword)) errors.confirmPassword = 'Please confirm your password.';
  else if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
  return errors;
};

/**
 * Validates the Login form (student or admin).
 */
export const validateLoginForm = ({ email, password }) => {
  const errors = {};
  if (isEmpty(email)) errors.email = 'Email is required.';
  if (isEmpty(password)) errors.password = 'Password is required.';
  return errors;
};

/**
 * Validates the Add/Edit Opportunity form.
 */
export const validateOpportunityForm = ({
  title,
  category,
  organizer,
  location,
  eligibility,
  deadline,
  description,
  registrationLink,
}) => {
  const errors = {};
  if (isEmpty(title)) errors.title = 'Title is required.';
  if (isEmpty(category)) errors.category = 'Category is required.';
  if (isEmpty(organizer)) errors.organizer = 'Organizer is required.';
  if (isEmpty(location)) errors.location = 'Location is required.';
  if (isEmpty(eligibility)) errors.eligibility = 'Eligibility is required.';
  if (isEmpty(deadline)) errors.deadline = 'Deadline is required.';
  if (isEmpty(description)) errors.description = 'Description is required.';
  if (isEmpty(registrationLink)) errors.registrationLink = 'Registration link is required.';
  else if (!isValidUrl(registrationLink))
    errors.registrationLink = 'Please enter a valid URL (include http:// or https://).';
  return errors;
};
