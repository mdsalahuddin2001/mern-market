const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');
const getAllProdcut = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products });
  } catch (error) {
    new ErrorResponse(error);
  }
};
// Get Single product by slug
const getProductBySlug = async (req, res) => {
  const slug = req.params.slug;
  try {
    const product = await Product.findOne({ slug });
    res.status(200).json(product);
  } catch (error) {
    new ErrorResponse(error);
  }
};
module.exports = { getAllProdcut, getProductBySlug };
