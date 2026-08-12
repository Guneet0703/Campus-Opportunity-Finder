import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OpportunityForm from '../../components/OpportunityForm/OpportunityForm';
import Loading from '../../components/Loading/Loading';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { getOpportunityById, updateOpportunity } from '../../services/opportunityService';
import './EditOpportunity.css';

const EditOpportunity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [opportunity, setOpportunity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

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

  const handleSubmit = async (formData) => {
    setServerError('');
    setIsSubmitting(true);
    try {
      await updateOpportunity(id, formData);
      navigate('/admin/dashboard');
    } catch (err) {
      setServerError(err.message || 'Failed to update opportunity. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <Loading message="Loading opportunity..." />;
  if (error || !opportunity)
    return <ErrorMessage message={error || 'Opportunity not found.'} onRetry={fetchOpportunity} />;

  return (
    <div className="container edit-opportunity-page">
      <div className="page-header">
        <h1>Edit Opportunity</h1>
        <p className="section-subheading">Update the details of this listing.</p>
      </div>

      <OpportunityForm
        initialValues={opportunity}
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin/dashboard')}
        submitLabel="Save Changes"
        isSubmitting={isSubmitting}
        serverError={serverError}
      />
    </div>
  );
};

export default EditOpportunity;
