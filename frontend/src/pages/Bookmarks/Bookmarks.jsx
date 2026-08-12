import { useState, useEffect, useCallback } from 'react';
import OpportunityCard from '../../components/OpportunityCard/OpportunityCard';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import EmptyState from '../../components/EmptyState/EmptyState';
import { getBookmarks, removeBookmark } from '../../services/bookmarkService';
import './Bookmarks.css';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchBookmarks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getBookmarks();
      setBookmarks(res.data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBookmarks();
  }, [fetchBookmarks]);

  const handleRemoveBookmark = async (opportunityId) => {
    try {
      await removeBookmark(opportunityId);
      setBookmarks((prev) => prev.filter((b) => b.opportunity._id !== opportunityId));
    } catch {
      // ignore - list will remain unchanged if removal failed
    }
  };

  return (
    <div className="container bookmarks-page">
      <div className="page-header">
        <h1>My Bookmarks</h1>
        <p className="section-subheading">Opportunities you've saved for later.</p>
      </div>

      {loading && <Loading message="Loading bookmarks..." />}

      {!loading && error && <ErrorMessage message={error} onRetry={fetchBookmarks} />}

      {!loading && !error && bookmarks.length === 0 && (
        <EmptyState
          title="No bookmarks yet"
          message="You haven't bookmarked any opportunities yet."
        />
      )}

      {!loading && !error && bookmarks.length > 0 && (
        <div className="opportunities-grid">
          {bookmarks.map(({ opportunity }) => (
            <OpportunityCard
              key={opportunity._id}
              opportunity={opportunity}
              isBookmarked
              onToggleBookmark={handleRemoveBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
