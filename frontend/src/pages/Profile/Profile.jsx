import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiBookmark, FiLogOut, FiAward } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container profile-page">
      <div className="profile-card card">
        <div className="profile-avatar">
          <FiUser size={32} />
        </div>
        <h1>{user?.name}</h1>
        <span className="badge">Student</span>

        <div className="profile-details">
          <div className="profile-detail-row">
            <FiMail size={18} />
            <div>
              <span className="details-meta-label">Email</span>
              <span>{user?.email}</span>
            </div>
          </div>
          <div className="profile-detail-row">
            <FiAward size={18} />
            <div>
              <span className="details-meta-label">Account Type</span>
              <span>Student</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <Link to="/bookmarks" className="btn btn-secondary">
            <FiBookmark size={16} /> My Bookmarks
          </Link>
          <button type="button" className="btn btn-outline" onClick={handleLogout}>
            <FiLogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
