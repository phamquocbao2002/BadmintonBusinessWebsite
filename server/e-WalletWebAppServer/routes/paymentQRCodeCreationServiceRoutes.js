const express = require('express');
const { paymentQRCodeCreationService } = require('../controllers/paymentQRCodeCreationService');
const router = express.Router();

router.post('/paymentQRCodeCreation', paymentQRCodeCreationService);

module.exports = router;
