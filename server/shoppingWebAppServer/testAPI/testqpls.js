const axios = require('axios');

// Dữ liệu request body để gửi tới service
const requestBody = {
    qrCodeId: 'exampleQrCodeId123',
    paymentStatus: 'completed', // Hoặc 'pending', 'failed', v.v.
};

// Gửi request POST đến API
axios.post('http://localhost:3000/api/QRPaymentStatusListennerService', requestBody)
    .then(response => {
        // Xử lý khi server trả về kết quả thành công
        console.log('Response status:', response.status);
        console.log('Response data:', response.data);
    })
    .catch(error => {
        // Xử lý khi có lỗi trong quá trình gửi request
        if (error.response) {
            // Lỗi từ server (response có status code ngoài 2xx)
            console.log('Error response status:', error.response.status);
            console.log('Error response data:', error.response.data);
        } else {
            // Lỗi khác, như không kết nối được server
            console.error('Error:', error.message);
        }
    });
