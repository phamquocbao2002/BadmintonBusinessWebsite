const Product = require('../models/Product');

const getProductInfoByCategory = async (req, res) => {
    try {
        const { category } = req.body;
        const products = await Product.find({ category });

        if (products.length > 0) {
            res.json(products);
        } else {
            res.status(404).json({ message: 'No products found for this category.' });
        }
    } catch (error) {
        console.error('Error in getProductInfoByCategory:', error);
        res.status(500).json({ message: 'An error occurred while fetching products.' });
    }
};

module.exports = { getProductInfoByCategory };
