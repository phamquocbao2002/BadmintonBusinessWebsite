const express = require('express');
const router = express.Router();
const { QRPaymentStatusLookupService } = require('../controllers/QRPaymentStatusLookupService');

// Định nghĩa route cho QRPaymentStatusLookupService
router.post('/lookupQRPaymentStatus', QRPaymentStatusLookupService);

module.exports = router;
