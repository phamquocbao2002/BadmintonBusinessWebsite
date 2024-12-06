const QRCode = require('qrcode');

// API paymentQRCodeCreationService để tạo mã QR từ dữ liệu JSON
const paymentQRCodeCreationService = async (req, res) => {
  try {
    // B1: Lấy dữ liệu JSON từ request body
    const jsonData = req.body;

    // B2: Tạo mã QR từ dữ liệu JSON
    const qrString = await QRCode.toDataURL(JSON.stringify(jsonData));

    // Trả về client chuỗi mã QR và status success
    res.status(201).json({
      qrCode: qrString,
      status: 'success'
    });
  } catch (err) {
    console.error('Error generating QR code:', err);
    // Trả về status failed nếu có lỗi
    res.status(500).json({
      message: 'Failed to generate QR code',
      status: 'failed'
    });
  }
};

module.exports = { paymentQRCodeCreationService };
