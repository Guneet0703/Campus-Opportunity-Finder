import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShield } from 'react-icons/fi';
import { loginAdmin } from '../../services/authService';
import { validateLoginForm } from '../../utils/validators';
import { useAuth } from '../../context/AuthContext';
import './AdminLogin.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    const validationErrors = validateLoginForm(formData);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setIsSubmitting(true);
    try {
      const res = await loginAdmin(formData);
      login(res.data.token, res.data.user);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setServerError(err.message || 'Invalid administrator credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-page admin-login-page">
      <div className="auth-card">
        <div className="admin-login-icon">
          <FiShield size={26} />
        </div>
        <h1>Administrator Login</h1>
        <p className="auth-subtext">Sign in to manage Campus Opportunity Finder listings.</p>

        <form onSubmit={handleSubmit} noValidate>
          {serverError && <div className="alert alert-error">{serverError}</div>}

          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">
              Email Address
            </label>
            <input
              id="admin-email"
              type="email"
              className={`form-input ${errors.email ? 'has-error' : ''}`}
              placeholder="admin@campusopportunityfinder.com"
              value={formData.email}
              onChange={handleChange('email')}
            />
            {errors.email && <p className="form-error">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              className={`form-input ${errors.password ? 'has-error' : ''}`}
              placeholder="Enter administrator password"
              value={formData.password}
              onChange={handleChange('password')}
            />
            {errors.password && <p className="form-error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
