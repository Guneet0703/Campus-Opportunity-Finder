const mongoose = require('mongoose');

const BookmarkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  opportunityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Opportunity',
    required: true,
  },
  bookmarkedAt: {
    type: Date,
    default: Date.now,
  },
});

// A user cannot bookmark the same opportunity more than once.
BookmarkSchema.index({ userId: 1, opportunityId: 1 }, { unique: true });

module.exports = mongoose.model('Bookmark', BookmarkSchema);
