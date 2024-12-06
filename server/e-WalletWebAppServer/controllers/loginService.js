const mongoose = require('mongoose');
const connectDB = require('../config/MongoDB');
const loginService = async (req, res) => {
    const { loginName, loginPass } = req.body;

    try {

        await connectDB();
        const db = mongoose.connection.db;

        // Tìm kiếm trong collection personalCustomer
        const personalCustomer = await db.collection('personalCustomer').findOne({ loginName, loginPass });

        if (personalCustomer) {
            // Lấy thông tin tài khoản trong paymentAccount dựa trên customerId
            const paymentAccount = await db.collection('paymentAccount').findOne({ customerId: personalCustomer.customerId });

            if (paymentAccount) {
                res.json({
                    status: 'success',
                    displayName: personalCustomer.displayName,
                    customerId: personalCustomer.customerId,
                    accountNumber: paymentAccount.accountNumber,
                    balance: paymentAccount.balance
                });
            } else {
                res.status(500).json({ status: 'failed', message: 'Account not found in paymentAccount' });
            }
        } else {
            // Nếu không tìm thấy trong personalCustomer, kiểm tra trong bussinessCustomer
            const businessCustomer = await db.collection('bussinessCustomer').findOne({ loginName, loginPass });

            if (businessCustomer) {
                // Lấy thông tin tài khoản trong paymentAccount dựa trên customerId
                const paymentAccount = await db.collection('paymentAccount').findOne({ customerId: businessCustomer.customerId });

                if (paymentAccount) {
                    res.json({
                        status: 'success',
                        displayName: businessCustomer.displayName,
                        customerId: businessCustomer.customerId,
                        accountNumber: paymentAccount.accountNumber,
                        balance: paymentAccount.balance
                    });
                } else {
                    res.status(500).json({ status: 'failed', message: 'Account not found in paymentAccount' });
                }
            } else {
                // Không tìm thấy người dùng trong cả hai bảng
                res.status(401).json({ status: 'failed', message: 'Invalid login credentials' });
            }
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ status: 'failed', message: 'Server error' });
    }
}


module.exports = { loginService };
