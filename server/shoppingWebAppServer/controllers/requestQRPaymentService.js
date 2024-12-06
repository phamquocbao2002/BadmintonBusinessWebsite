const connectDB = require('../config/MongoDB');
const mongoose = require('mongoose');
const axios = require('axios');

const requestQRPaymentService = async (req, res) => {
    try {
        await connectDB();

        const count = await mongoose.connection.collection('paymentQrCode').countDocuments();

        const qrCodeId = `partner01${String(count + 1).padStart(4, '0')}`;
        const newQrCode = {
            qrCodeId: qrCodeId,
            paymentStatus: 'processing'
        };

        const db = mongoose.connection.db;
        const insertResult = await db.collection('paymentQrCode').insertOne(newQrCode);

        if (insertResult.acknowledged) {
            const { receiverAccountNumber, receiverName, amount } = req.body;

            try {
                const apiResponse = await axios.post('http://localhost:3001/api/paymentQRCodeCreation', {
                    receiverAccountNumber,
                    receiverName,
                    amount,
                    partnerId: 'partner01',
                    qrCodeId
                });

                // Trả về kết quả response từ API cho client
                res.json({
                    qrCodeId: qrCodeId,            // Thêm qrCodeId vào response
                    ...apiResponse.data             // Spread operator để bao gồm tất cả các dữ liệu từ apiResponse.data
                });
            } catch (apiError) {
                console.error('Error calling paymentQRCodeCreationService:', apiError);
                res.status(500).json({ status: 'failed', message: 'Failed to call external API.' });
            }
        } else {
            res.status(500).json({ status: 'failed', message: 'Failed to create payment QR code.' });
        }
    } catch (error) {
        console.error('Error in requestQRPaymentService:', error);
        res.status(500).json({ status: 'failed', message: 'An error occurred.' });
    }
};

module.exports = { requestQRPaymentService };
