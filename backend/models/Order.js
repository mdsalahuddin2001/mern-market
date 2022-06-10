const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    orderItems: [
      {
        slug: { type: String, required: [true, 'Slug is required'] },
        name: { type: String, required: [true, 'Name is required'] },
        amount: { type: Number, required: [true, 'Amount is required'] },
        image: {
          type: String,
          required: [true, 'Image is required'],
        },
        price: { type: Number, required: [true, 'Price is required'] },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: [true, 'Product id is required'],
        },
      },
    ],
    shippingAddress: {
      name: { type: String, required: [true, 'Name is required'] },
      address: { type: String, required: [true, 'Address is required'] },
      city: { type: String, required: [true, 'City is required'] },
      postCode: { type: String, required: [true, 'Post Code is required'] },
      country: { type: String, required: [true, 'Country is requird'] },
    },
    paymentMethod: {
      type: String,
      required: [true, 'Payment method is required'],
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: [true, 'items price is required'] },
    shippingPrice: {
      type: Number,
      required: [true, 'shippingPrice is required'],
    },
    taxPrice: { type: Number, required: [true, 'taxPrice is required'] },
    totalPrice: { type: Number, required: [true, 'totalPrice is required'] },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'user id is required'],
    },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
