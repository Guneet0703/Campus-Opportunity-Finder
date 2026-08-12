const Opportunity = require('../models/Opportunity');
const Bookmark = require('../models/Bookmark');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get all opportunities (supports optional search & category filter)
 * @route   GET /api/opportunities?search=&category=
 * @access  Public
 */
const getOpportunities = asyncHandler(async (req, res) => {
  const { search, category } = req.query;
  const query = {};

  if (category && category !== 'All Categories') {
    query.category = category;
  }

  if (search && search.trim() !== '') {
    const regex = new RegExp(search.trim(), 'i');
    query.$or = [{ title: regex }, { organizer: regex }];
  }

  const opportunities = await Opportunity.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: opportunities.length,
    data: opportunities,
  });
});

/**
 * @desc    Get a single opportunity by id
 * @route   GET /api/opportunities/:id
 * @access  Public
 */
const getOpportunityById = asyncHandler(async (req, res) => {
  const opportunity = await Opportunity.findById(req.params.id);

  if (!opportunity) {
    return res.status(404).json({
      success: false,
      message: 'Opportunity not found.',
    });
  }

  res.status(200).json({
    success: true,
    data: opportunity,
  });
});

/**
 * @desc    Create a new opportunity
 * @route   POST /api/opportunities
 * @access  Private/Admin
 */
const createOpportunity = asyncHandler(async (req, res) => {
  const {
    title,
    category,
    organizer,
    location,
    eligibility,
    deadline,
    description,
    registrationLink,
  } = req.body;

  const opportunity = await Opportunity.create({
    title,
    category,
    organizer,
    location,
    eligibility,
    deadline,
    description,
    registrationLink,
  });

  res.status(201).json({
    success: true,
    message: 'Opportunity added successfully.',
    data: opportunity,
  });
});

/**
 * @desc    Update an existing opportunity
 * @route   PUT /api/opportunities/:id
 * @access  Private/Admin
 */
const updateOpportunity = asyncHandler(async (req, res) => {
  const opportunity = await Opportunity.findById(req.params.id);

  if (!opportunity) {
    return res.status(404).json({
      success: false,
      message: 'Opportunity not found.',
    });
  }

  const fields = [
    'title',
    'category',
    'organizer',
    'location',
    'eligibility',
    'deadline',
    'description',
    'registrationLink',
  ];

  fields.forEach((field) => {
    if (req.body[field] !== undefined) {
      opportunity[field] = req.body[field];
    }
  });

  const updated = await opportunity.save();

  res.status(200).json({
    success: true,
    message: 'Opportunity updated successfully.',
    data: updated,
  });
});

/**
 * @desc    Delete an opportunity (and any bookmarks referencing it)
 * @route   DELETE /api/opportunities/:id
 * @access  Private/Admin
 */
const deleteOpportunity = asyncHandler(async (req, res) => {
  const opportunity = await Opportunity.findById(req.params.id);

  if (!opportunity) {
    return res.status(404).json({
      success: false,
      message: 'Opportunity not found.',
    });
  }

  await opportunity.deleteOne();
  await Bookmark.deleteMany({ opportunityId: req.params.id });

  res.status(200).json({
    success: true,
    message: 'Opportunity deleted successfully.',
  });
});

module.exports = {
  getOpportunities,
  getOpportunityById,
  createOpportunity,
  updateOpportunity,
  deleteOpportunity,
};
