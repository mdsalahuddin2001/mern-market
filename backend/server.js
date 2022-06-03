const express = require('express');
const app = express();
const data = require('./data');
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find(
    (product) => product.slug === req.params.slug
  );

  if (product) {
    return res.status(200).send(product);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
