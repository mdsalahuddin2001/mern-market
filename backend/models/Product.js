const mongoose = require('mongoose');
// let obj = {
//     id: 8,
//     name: 'Quoted T-Sirt',
//     slug: 'quoted-t-shirt',
//     summery: 'Write your products summary in within 120 words',
//     description:
//       'write your products description in details. You can write about 1000 words for your product description',
//     category: 'shirts',
//     image: 'images/products/product-8.jpg',
//     images: [
//       'images/products/product-13.jpg',
//       'images/products/product-14.jpg',
//       'images/products/product-15.jpg',
//       'images/products/product-16.jpg',
//     ],
//     isSize: true,
//     sizes: ['s', 'm', 'l', 'xl'],
//     isColor: true,
//     colors: [
//       '/images/colors/c1.jpg',
//       '/images/colors/c2.jpg',
//       '/images/colors/c3.jpg',
//     ],
//     price: 1200,
//     isDiscount: true,
//     discountedPrice: 1000,
//     countInStock: 10,
//     brand: 'Nike',
//     rating: 4.5,
//     numReviews: 10,
//     description: 'High quality shirt',
//     isFeatured: true,
//     isNew: true,
//     reviews: [
//       {
//         id: 1,
//         user: {
//           name: 'John Doe',
//           avatar: 'images/users/u1.jpg',
//           rating: 4.8,
//         },
//         comment: 'Great product',
//       },
//       {
//         id: 2,
//         user: {
//           name: 'Abdur Rahman',
//           avatar: 'images/users/u2.jpg',
//           rating: 4.5,
//         },
//         comment: 'Not bad',
//       },
//       {
//         id: 3,
//         user: {
//           name: 'Abdullah',
//           avatar: 'images/users/u3.jpg',
//           rating: 4.8,
//         },
//         comment: 'Nice product',
//       },
//       {
//         id: 4,
//         user: {
//           name: 'John Doe',
//           avatar: 'images/users/u4.jpg',
//           rating: 4.8,
//         },
//         comment: 'Beautiful',
//       }]}

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
      unique: true,
      maxlength: [100, "Product name can't be more than 100 characters"],
    },
    slug: {
      type: String,
      required: [true, 'slug is required'],
      trim: true,
    },
    summary: {
      type: String,
      required: [true, 'Please write a summary for product'],
      maxlength: [300, "Summary can't be more than 300 characters"],
    },
    description: {
      type: String,
      required: [true, 'Please write a description for product'],
      maxlength: [600, "Description can't be more than 600 characters"],
    },
    category: {
      type: String,
      required: [true, 'Provide a category for your product'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
    },
    isDiscount: {
      type: Boolean,
      default: false,
    },
    countInStock: {
      type: Number,
      required: [true, 'countInStock is required'],
    },
    brand: { type: String },
    discountedPrice: { type: Number },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      default: 0,
    },
    isFeatured: { type: Boolean, required: true, default: false },
    image: {
      type: String,
      required: [true, 'Image is required for product thumbnail'],
    },
    images: [{ type: String, required: true }],
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
