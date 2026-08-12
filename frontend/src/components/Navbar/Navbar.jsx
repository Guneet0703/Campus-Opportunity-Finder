import { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiUser,
  FiBookmark,
  FiLogOut,
  FiChevronDown,
} from 'react-icons/fi';
import Logo from '../Logo/Logo';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isAuthenticated, isStudent, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBrowseClick = (e) => {
    e.preventDefault();
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate('/#opportunities');
      return;
    }
    const section = document.getElementById('opportunities');
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-brand">
          <Logo size={38} />
          <span>Campus Opportunity Finder</span>
        </Link>

        <nav className={`navbar-center ${mobileOpen ? 'is-open' : ''}`}>
          <NavLink to="/" className="navbar-link" onClick={() => setMobileOpen(false)}>
            Home
          </NavLink>
          <a href="#opportunities" className="navbar-link" onClick={handleBrowseClick}>
            Browse Opportunities
          </a>

          {/* Mobile-only auth links, shown inside the collapsible menu */}
          <div className="navbar-mobile-auth">
            {!isAuthenticated || !isStudent ? (
              <>
                <Link to="/login" className="navbar-link" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm navbar-mobile-register"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="navbar-link" onClick={() => setMobileOpen(false)}>
                  My Profile
                </Link>
                <Link to="/bookmarks" className="navbar-link" onClick={() => setMobileOpen(false)}>
                  My Bookmarks
                </Link>
                <button type="button" className="navbar-link navbar-logout" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>

        <div className="navbar-right">
          {!isAuthenticated || !isStudent ? (
            <>
              <Link to="/login" className="btn btn-outline btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          ) : (
            <div className="navbar-profile" ref={profileRef}>
              <button
                type="button"
                className="navbar-profile-trigger"
                onClick={() => setProfileOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={profileOpen}
              >
                <span className="navbar-avatar">
                  <FiUser size={18} />
                </span>
                <span className="navbar-profile-name">{user?.name?.split(' ')[0]}</span>
                <FiChevronDown size={16} />
              </button>

              {profileOpen && (
                <div className="navbar-dropdown">
                  <Link to="/profile" className="navbar-dropdown-item">
                    <FiUser size={16} /> My Profile
                  </Link>
                  <Link to="/bookmarks" className="navbar-dropdown-item">
                    <FiBookmark size={16} /> My Bookmarks
                  </Link>
                  <button type="button" className="navbar-dropdown-item" onClick={handleLogout}>
                    <FiLogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            type="button"
            className="navbar-hamburger"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
