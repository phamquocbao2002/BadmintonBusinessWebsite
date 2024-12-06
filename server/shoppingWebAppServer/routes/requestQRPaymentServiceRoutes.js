const express = require('express');
const router = express.Router();
const { requestQRPaymentService } = require('../controllers/requestQRPaymentService');

// Định tuyến cho requestQRPaymentService
router.post('/requestQRPayment', requestQRPaymentService);

module.exports = router;
