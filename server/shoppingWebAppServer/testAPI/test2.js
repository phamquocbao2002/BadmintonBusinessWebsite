const axios = require('axios');

// Thông tin tài khoản giả lập để test
const testAccount = {
  accountName: 'testUserewew',
  password: 'testPassword'
};

// Hàm để test service accountExistedLookupService
const testAccountLookupService = async () => {
  try {
    // Gửi request POST đến service
    const response = await axios.get('http://localhost:3000/api/accountExistedLookup', testAccount);

    // In ra kết quả từ API
    console.log('Response data:', response.data);
  } catch (error) {
    // Nếu có lỗi, in ra lỗi
    if (error.response) {
      // Lỗi từ phía server (status code không phải 2xx)
      console.error('Error response data:', error.response.data);
      console.error('Status code:', error.response.status);
    } else if (error.request) {
      // Lỗi khi không có phản hồi từ server
      console.error('No response from server:', error.request);
    } else {
      // Lỗi thiết lập request
      console.error('Error setting up request:', error.message);
    }
  }
};

// Gọi hàm để test
testAccountLookupService();

