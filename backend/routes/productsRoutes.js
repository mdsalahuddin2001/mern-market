const express = require('express');
const {
  getAllProdcut,
  getProductBySlug,
} = require('../controllers/productsController');
const router = express.Router();
router.get('/', getAllProdcut);
router.get('/:slug', getProductBySlug);
module.exports = router;
