const Product = require('../models/Product');

const getProductInfoById = async (req, res) => {
  try {
    const productId = req.params.productId;
    let product;

    if (!productId || productId.trim() === "") {
      product = await Product.find();
    } else {
      product = await Product.findOne({ productId });
    }
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
module.exports = { getProductInfoById };
