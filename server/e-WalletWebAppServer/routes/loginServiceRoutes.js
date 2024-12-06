const express = require('express');
const router = express.Router();
const { loginService } = require('../controllers/loginService');

// Định nghĩa route cho payService
router.post('/login', loginService);

module.exports = router;