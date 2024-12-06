const mongoose = require('mongoose');

const OrderDetailSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
}, {
  timestamps: true,
  collection: 'orderDetails'
});

module.exports = mongoose.model('OrderDetail', OrderDetailSchema);
