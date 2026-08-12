import { FiAlertCircle } from 'react-icons/fi';
import './ErrorMessage.css';

const ErrorMessage = ({ message = 'Something went wrong. Please try again later.', onRetry }) => (
  <div className="error-wrapper" role="alert">
    <FiAlertCircle size={36} className="error-icon" />
    <p className="error-text">{message}</p>
    {onRetry && (
      <button type="button" className="btn btn-outline btn-sm" onClick={onRetry}>
        Try Again
      </button>
    )}
  </div>
);

export default ErrorMessage;
