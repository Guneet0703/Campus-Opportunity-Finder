import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FiArrowLeft,
  FiMapPin,
  FiCalendar,
  FiUsers,
  FiExternalLink,
  FiHeart,
  FiTag,
} from 'react-icons/fi';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getOpportunityById } from '../../services/opportunityService';
import { getBookmarkIds, addBookmark, removeBookmark } from '../../services/bookmarkService';
import { useAuth } from '../../context/AuthContext';
import { formatDate } from '../../utils/dateFormatter';
import './OpportunityDetails.css';

const OpportunityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, isStudent } = useAuth();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const fetchOpportunity = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getOpportunityById(id);
      setOpportunity(res.data);
    } catch (err) {
      setError(err.message || 'Opportunity not found.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOpportunity();
  }, [fetchOpportunity]);

  useEffect(() => {
    const checkBookmark = async () => {
      if (!isAuthenticated || !isStudent) return;
      try {
        const res = await getBookmarkIds();
        setIsBookmarked(res.data.includes(id));
      } catch {
        // ignore
      }
    };
    checkBookmark();
  }, [id, isAuthenticated, isStudent]);

  const handleToggleBookmark = async () => {
    if (!isAuthenticated || !isStudent) {
      navigate('/login');
      return;
    }
    try {
      if (isBookmarked) {
        await removeBookmark(id);
        setIsBookmarked(false);
      } else {
        await addBookmark(id);
        setIsBookmarked(true);
      }
    } catch {
      // ignore
    }
  };

  if (loading) return <Loading message="Loading opportunity..." />;
  if (error || !opportunity)
    return <ErrorMessage message={error || 'Opportunity not found.'} onRetry={fetchOpportunity} />;

  return (
    <div className="container details-page">
      <Link to="/" className="details-back-link">
        <FiArrowLeft size={16} /> Back
      </Link>

      <div className="details-card card">
        <span className="badge">{opportunity.category}</span>
        <h1 className="details-title">{opportunity.title}</h1>
        <p className="details-organizer">{opportunity.organizer}</p>

        <div className="details-meta-grid">
          <div className="details-meta-item">
            <FiMapPin size={18} />
            <div>
              <span className="details-meta-label">Location</span>
              <span>{opportunity.location}</span>
            </div>
          </div>
          <div className="details-meta-item">
            <FiUsers size={18} />
            <div>
              <span className="details-meta-label">Eligibility</span>
              <span>{opportunity.eligibility}</span>
            </div>
          </div>
          <div className="details-meta-item">
            <FiCalendar size={18} />
            <div>
              <span className="details-meta-label">Deadline</span>
              <span>{formatDate(opportunity.deadline)}</span>
            </div>
          </div>
          <div className="details-meta-item">
            <FiTag size={18} />
            <div>
              <span className="details-meta-label">Category</span>
              <span>{opportunity.category}</span>
            </div>
          </div>
        </div>

        <div className="details-description">
          <h2>Description</h2>
          <p>{opportunity.description}</p>
        </div>

        <div className="details-actions">
          <a
            href={opportunity.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            Register Now <FiExternalLink size={16} />
          </a>
          <button
            type="button"
            className={`btn btn-outline ${isBookmarked ? 'is-bookmarked' : ''}`}
            onClick={handleToggleBookmark}
          >
            <FiHeart size={16} /> {isBookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetails;
