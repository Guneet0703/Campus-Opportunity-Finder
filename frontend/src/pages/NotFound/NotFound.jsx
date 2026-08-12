import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import './NotFound.css';

const NotFound = () => (
  <div className="not-found-page">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist or may have been moved.</p>
    <Link to="/" className="btn btn-primary">
      <FiHome size={16} /> Back to Home
    </Link>
  </div>
);

export default NotFound;
