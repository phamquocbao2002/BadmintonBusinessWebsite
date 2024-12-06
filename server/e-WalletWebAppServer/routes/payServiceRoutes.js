const express = require('express');
const router = express.Router();
const { payService } = require('../controllers/payService');

// Định nghĩa route cho payService
router.post('/payService', payService);

module.exports = router;
