const Order = require('../models/Order');
const Product = require('../models/Product');
const OrderDetail = require('../models/OrderDetail');

const orderCreationService = async (req, res) => {
  let erridx =0;
  try {
    const orderIndex = await Order.countDocuments();
    let orderId = 'SI' + String(orderIndex + 1).padStart(4, '0'); // Cộng thêm 1 để không trùng ID
    let totalAmt = 0;
    
    const { customerAccountName, receiverAddress, receiverPhoneNumber, orderDate, payMethod, paymentStatus, products } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Invalid products format or empty products array' });
    }
    
    if (!customerAccountName || !orderDate || !payMethod || !paymentStatus) {
      return res.status(400).json({ message: 'Missing order information' });
    }

    for (const product of products) {
      const { productId, quantity } = product;
      
      if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({ message: `Invalid product or quantity for productId: ${productId}` });
      }
      erridx = 3;

      const foundProduct = await Product.findOne({ productId });
      if (!foundProduct) {
        return res.status(404).json({ message: `Product with ID ${productId} not found` });
      }

      const unitPrice = foundProduct.unitPrice;
      totalAmt += unitPrice * quantity;
      const newOrderDetail = new OrderDetail({
        orderId,
        productId,
        quantity
      });

      // Lưu document vào DB
      await newOrderDetail.save();
    }

    // B3: Tạo mới một document trong collection orders
    const newOrder = new Order({
      orderId,
      customerAccountName,
      receiverAddress,
      receiverPhoneNumber,
      orderDate,
      payMethod,
      paymentStatus
    });

    // Lưu order vào MongoDB
    await newOrder.save();

    // Trả về status success khi tạo thành công
    res.status(200).json({
      message: 'Đặt hàng thành công',
      orderId: orderId,
      totalAmt: totalAmt,
      status: 'success'
    });

  } catch (err) {
    console.log('Error creating order:', err);
    res.status(500).json({ message: 'Đơn hàng chưa được xác nhận thành công. Vui lòng thử lại !.', status: 'failed' });
  }
};

module.exports = { orderCreationService };
