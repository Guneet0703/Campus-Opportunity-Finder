import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCompass } from 'react-icons/fi';
import OpportunityCard from '../../components/OpportunityCard/OpportunityCard';
import SearchBar from '../../components/SearchBar/SearchBar';
import CategoryFilter from '../../components/CategoryFilter/CategoryFilter';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import EmptyState from '../../components/EmptyState/EmptyState';
import { useAuth } from '../../context/AuthContext';
import useDebouncedValue from '../../hooks/useDebouncedValue';
import { getOpportunities } from '../../services/opportunityService';
import { getBookmarkIds, addBookmark, removeBookmark } from '../../services/bookmarkService';
import './Home.css';

const Home = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const debouncedSearch = useDebouncedValue(search, 350);
  const { isAuthenticated, isStudent } = useAuth();
  const navigate = useNavigate();

  const fetchOpportunities = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getOpportunities({ search: debouncedSearch, category });
      setOpportunities(res.data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch, category]);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  useEffect(() => {
    const loadBookmarks = async () => {
      if (!isAuthenticated || !isStudent) {
        setBookmarkedIds([]);
        return;
      }
      try {
        const res = await getBookmarkIds();
        setBookmarkedIds(res.data);
      } catch {
        // silently ignore - bookmarks are a secondary concern for this view
      }
    };
    loadBookmarks();
  }, [isAuthenticated, isStudent]);

  const handleScrollToOpportunities = () => {
    document.getElementById('opportunities')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleToggleBookmark = async (opportunityId) => {
    if (!isAuthenticated || !isStudent) {
      navigate('/login');
      return;
    }

    const alreadyBookmarked = bookmarkedIds.includes(opportunityId);
    try {
      if (alreadyBookmarked) {
        await removeBookmark(opportunityId);
        setBookmarkedIds((prev) => prev.filter((id) => id !== opportunityId));
      } else {
        await addBookmark(opportunityId);
        setBookmarkedIds((prev) => [...prev, opportunityId]);
      }
    } catch {
      // no-op: leave state unchanged if the request failed
    }
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Discover Your Next Career Opportunity</h1>
          <p>
            Find internships, hackathons, workshops, coding contests, scholarships, and
            more—all in one place.
          </p>
          <button type="button" className="btn btn-primary" onClick={handleScrollToOpportunities}>
            <FiCompass size={18} /> Browse Opportunities
          </button>
        </div>
      </section>

      <section className="search-filter-section">
        <div className="container search-filter-inner">
          <SearchBar value={search} onChange={setSearch} />
          <CategoryFilter value={category} onChange={setCategory} />
        </div>
      </section>

      <section id="opportunities" className="section opportunities-section">
        <div className="container">
          <h2 className="section-heading">Explore Opportunities</h2>
          <p className="section-subheading">
            Browse curated internships, hackathons, workshops, and more.
          </p>

          {loading && <Loading message="Loading opportunities..." />}

          {!loading && error && <ErrorMessage message={error} onRetry={fetchOpportunities} />}

          {!loading && !error && opportunities.length === 0 && (
            <EmptyState
              title="No opportunities found"
              message={
                search || category !== 'All Categories'
                  ? 'No opportunities match your search.'
                  : 'No opportunities are available at the moment.'
              }
            />
          )}

          {!loading && !error && opportunities.length > 0 && (
            <div className="opportunities-grid">
              {opportunities.map((opportunity) => (
                <OpportunityCard
                  key={opportunity._id}
                  opportunity={opportunity}
                  isBookmarked={bookmarkedIds.includes(opportunity._id)}
                  onToggleBookmark={handleToggleBookmark}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
