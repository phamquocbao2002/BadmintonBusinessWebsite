const axios = require('axios');

async function testQRPaymentStatusLookup() {
    try {
        const response = await axios.post('http://localhost:3000/api/lookupQRPaymentStatus', {
            qrCodeId: 'partner010020'
        });

        console.log('Response from API:', response.data);
    } catch (error) {
        console.error('Error while testing API:', error.response ? error.response.data : error.message);
    }
}

testQRPaymentStatusLookup();
