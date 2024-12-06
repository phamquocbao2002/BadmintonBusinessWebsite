const express = require('express');
const connectDB = require('./config/MongoDB'); // Kết nối MongoDB
const paymentQRCodeCreationServiceRoutes = require('./routes/paymentQRCodeCreationServiceRoutes');
const payServiceRoutes = require('./routes/payServiceRoutes');
const loginServiceRoutes = require('./routes/loginServiceRoutes');

const cors = require('cors');
const app = express();

// Server lắng nghe trên port 3001
const PORT = process.env.PORT || 3001;

// Kết nối MongoDB
connectDB();

// Middleware để xử lý JSON
app.use(express.json());
app.use(cors({
    origin: 'http://127.0.0.1:5501', // Thay đổi thành địa chỉ nguồn của bạn
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api', paymentQRCodeCreationServiceRoutes);
app.use('/api', payServiceRoutes);
app.use('/api', loginServiceRoutes);
app.use(express.json());
app.use(express.static('public'));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
