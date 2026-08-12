import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Protects routes that require authentication.
 *
 * role="student" -> requires a logged-in student, redirects to /login otherwise
 * role="admin"   -> requires a logged-in admin, redirects to /admin-login otherwise
 *
 * If a student manually types an admin URL (or vice-versa), access is denied
 * and they are redirected to the appropriate login page, per spec 9.19/9.20.
 */
const ProtectedRoute = ({ role, children }) => {
  const { isAuthenticated, role: currentRole, initializing } = useAuth();
  const location = useLocation();

  if (initializing) return null;

  const loginPath = role === 'admin' ? '/admin-login' : '/login';

  if (!isAuthenticated || currentRole !== role) {
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
