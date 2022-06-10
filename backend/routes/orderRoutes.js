const express = require('express');
const { protect } = require('../middlewares/auth');
const {
  createOrder,
  getOrder,
  getOrdersMine,
} = require('../controllers/orderControllers');
const router = express.Router();
router.post('/', protect, createOrder);
router.get('/mine', protect, getOrdersMine);
router.get('/:id', protect, getOrder);
module.exports = router;
