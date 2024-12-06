const QRCode = require('qrcode');

// Dữ liệu JSON ban đầu
const jsonData = {
  orderId: "SI1234",
  customerAccountName: "JohnDoe",
  orderDate: "2024-10-20",
  payMethod: "Credit Card",
  paymentStatus: "Paid"
};

// Chuyển đối tượng JSON thành chuỗi
const jsonString = JSON.stringify(jsonData);

// Tạo QR code từ chuỗi JSON
QRCode.toDataURL(jsonString, (err, url) => {
  if (err) {
    console.log("Error generating QR code: ", err);
  } else {
    console.log("QR code generated: ", url); // Dữ liệu base64 của QR code
  }
});

// Lưu QR code dưới dạng file PNG
QRCode.toFile('order_qrcode.png', jsonString, (err) => {
    if (err) {
      console.log("Error generating QR code: ", err);
    } else {
      console.log("QR code saved as order_qrcode.png");
    }
  });