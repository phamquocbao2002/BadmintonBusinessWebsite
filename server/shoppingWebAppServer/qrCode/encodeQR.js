const Jimp = require('jimp');
const QrCode = require('qrcode-reader');
const fs = require('fs');

// Đọc file ảnh QR code
Jimp.read('order_qrcode.png', (err, image) => {
  if (err) {
    console.error('Error reading image:', err);
    return;
  }

  // Khởi tạo QR Code reader
  const qr = new QrCode();

  // Giải mã QR code
  qr.callback = (error, result) => {
    if (error) {
      console.error('Error decoding QR code:', error);
      return;
    }

    try {
      // Giải mã chuỗi QR code thành JSON
      const jsonData = JSON.parse(result.result);
      console.log('Decoded JSON data:', jsonData);
    } catch (parseError) {
      console.error('Error parsing QR code result:', parseError);
    }
  };

  // Bắt đầu quá trình decode
  qr.decode(image.bitmap);
});
