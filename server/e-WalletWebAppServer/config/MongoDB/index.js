const mongoose = require('mongoose');

// URL kết nối MongoDB (thay 'your_username', 'your_password', và 'your_cluster' bằng thông tin của bạn)
const dbURI = 'mongodb://localhost:27017/e-WalletWebApp';

// Kết nối đến MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1); // Thoát khi không thể kết nối
  }
};

module.exports = connectDB;
