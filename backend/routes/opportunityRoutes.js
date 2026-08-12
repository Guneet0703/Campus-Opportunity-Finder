const express = require('express');
const router = express.Router();
const {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
} = require('../controllers/opportunityController');
const { protect } = require('../middleware/authMiddleware');
const { adminOnly } = require('../middleware/adminMiddleware');
const { validateOpportunity } = require('../middleware/validateMiddleware');

// Public routes
router.get('/', getOpportunities);
router.get('/:id', getOpportunityById);

// Admin-only routes
router.post('/', protect, adminOnly, validateOpportunity, createOpportunity);
router.put('/:id', protect, adminOnly, validateOpportunity, updateOpportunity);
router.delete('/:id', protect, adminOnly, deleteOpportunity);

module.exports = router;
