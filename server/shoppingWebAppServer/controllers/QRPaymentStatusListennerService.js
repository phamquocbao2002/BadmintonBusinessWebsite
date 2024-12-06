
const connectDB = require('../config/MongoDB');
const mongoose = require('mongoose');

const QRPaymentStatusListennerService = async (qrCodeId, paymentStatus) => {
    await connectDB();

    try {
        const collection = mongoose.connection.collection('paymentQrCode');
        const result = await collection.updateOne(
            { qrCodeId: qrCodeId }, 
            { $set: { paymentStatus: paymentStatus } }
        );
        
        if (result.matchedCount > 0) {
            return { status: 'ok', message: 'Cập nhật thành công' };
        } else {
            return { status: 'failed', message: 'Không tìm thấy qrCodeId' };
        }
    } catch (error) {
        console.error('Lỗi khi cập nhật paymentStatus:', error);
        return { status: 'failed', message: 'Cập nhật thất bại' };
    }
};

module.exports = { QRPaymentStatusListennerService };
