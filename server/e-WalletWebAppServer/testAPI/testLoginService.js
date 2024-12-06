const axios = require('axios');

// Function to test the login API
const testLoginService = async () => {
    try {
        // Request body giả lập từ client
        const requestBody = {
            loginName: 'baopham',
            loginPass: 'bao31102002'
        };

        // Gửi request POST đến API login
        const response = await axios.post('http://localhost:3001/api/login', requestBody);

        // In kết quả response từ API
        console.log('Response from login API:', response.data);

    } catch (error) {
        console.error('Error while testing login API:', error.response ? error.response.data : error.message);
    }
};

// Gọi hàm testLoginService để kiểm tra API
testLoginService();
