import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <div className="container footer-inner">
      <div className="footer-brand">
        <div className="footer-brand-title">
          <Logo size={30} />
          <span>Campus Opportunity Finder</span>
        </div>
        <p>Helping Students Discover Better Opportunities.</p>
      </div>

      <div className="footer-links">
        <h4>Quick Links</h4>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} Campus Opportunity Finder. All Rights Reserved.</p>
    </div>
  </footer>
);

export default Footer;
