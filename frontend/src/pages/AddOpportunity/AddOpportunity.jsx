import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import OpportunityForm from '../../components/OpportunityForm/OpportunityForm';
import { createOpportunity } from '../../services/opportunityService';
import './AddOpportunity.css';

const AddOpportunity = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setServerError('');
    setIsSubmitting(true);
    try {
      await createOpportunity(formData);
      navigate('/admin/dashboard');
    } catch (err) {
      setServerError(err.message || 'Failed to add opportunity. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container add-opportunity-page">
      <div className="page-header">
        <h1>Add New Opportunity</h1>
        <p className="section-subheading">Fill in the details below to publish a new listing.</p>
      </div>

      <OpportunityForm
        onSubmit={handleSubmit}
        onCancel={() => navigate('/admin/dashboard')}
        submitLabel="Publish Opportunity"
        isSubmitting={isSubmitting}
        serverError={serverError}
      />
    </div>
  );
};

export default AddOpportunity;
