const connectDB = require('../config/MongoDB');
const mongoose = require('mongoose');
const axios = require('axios');

// Hàm xử lý payService
const payService = async (req, res) => {
    try {
        // Kết nối đến MongoDB
        await connectDB();

        const db = mongoose.connection.db;

        // Lấy thông tin từ request body
        try {
            const { payerAccountNumber, receiverAccountNumber, amount, partnerId, qrCodeId } = req.body;

            // Tìm và cập nhật số dư cho receiverAccountNumber và payerAccountNumber
            const receiverUpdate = await db.collection('paymentAccount').findOneAndUpdate(
                { accountNumber: receiverAccountNumber },
                { $inc: { balance: amount } },
                { returnOriginal: false }
            );

            const payerUpdate = await db.collection('paymentAccount').findOneAndUpdate(
                { accountNumber: payerAccountNumber },
                { $inc: { balance: -amount } },
                { returnOriginal: false }
            );
            if (partnerId) {
                // Lấy partnerApiUrl từ collection bussinessCustomer dựa trên partnerId
                const partnerData = await db.collection('bussinessCustomer').findOne({ partnerId });

                if (partnerData && partnerData.partnerApiUrl) {
                    // Gửi request tới API của đối tác với qrCodeId và paymentStatus
                    const apiResponse = await axios.post(partnerData.partnerApiUrl, {
                        qrCodeId,
                        paymentStatus: 'completed'
                    });

                    // Trả về kết quả thành công cho client
                    res.json({ status: 'success', message: 'Payment and partner API updated successfully', partnerResponse: apiResponse.data });
                } else {
                    // Trường hợp không tìm thấy đối tác
                    res.json({ status: 'failed', message: 'Partner not found or API URL missing' });
                }
            } else {
                // Nếu không có partnerId, chỉ trả về kết quả thành công
                res.json({ status: 'success', message: 'Payment updated successfully' });
            }
        } catch (error) {
            res.json({ status: 'failed', message: 'Failed to update balance' });
        }

        // Nếu cập nhật thành công, xử lý tiếp nếu partnerId không null
    } catch (error) {
        res.status(500).json({ status: 'failed', message: 'An error occurred.' });
    }
};

module.exports = { payService };
