
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      {/* Brand */}
      <div className="footer-brand">
        <Link to="/" className="footer-brand-title">
          <Logo size={30} />
          <span>Campus Opportunity Finder</span>
        </Link>

        <p>Helping Students Discover Better Opportunities.</p>
      </div>

      {/* Explore */}
      <div className="footer-links">
        <h4>Explore</h4>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/opportunities">Browse Opportunities</Link>
          </li>
          <li>
            <Link to="/bookmarks">My Bookmarks</Link>
          </li>
        </ul>
      </div>

      {/* Account */}
      <div className="footer-links">
        <h4>Account</h4>
        <ul>
          <li>
            <Link to="/login">Student Login</Link>
          </li>
          <li>
            <Link to="/register">Create Account</Link>
          </li>
          <li>
            <Link to="/admin-login">Admin Login</Link>
          </li>
        </ul>
      </div>

      {/* Contact */}
      <div className="footer-links">
        <h4>Contact</h4>
        <ul>
          <li>
            <a href="mailto:YOUR_EMAIL@example.com">
              Email Us
            </a>
          </li>
          <li>
            <Link to="/opportunities">Find Opportunities</Link>
          </li>
        </ul>
      </div>
    </div>

    {/* Copyright */}
    <div className="footer-bottom">
      <p>
        &copy; {new Date().getFullYear()} Campus Opportunity Finder.
        {' '}All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
