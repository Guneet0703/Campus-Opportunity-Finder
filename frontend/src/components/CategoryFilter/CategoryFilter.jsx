import { FiFilter } from 'react-icons/fi';
import { CATEGORY_FILTER_OPTIONS } from '../../data/categories';
import './CategoryFilter.css';

const CategoryFilter = ({ value, onChange }) => (
  <div className="category-filter">
    <FiFilter size={16} className="category-filter-icon" />
    <select
      className="category-filter-select"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Filter opportunities by category"
    >
      {CATEGORY_FILTER_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default CategoryFilter;
