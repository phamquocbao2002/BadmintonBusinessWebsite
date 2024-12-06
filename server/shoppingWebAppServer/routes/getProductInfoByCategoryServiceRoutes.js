const express = require('express');
const router = express.Router();
const { getProductInfoByCategory } = require('../controllers/getProductInfoByCategoryService');

// Định nghĩa route cho getProductInfoByCategory
router.post('/getProductInfoByCategory', getProductInfoByCategory);

module.exports = router;
