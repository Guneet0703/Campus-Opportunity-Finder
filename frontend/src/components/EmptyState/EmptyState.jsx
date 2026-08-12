import { FiInbox } from 'react-icons/fi';
import './EmptyState.css';

const EmptyState = ({ title = 'Nothing here yet', message, icon: Icon = FiInbox }) => (
  <div className="empty-state">
    <Icon size={44} className="empty-state-icon" />
    <h3>{title}</h3>
    {message && <p>{message}</p>}
  </div>
);

export default EmptyState;
