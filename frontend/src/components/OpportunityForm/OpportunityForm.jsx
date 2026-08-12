import { useState, useEffect } from 'react';
import { CATEGORIES } from '../../data/categories';
import { validateOpportunityForm } from '../../utils/validators';
import './OpportunityForm.css';

const emptyForm = {
  title: '',
  category: '',
  organizer: '',
  location: '',
  eligibility: '',
  deadline: '',
  description: '',
  registrationLink: '',
};

/**
 * Reusable form used by both the Add Opportunity and Edit Opportunity pages.
 * When `initialValues` is provided, the form is pre-filled for editing.
 */
const OpportunityForm = ({
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'Save Opportunity',
  isSubmitting = false,
  serverError = '',
}) => {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title || '',
        category: initialValues.category || '',
        organizer: initialValues.organizer || '',
        location: initialValues.location || '',
        eligibility: initialValues.eligibility || '',
        deadline: initialValues.deadline
          ? new Date(initialValues.deadline).toISOString().split('T')[0]
          : '',
        description: initialValues.description || '',
        registrationLink: initialValues.registrationLink || '',
      });
    }
  }, [initialValues]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateOpportunityForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    onSubmit(formData);
  };

  return (
    <form className="opportunity-form" onSubmit={handleSubmit} noValidate>
      {serverError && <div className="alert alert-error">{serverError}</div>}

      <div className="form-group">
        <label className="form-label" htmlFor="title">
          Opportunity Title
        </label>
        <input
          id="title"
          type="text"
          className={`form-input ${errors.title ? 'has-error' : ''}`}
          placeholder="e.g. Google Software Engineering Internship"
          value={formData.title}
          onChange={handleChange('title')}
        />
        {errors.title && <p className="form-error">{errors.title}</p>}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            className={`form-select ${errors.category ? 'has-error' : ''}`}
            value={formData.category}
            onChange={handleChange('category')}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="form-error">{errors.category}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="organizer">
            Organizer
          </label>
          <input
            id="organizer"
            type="text"
            className={`form-input ${errors.organizer ? 'has-error' : ''}`}
            placeholder="e.g. Google"
            value={formData.organizer}
            onChange={handleChange('organizer')}
          />
          {errors.organizer && <p className="form-error">{errors.organizer}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label className="form-label" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            type="text"
            className={`form-input ${errors.location ? 'has-error' : ''}`}
            placeholder="e.g. Remote / Bengaluru, India"
            value={formData.location}
            onChange={handleChange('location')}
          />
          {errors.location && <p className="form-error">{errors.location}</p>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="deadline">
            Application Deadline
          </label>
          <input
            id="deadline"
            type="date"
            className={`form-input ${errors.deadline ? 'has-error' : ''}`}
            value={formData.deadline}
            onChange={handleChange('deadline')}
          />
          {errors.deadline && <p className="form-error">{errors.deadline}</p>}
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="eligibility">
          Eligibility
        </label>
        <input
          id="eligibility"
          type="text"
          className={`form-input ${errors.eligibility ? 'has-error' : ''}`}
          placeholder="e.g. B.Tech 2nd-4th Year Students"
          value={formData.eligibility}
          onChange={handleChange('eligibility')}
        />
        {errors.eligibility && <p className="form-error">{errors.eligibility}</p>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          className={`form-textarea ${errors.description ? 'has-error' : ''}`}
          placeholder="Provide complete details about responsibilities, requirements, benefits, and the application process."
          value={formData.description}
          onChange={handleChange('description')}
        />
        {errors.description && <p className="form-error">{errors.description}</p>}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="registrationLink">
          Registration Link
        </label>
        <input
          id="registrationLink"
          type="url"
          className={`form-input ${errors.registrationLink ? 'has-error' : ''}`}
          placeholder="https://..."
          value={formData.registrationLink}
          onChange={handleChange('registrationLink')}
        />
        {errors.registrationLink && <p className="form-error">{errors.registrationLink}</p>}
      </div>

      <div className="opportunity-form-actions">
        <button type="button" className="btn btn-outline" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default OpportunityForm;
