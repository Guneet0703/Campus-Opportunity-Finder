import { Link } from 'react-router-dom';
import { FiHeart, FiMapPin, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { formatDate, truncateText } from '../../utils/dateFormatter';
import './OpportunityCard.css';

/**
 * Displays a single opportunity. Reused on the Home page and the
 * My Bookmarks page - never duplicated.
 *
 * Props:
 *  - opportunity: the opportunity document
 *  - isBookmarked: boolean, whether the current student has bookmarked it
 *  - onToggleBookmark: (opportunityId) => void, called when the bookmark icon is clicked
 *  - showBookmarkButton: whether to render the bookmark control (defaults true)
 */
const OpportunityCard = ({
  opportunity,
  isBookmarked = false,
  onToggleBookmark,
  showBookmarkButton = true,
}) => {
  const handleBookmarkClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleBookmark) onToggleBookmark(opportunity._id);
  };

  return (
    <div className="opportunity-card card">
      <div className="opportunity-card-header">
        <span className="badge">{opportunity.category}</span>
        {showBookmarkButton && (
          <button
            type="button"
            className={`bookmark-btn ${isBookmarked ? 'is-active' : ''}`}
            onClick={handleBookmarkClick}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark this opportunity'}
          >
            <FiHeart size={18} />
          </button>
        )}
      </div>

      <h3 className="opportunity-card-title">{opportunity.title}</h3>
      <p className="opportunity-card-organizer">{opportunity.organizer}</p>

      <div className="opportunity-card-meta">
        <span>
          <FiMapPin size={14} /> {opportunity.location}
        </span>
        <span>
          <FiCalendar size={14} /> {formatDate(opportunity.deadline)}
        </span>
      </div>

      <p className="opportunity-card-description">
        {truncateText(opportunity.description, 110)}
      </p>

      <Link
        to={`/opportunity/${opportunity._id}`}
        className="opportunity-card-details-link"
        onClick={(e) => e.stopPropagation()}
      >
        View Details <FiArrowRight size={16} />
      </Link>
    </div>
  );
};

export default OpportunityCard;
