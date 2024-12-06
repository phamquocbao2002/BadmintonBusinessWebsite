const axios = require('axios');

const requestData = {
    paymentAmount: 1000,
    currency: 'VND',
    orderId: 'SI0001',
    customerAccountName: 'JohnDoe',
    payMethod: 'CreditCard'
};

async function testPaymentQRCodeCreation() {
    try {
        const response = await axios.post('http://localhost:3001/api/paymentQRCodeCreation', requestData);
        console.log('Status:', response.status);
        console.log('Response data:', response.data);
    } catch (error) {
        console.error('Error response data:', error.response ? error.response.data : error.message);
    }
}
testPaymentQRCodeCreation();
