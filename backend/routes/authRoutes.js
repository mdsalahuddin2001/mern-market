const express = require('express');
const { protect } = require('../middlewares/auth');
const {
  login,
  register,
  updateProfile,
} = require('../controllers/authcontroller');
const router = express.Router();
router.post('/login', login);
router.post('/signup', register);
router.put('/profile', protect, updateProfile);
module.exports = router;
