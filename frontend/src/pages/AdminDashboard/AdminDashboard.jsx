import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiLogOut } from 'react-icons/fi';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import EmptyState from '../../components/EmptyState/EmptyState';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';
import { getOpportunities, deleteOpportunity } from '../../services/opportunityService';
import { formatDate } from '../../utils/dateFormatter';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const fetchOpportunities = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const res = await getOpportunities();
      setOpportunities(res.data);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOpportunities();
  }, [fetchOpportunities]);

  const handleLogout = () => {
    logout();
    navigate('/admin-login');
  };

  const handleDeleteConfirmed = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteOpportunity(deleteTarget._id);
      setOpportunities((prev) => prev.filter((o) => o._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      setError(err.message || 'Failed to delete opportunity.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="container admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p className="section-subheading">
            Signed in as <strong>{user?.name}</strong>
          </p>
        </div>
        <div className="admin-dashboard-actions">
          <Link to="/admin/add-opportunity" className="btn btn-primary">
            <FiPlus size={16} /> Add Opportunity
          </Link>
          <button type="button" className="btn btn-outline" onClick={handleLogout}>
            <FiLogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {loading && <Loading message="Loading opportunities..." />}

      {!loading && error && <ErrorMessage message={error} onRetry={fetchOpportunities} />}

      {!loading && !error && opportunities.length === 0 && (
        <EmptyState
          title="No opportunities yet"
          message="Get started by adding your first opportunity."
        />
      )}

      {!loading && !error && opportunities.length > 0 && (
        <div className="admin-table-wrapper card">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Organizer</th>
                <th>Deadline</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opportunity) => (
                <tr key={opportunity._id}>
                  <td data-label="Title">{opportunity.title}</td>
                  <td data-label="Category">
                    <span className="badge">{opportunity.category}</span>
                  </td>
                  <td data-label="Organizer">{opportunity.organizer}</td>
                  <td data-label="Deadline">{formatDate(opportunity.deadline)}</td>
                  <td data-label="Actions">
                    <div className="admin-table-actions">
                      <Link
                        to={`/admin/edit-opportunity/${opportunity._id}`}
                        className="icon-btn"
                        title="Edit"
                        aria-label="Edit opportunity"
                      >
                        <FiEdit2 size={16} />
                      </Link>
                      <button
                        type="button"
                        className="icon-btn icon-btn-danger"
                        title="Delete"
                        aria-label="Delete opportunity"
                        onClick={() => setDeleteTarget(opportunity)}
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ConfirmationModal
        isOpen={Boolean(deleteTarget)}
        title="Delete this opportunity?"
        message={`"${deleteTarget?.title}" will be permanently removed, along with any student bookmarks referencing it.`}
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setDeleteTarget(null)}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AdminDashboard;
