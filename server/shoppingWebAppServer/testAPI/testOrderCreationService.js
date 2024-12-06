const axios = require('axios');

const testOrderCreation = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/orderCreation', 
      {
      customerAccountName: 'john_dcmèdff',
      receiverAddress: "shfdsjfhhsj",
      receiverPhoneNumber: "jsdgfjds",
      orderDate: '2024-10-20',
      payMethod: 'credit_card',
      paymentStatus: 'paid',
      products: [
        { productId: 'SPVOT01', quantity: 2 },
        { productId: 'PKGIAY01', quantity: 1 }
      ]
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
};

testOrderCreation();
