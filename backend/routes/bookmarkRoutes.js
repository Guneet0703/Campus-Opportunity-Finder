const express = require('express');
const router = express.Router();
const {
  getBookmarks,
  getBookmarkIds,
  addBookmark,
  removeBookmark,
} = require('../controllers/bookmarkController');
const { protect, studentOnly } = require('../middleware/authMiddleware');

router.use(protect, studentOnly);

router.get('/', getBookmarks);
router.get('/ids', getBookmarkIds);
router.post('/:opportunityId', addBookmark);
router.delete('/:opportunityId', removeBookmark);

module.exports = router;
