import { FiAlertTriangle } from 'react-icons/fi';
import './ConfirmationModal.css';

const ConfirmationModal = ({
  isOpen,
  title = 'Are you sure?',
  message,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-icon">
          <FiAlertTriangle size={28} />
        </div>
        <h3>{title}</h3>
        {message && <p>{message}</p>}
        <div className="modal-actions">
          <button type="button" className="btn btn-outline" onClick={onCancel} disabled={isLoading}>
            {cancelLabel}
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? 'Please wait...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
