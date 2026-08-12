const express = require('express');
const router = express.Router();
const {
  registerStudent,
  loginStudent,
  loginAdmin,
  getMe,
} = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validateMiddleware');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', validateRegister, registerStudent);
router.post('/login', validateLogin, loginStudent);
router.post('/admin/login', validateLogin, loginAdmin);
router.get('/me', protect, getMe);

module.exports = router;
