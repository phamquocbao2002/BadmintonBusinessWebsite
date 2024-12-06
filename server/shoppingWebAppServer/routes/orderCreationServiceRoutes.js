const express = require('express');
const { orderCreationService } = require('../controllers/orderCreationService');
const router = express.Router();

// POST route để tạo order
router.post('/orderCreation', orderCreationService);

module.exports = router;
