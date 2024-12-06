const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  productName: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  unitPrice: { 
    type: Number, 
    required: true 
  },
  stock: { 
    type: Number, 
    required: true,
    default: 0 
  },
  mainImageURL: { 
    type: String, 
    required: true 
  },
  detailImagesFolderURL: { 
    type: String, 
    required: true 
  }
}, {
  timestamps: true // Tùy chọn tự động thêm createdAt và updatedAt
});

module.exports = mongoose.model('Product', ProductSchema);
