const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./config/db');

const data = require('./data');
const errorHandler = require('./middlewares/error');
// Routes - imports
const seedRouter = require('./routes/seedRoutes');
const productsRouter = require('./routes/productsRoutes');
const authRouter = require('./routes/authRoutes');
// body parser
app.use(express.json());
// Connect Database
connectDB();
// Use Routers
app.use('/api/seed', seedRouter);
app.use('/api/auth', authRouter);
app.use('/api/products', productsRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: 'No route matched' });
});
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
