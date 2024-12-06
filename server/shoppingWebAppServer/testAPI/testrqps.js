const axios = require('axios');

const testRequestQRPayment = async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/requestQRPayment', {
            receiverAccountNumber: '123456789',
            receiverName: 'baopham',
            amount: 500000
        });

        console.log('Response from API:', response.data);
    } catch (error) {
        console.error('Error while testing API:', error.response ? error.response.data : error.message);
    }
};

testRequestQRPayment();
