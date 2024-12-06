const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  accountName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Thêm các trường khác như email, tên, vv. nếu cần thiết
});

module.exports = mongoose.model('Customer', CustomerSchema);
