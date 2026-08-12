const Bookmark = require('../models/Bookmark');
const Opportunity = require('../models/Opportunity');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get all bookmarked opportunities for the logged-in student
 * @route   GET /api/bookmarks
 * @access  Private/Student
 */
const getBookmarks = asyncHandler(async (req, res) => {
  const bookmarks = await Bookmark.find({ userId: req.user._id }).populate(
    'opportunityId'
  );

  // Filter out any bookmarks whose opportunity may have been deleted,
  // and shape the response as a list of opportunities with bookmark metadata.
  const data = bookmarks
    .filter((b) => b.opportunityId)
    .map((b) => ({
      bookmarkId: b._id,
      bookmarkedAt: b.bookmarkedAt,
      opportunity: b.opportunityId,
    }));

  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
});

/**
 * @desc    Get the set of opportunity ids the logged-in student has bookmarked
 * @route   GET /api/bookmarks/ids
 * @access  Private/Student
 */
const getBookmarkIds = asyncHandler(async (req, res) => {
  const bookmarks = await Bookmark.find({ userId: req.user._id }).select(
    'opportunityId'
  );
  res.status(200).json({
    success: true,
    data: bookmarks.map((b) => b.opportunityId.toString()),
  });
});

/**
 * @desc    Bookmark an opportunity
 * @route   POST /api/bookmarks/:opportunityId
 * @access  Private/Student
 */
const addBookmark = asyncHandler(async (req, res) => {
  const { opportunityId } = req.params;

  const opportunity = await Opportunity.findById(opportunityId);
  if (!opportunity) {
    return res.status(404).json({
      success: false,
      message: 'Opportunity not found.',
    });
  }

  const existing = await Bookmark.findOne({
    userId: req.user._id,
    opportunityId,
  });

  if (existing) {
    return res.status(200).json({
      success: true,
      message: 'Bookmark added successfully.',
      data: existing,
    });
  }

  const bookmark = await Bookmark.create({
    userId: req.user._id,
    opportunityId,
  });

  res.status(201).json({
    success: true,
    message: 'Bookmark added successfully.',
    data: bookmark,
  });
});

/**
 * @desc    Remove a bookmark
 * @route   DELETE /api/bookmarks/:opportunityId
 * @access  Private/Student
 */
const removeBookmark = asyncHandler(async (req, res) => {
  const { opportunityId } = req.params;

  const bookmark = await Bookmark.findOneAndDelete({
    userId: req.user._id,
    opportunityId,
  });

  if (!bookmark) {
    return res.status(404).json({
      success: false,
      message: 'Bookmark not found.',
    });
  }

  res.status(200).json({
    success: true,
    message: 'Bookmark removed successfully.',
  });
});

module.exports = { getBookmarks, getBookmarkIds, addBookmark, removeBookmark };
