const Customer = require('../models/Customer'); // Import model Customer từ file model của bạn

const accountExistedLookupService = async (req, res) => {
  try {
    const { accountName, password } = req.body; // Lấy accountName và password từ request body

    if (!accountName || !password) {
      return res.status(400).json({ message: 'Account name and password are required.' });
    }

    // B1: Kiểm tra trong bảng customers
    const existingCustomer = await Customer.findOne({ accountName, password });

    // B2: Trả về kết quả kiểm tra
    if (existingCustomer) {
      return res.status(200).json({ message: 'Account exists.', accountExists: true });
    } else {
      return res.status(200).json({ message: 'Account does not exist.', accountExists: false });
    }
  } catch (err) {
    console.error('Error looking up account:', err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = { accountExistedLookupService };
