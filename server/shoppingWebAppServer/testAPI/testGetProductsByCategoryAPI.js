const axios = require('axios');

async function testGetProductInfoByCategory() {
    try {
        const response = await axios.post('http://localhost:3000/api/getProductInfoByCategory', {
            category: 'Vợt'
        });

        console.log('Response from API:', response.data);
    } catch (error) {
        console.error('Error while testing API:', error.response ? error.response.data : error.message);
    }
}

testGetProductInfoByCategory();
