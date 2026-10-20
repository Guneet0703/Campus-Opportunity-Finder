import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  FiMenu,
  FiX,
  FiUser,
  FiBookmark,
  FiLogOut,
  FiChevronDown,
  FiCompass,
  FiMail,
  FiShield,
  FiGrid,
  FiLogIn,
  FiUserPlus,
} from 'react-icons/fi';

import Logo from '../Logo/Logo';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

// Replace this with your real contact email.
const CONTACT_EMAIL = 'YOUR_EMAIL@example.com';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { isAuthenticated, isStudent, isAdmin, user, logout } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const profileRef = useRef(null);

  const isLandingPage = location.pathname === '/';

  // Close menus whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location.pathname, location.search]);

  // Close the profile dropdown when clicking outside it.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close menus when Escape is pressed.
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
        setProfileOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setProfileOpen(false);
  };

  const handleLogout = () => {
    closeMenus();
    logout();
    navigate('/', { replace: true });
  };

  const getLinkClass = ({ isActive }) =>
    `navbar-link${isActive ? ' active' : ''}`;

  const firstName = user?.name?.trim().split(/\s+/)[0] || 'Account';

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link
          to="/"
          className="navbar-brand"
          onClick={closeMenus}
          aria-label="Campus Opportunity Finder home"
        >
          <span className="navbar-brand-logo">
            <Logo size={40} />
          </span>

          <span className="navbar-brand-text">
            <span className="navbar-brand-title">
              Campus Opportunity
            </span>
            <span className="navbar-brand-subtitle">FINDER</span>
          </span>
        </Link>

        {/* Main navigation */}
        <nav
          className={`navbar-center${mobileOpen ? ' is-open' : ''}`}
          id="main-navigation"
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            end
            className={getLinkClass}
            onClick={closeMenus}
          >
            Home
          </NavLink>


          {/* Student navigation */}
          {isAuthenticated && isStudent && (
            <>
              <NavLink
                to="/bookmarks"
                className={getLinkClass}
                onClick={closeMenus}
              >
                <FiBookmark className="navbar-link-icon" />
                <span>My Bookmarks</span>
              </NavLink>

              <NavLink
                to="/profile"
                className={getLinkClass}
                onClick={closeMenus}
              >
                <FiUser className="navbar-link-icon" />
                <span>My Profile</span>
              </NavLink>
            </>
          )}

          {/* Admin navigation */}
          {isAuthenticated && isAdmin && (
            <NavLink
              to="/admin/dashboard"
              className={getLinkClass}
              onClick={closeMenus}
            >
              <FiGrid className="navbar-link-icon" />
              <span>Admin Dashboard</span>
            </NavLink>
          )}

          {/* Contact */}
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="navbar-link"
            onClick={closeMenus}
          >
            <FiMail className="navbar-link-icon" />
            <span>Contact</span>
          </a>

          {/* Mobile account actions */}
          <div className="navbar-mobile-actions">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="navbar-mobile-action"
                  onClick={closeMenus}
                >
                  <FiLogIn />
                  <span>Student Login</span>
                </Link>

                <Link
                  to="/register"
                  className="navbar-mobile-action"
                  onClick={closeMenus}
                >
                  <FiUserPlus />
                  <span>Create Account</span>
                </Link>

                <Link
                  to="/admin-login"
                  className="navbar-mobile-action"
                  onClick={closeMenus}
                >
                  <FiShield />
                  <span>Admin Login</span>
                </Link>
              </>
            ) : (
              <button
                type="button"
                className="navbar-mobile-action navbar-mobile-logout"
                onClick={handleLogout}
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            )}
          </div>
        </nav>

        {/* Right-side account controls */}
        <div className="navbar-right">
          {/* Guest actions on the landing page */}
          {!isAuthenticated && isLandingPage && (
            <div className="navbar-guest-actions">
              <Link
                to="/admin-login"
                className="navbar-admin-link"
              >
                <FiShield />
                <span>Admin Login</span>
              </Link>

              <Link to="/login" className="navbar-login-btn">
                Login
              </Link>

              <Link to="/register" className="navbar-register-btn">
                Register
              </Link>
            </div>
          )}

          {/* Student profile dropdown */}
          {isAuthenticated && isStudent && (
            <div className="navbar-profile" ref={profileRef}>
              <button
                type="button"
                className={`navbar-profile-trigger${
                  profileOpen ? ' is-open' : ''
                }`}
                onClick={() =>
                  setProfileOpen((previous) => !previous)
                }
                aria-haspopup="menu"
                aria-expanded={profileOpen}
                aria-label={`Account menu for ${firstName}`}
              >
                <span className="navbar-avatar">
                  <FiUser size={17} />
                </span>

                <span className="navbar-profile-name">
                  {firstName}
                </span>

                <FiChevronDown
                  className={`navbar-chevron${
                    profileOpen ? ' is-rotated' : ''
                  }`}
                  size={15}
                />
              </button>

              {profileOpen && (
                <div className="navbar-dropdown" role="menu">
                  <div className="navbar-dropdown-heading">
                    <span className="navbar-dropdown-greeting">
                      Signed in as
                    </span>

                    <strong>{user?.name || 'Student'}</strong>

                    <span className="navbar-dropdown-role">
                      Student account
                    </span>
                  </div>

                  <div className="navbar-dropdown-divider" />

                  <Link
                    to="/profile"
                    className="navbar-dropdown-item"
                    role="menuitem"
                    onClick={closeMenus}
                  >
                    <FiUser />
                    <span>My Profile</span>
                  </Link>

                  <Link
                    to="/bookmarks"
                    className="navbar-dropdown-item"
                    role="menuitem"
                    onClick={closeMenus}
                  >
                    <FiBookmark />
                    <span>My Bookmarks</span>
                  </Link>

                  <div className="navbar-dropdown-divider" />

                  <button
                    type="button"
                    className="navbar-dropdown-item navbar-dropdown-logout"
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    <FiLogOut />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Admin account controls */}
          {isAuthenticated && isAdmin && (
            <button
              type="button"
              className="navbar-admin-account"
              onClick={handleLogout}
            >
              <span className="navbar-avatar navbar-admin-avatar">
                <FiShield size={17} />
              </span>

              <span>Logout</span>
              <FiLogOut size={16} />
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="navbar-hamburger"
            onClick={() =>
              setMobileOpen((previous) => !previous)
            }
            aria-label={
              mobileOpen
                ? 'Close navigation menu'
                : 'Open navigation menu'
            }
            aria-controls="main-navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <FiX size={23} />
            ) : (
              <FiMenu size={23} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;