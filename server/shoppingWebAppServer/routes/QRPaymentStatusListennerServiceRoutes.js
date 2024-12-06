const express = require('express');
const { QRPaymentStatusListennerService } = require('../controllers/QRPaymentStatusListennerService');
const router = express.Router();


// Định nghĩa route cho API
router.post('/QRPaymentStatusListennerService', async (req, res) => {
    const { qrCodeId, paymentStatus } = req.body;

    // Gọi service để cập nhật trạng thái thanh toán
    const result = await QRPaymentStatusListennerService(qrCodeId, paymentStatus);

    // Trả về kết quả cho client
    res.json(result);
});

module.exports = router;
