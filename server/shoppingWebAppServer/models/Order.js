const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true
  },
  receiverAddress: {
    type: String,
    required: true
  },
  receiverPhoneNumber: {
    type: String,
    required: true
  },
  customerAccountName: {
    type: String,
    required: true
  },
  orderDate: {
    type: Date,
    required: true
  },
  payMethod: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    required: true
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

module.exports = mongoose.model('Order', OrderSchema);
