import './Loading.css';

const Loading = ({ message = 'Loading...' }) => (
  <div className="loading-wrapper" role="status" aria-live="polite">
    <span className="loading-spinner" aria-hidden="true"></span>
    <p className="loading-message">{message}</p>
  </div>
);

export default Loading;
