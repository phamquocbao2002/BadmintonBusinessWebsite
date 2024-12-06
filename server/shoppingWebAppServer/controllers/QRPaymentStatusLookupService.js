const connectDB = require('../config/MongoDB');
const mongoose = require('mongoose');

const QRPaymentStatusLookupService = async (req, res) => {
    try {
        await connectDB();
        const { qrCodeId } = req.body;
        const db = mongoose.connection.db;
        const paymentRecord = await db.collection('paymentQrCode').findOne({ qrCodeId });
        if (paymentRecord) {
            res.json({
                status: 'success',
                paymentStatus: paymentRecord.paymentStatus
            });
        } else {
            res.status(404).json({
                status: 'failed',
                message: 'QR Code not found'
            });
        }
    } catch (error) {
        console.error('Error in QRPaymentStatusLookupService:', error);
        res.status(500).json({
            status: 'failed',
            message: 'An error occurred.'
        });
    }
};

module.exports = { QRPaymentStatusLookupService };
