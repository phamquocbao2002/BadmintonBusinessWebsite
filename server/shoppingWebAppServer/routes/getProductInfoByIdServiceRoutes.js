const express = require('express');
const { getProductInfoById } = require('../controllers/getProductInfoByIdService');
const router = express.Router();

// Định nghĩa route GET lấy sản phẩm theo mã productId
router.get('/product/:productId?', getProductInfoById);

module.exports = router;
