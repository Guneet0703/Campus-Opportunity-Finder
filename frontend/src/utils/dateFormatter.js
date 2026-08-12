/**
 * Formats an ISO date / Date object into a readable string, e.g. "30 Sep 2026".
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Returns true if the given deadline date is in the past.
 */
export const isPastDeadline = (date) => {
  if (!date) return false;
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() < Date.now();
};

/**
 * Truncates text to a maximum length, appending an ellipsis if needed.
 */
export const truncateText = (text = '', maxLength = 120) => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}...`;
};
