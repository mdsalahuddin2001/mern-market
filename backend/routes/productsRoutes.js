const express = require('express');
const {
  getAllProdcut,
  getProductBySlug,
  getCategories,
  filterProducts,
} = require('../controllers/productsController');
const router = express.Router();
router.get('/', getAllProdcut);
router.get('/search', filterProducts);
router.get('/categories', getCategories);
router.get('/:slug', getProductBySlug);

module.exports = router;
