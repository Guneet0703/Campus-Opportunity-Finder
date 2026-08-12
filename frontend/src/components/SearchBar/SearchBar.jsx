import { FiSearch } from 'react-icons/fi';
import './SearchBar.css';

const SearchBar = ({ value, onChange }) => (
  <div className="search-bar">
    <FiSearch size={18} className="search-icon" />
    <input
      type="text"
      className="search-input"
      placeholder="Search opportunities by title or organizer..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search opportunities"
    />
  </div>
);

export default SearchBar;
