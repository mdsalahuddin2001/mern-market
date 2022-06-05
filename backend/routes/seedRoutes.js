const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const data = require('../data');
const User = require('../models/User');
router.get('/', async (req, res) => {
  await Product.deleteMany({});
  await User.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
  const createdUsers = await User.insertMany(data.users);
  res
    .status(201)
    .json({ success: true, products: createdProducts, users: createdUsers });
});
module.exports = router;
