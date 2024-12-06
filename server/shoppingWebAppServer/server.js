const express = require('express');
const connectDB = require('./config/MongoDB'); // Kết nối MongoDB
const getProductInfoByIdServiceRoutes = require('./routes/getProductInfoByIdServiceRoutes'); // Route sản phẩm
const orderCreationServiceRoutes = require('./routes/orderCreationServiceRoutes');
const accountExistedLookupServiceRoutes = require('./routes/accountExistedLookupServiceRoutes');
const QRPaymentStatusListennerServiceRoutes = require('./routes/QRPaymentStatusListennerServiceRoutes');
const requestQRPaymentServiceRoutes = require('./routes/requestQRPaymentServiceRoutes');
const QRPaymentStatusLookupServiceRoutes = require('./routes/QRPaymentStatusLookupServiceRoutes');
const getProductInfoByCategoryServiceRoutes = require('./routes/getProductInfoByCategoryServiceRoutes');
const app = express();
const cors = require('cors');
const port = 3000;

// Kết nối MongoDB
connectDB();

// Middleware để xử lý JSON
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4200' // Cho phép từ localhost:4200
}));

// Sử dụng route sản phẩm
app.use('/api', getProductInfoByIdServiceRoutes);
app.use('/api', orderCreationServiceRoutes);
app.use('/api', accountExistedLookupServiceRoutes);
app.use('/api', QRPaymentStatusListennerServiceRoutes);
app.use('/api', requestQRPaymentServiceRoutes);
app.use('/api', QRPaymentStatusLookupServiceRoutes);
app.use('/api', getProductInfoByCategoryServiceRoutes)

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
