const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async');
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
// @desc     Filter/Search
// @route    POST ==>> /api/products/search
// @access   Public
const filterProducts = asyncHandler(async (req, res, next) => {
  const { query } = req;
  const pageSize = query.pageSize || 3;
  const page = query.page || 1;
  const category = query.category || '';
  const brand = query.brand || '';
  const price = query.price || '';
  const rating = query.rating || '';
  const order = query.order || '';
  const searchQuery = query.query || '';

  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
          name: {
            $regex: searchQuery,
            $options: 'i',
          },
        }
      : {};
  const categoryFilter = category && category !== 'all' ? { category } : {};
  const ratingFilter =
    rating && rating !== 'all'
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  const priceFilter =
    price && price !== 'all'
      ? {
          price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]),
          },
        }
      : {};
  const sortOrder =
    order === 'featured'
      ? { featured: -1 }
      : order === 'lowest'
      ? { price: 1 }
      : order === 'highest'
      ? { price: -1 }
      : order === 'toprated'
      ? { rating: -1 }
      : order === 'newest'
      ? { createdAt: -1 }
      : { _id: -1 };
  const products = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
  });
  res.status(200).json({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
});
// @desc     Get categories
// @route    POST ==>> /api/products/categories
// @access   Public
const getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Product.find().distinct('category');
  res.status(200).json(categories);
});
module.exports = {
  getAllProdcut,
  getProductBySlug,
  getCategories,
  filterProducts,
};
