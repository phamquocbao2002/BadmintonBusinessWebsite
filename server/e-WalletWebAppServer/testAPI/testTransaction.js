const axios = require('axios');

async function testPayService() {
    try {
        const response = await axios.post('http://localhost:3001/api/payService', {
            payerAccountNumber: '1016951330',
            receiverAccountNumber: '1016951331',
            amount: 1000,
            partnerId: 'partner01',
            qrCodeId: 'partner010003'
        });

        console.log('Response from API:', response.data);
    } catch (error) {
        console.error('Error while testing API:', error.response ? error.response.data : error.message);
    }
}

testPayService();
