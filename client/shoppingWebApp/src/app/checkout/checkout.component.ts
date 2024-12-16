import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../cart.service';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  sellerPaymentAccountNumber = '1016951331';
  sellerPaymentAccountName = 'Công ty TNHH Cầu Lông Việt Nam';
  orderInfo: any = {
    customerAccountName: '',
    receiverAddress: '',
    receiverPhoneNumber: '',
    payMethod: '',
    orderDate: '',
    paymentStatus: '',
    products: [],
    ortherInfo: {}
  };
  cartTotalAmt: number = 0;
  currency: string = "đ";

  constructor(private http: HttpClient, private cartService: CartService, private contentService: ContentService) { }

  ngOnInit(): void {
    this.displayReviewOrderTotalAmt();
    this.displayReviewOrderProducts();
    this.orderInfo.products = this.getCartFromSession;
  }

  
  getCartFromSession(): any[] {
    const cart = sessionStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  displayReviewOrderTotalAmt(): void {
    this.cartService.getCartTotalAmt().then(totalAmt => {
      this.cartTotalAmt = totalAmt;
    });
  }

  setPayMethod(method: string): void {
    this.orderInfo.payMethod = method;
    if (method == "bankingTransfer") {
      this.orderInfo.ortherInfo = {
        'Thông tin chuyển khoản': '',
        'STK': this.sellerPaymentAccountNumber,
        'NGÂN HÀNG': 'Ngân hàng thương mại cổ phần A +Web Bank',
        'CHỦ TÀI KHOẢN': this.sellerPaymentAccountName
      };
    } else {
      this.orderInfo.ortherInfo = {

      };
    }
  }

  async payRequest() {
    let orderInfoBefoSend = JSON.parse(sessionStorage.getItem('orderInfoBefoSend') || '{}');
    const cart = this.getCartFromSession();
    orderInfoBefoSend = {
      customerAccountName: this.orderInfo.customerAccountName,
      receiverAddress: this.orderInfo.receiverAddress,
      receiverPhoneNumber: this.orderInfo.receiverPhoneNumber,
      orderDate: this.getLocalDate(),
      payMethod: this.orderInfo.payMethod,
      paymentStatus: 'processing',
      products: cart,
      ortherInfo: this.orderInfo.ortherInfo
    };

    sessionStorage.setItem('orderInfoBefoSend', JSON.stringify(orderInfoBefoSend));

    const sendCreateOrderRequest = async () => {
      if (orderInfoBefoSend.payMethod === 'cod' || orderInfoBefoSend.payMethod === 'bankingTransfer') {
        const response = await fetch('http://localhost:3000/api/orderCreation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderInfoBefoSend)
        });
        const responseData = await response.json();
        const responseMes = responseData.message;
        const oId = responseData.orderId;
        const orderAmt = responseData.totalAmt;
        const confirmedOrderInfo = {
          orderId: oId,
          customerAccountName: orderInfoBefoSend.customerAccountName,
          receiverAddress: orderInfoBefoSend.receiverAddress,
          receiverPhoneNumber: orderInfoBefoSend.receiverPhoneNumber,
          orderDate: orderInfoBefoSend.orderDate,
          payMethod: orderInfoBefoSend.payMethod,
          paymentStatus: orderInfoBefoSend.paymentStatus,
          products: orderInfoBefoSend.products,
          confirmedStatus: responseMes,
          orderAmt: orderAmt,
          ortherInfo: orderInfoBefoSend.ortherInfo
        };

        sessionStorage.setItem('confirmedOrderInfo', JSON.stringify(confirmedOrderInfo));
        this.goToDetailOrderReviewPage();
      } else {
        const requestBody = {
          receiverAccountNumber: this.sellerPaymentAccountNumber,
          receiverName: this.sellerPaymentAccountName,
          amount: await this.cartService.getCartTotalAmt(),
          partnerId: 'partner01'
        };

        const qrResponse = await fetch('http://localhost:3000/api/requestQRPayment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });

        const qrData = await qrResponse.json();
        const qrCode = qrData.qrCode;
        const status = qrData.status;
        const qrCodeId = qrData.qrCodeId;

        if (status === 'success' && qrCode) {
          this.displayPaymentQrCode(qrCode, qrCodeId, orderInfoBefoSend);
        } else {
          console.error('Failed to generate QR code');
        }
      }
    };


    await sendCreateOrderRequest();

  }

  orderCheckoutProducts: any[] = [];  
  async displayReviewOrderProducts() {
    const cart = this.getCartFromSession();

    for (const item of cart) {
      const productId = item.productId;
      const productInfo = await this.cartService.getUniqueProductOnCartInfo(productId);
      const quantity = item.quantity;
      if (productInfo) {
        const productNameWithQuantity = `${productInfo.productName} x ${quantity}`;
        const productAmt = productInfo.productAmt; 
        this.orderCheckoutProducts.push({
          productNameWithQuantity: productNameWithQuantity,
          productAmt: productAmt
        });
      }
    }
  }

  goToDetailOrderReviewPage() {
    this.contentService.setContentRouter("/order-review");
  }

  getLocalDate() {
    const today = new Date();
    return today.toISOString().split('T')[0]; 
  }


  displayPaymentQrCode(qrCodeString: string, qrCodeId: string, orderInfoBefoSend: any) {
    const modal = document.createElement('div');
    modal.id = "paymentModal";
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '10000';

    const qrImageContainer = document.createElement('div');
    qrImageContainer.id = 'qrImageCon';
    qrImageContainer.style.backgroundColor = '#fff';
    qrImageContainer.style.padding = '20px';
    qrImageContainer.style.borderRadius = '10px';
    qrImageContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    qrImageContainer.style.textAlign = 'center';
    const title = document.createElement('h2');
    title.id = "result"
    title.textContent = 'Vui lòng quét mã sau để thực hiện thanh toán';
    title.style.color = '#FF6600'; 
    title.style.marginBottom = '20px'; 
    const qrImage = document.createElement('img');
    qrImage.id = 'qrImage';
    qrImage.src = qrCodeString;
    qrImage.style.width = '200px';
    qrImage.style.height = '200px';
    qrImage.alt = 'QR Code for Payment';
    qrImageContainer.appendChild(title);
    qrImageContainer.appendChild(qrImage);
    const countdownText = document.createElement('p');
    countdownText.style.marginTop = '10px';
    countdownText.style.fontSize = '18px';
    countdownText.style.color = '#333';
    countdownText.innerHTML = `Thời gian thanh toán còn: <span id="minute" style="color: green;">2</span> phút <span id="second" style="color: red;">0</span> giây`;
    qrImageContainer.appendChild(countdownText);
    modal.appendChild(qrImageContainer);
    document.body.appendChild(modal);
    let countdown = 120;
    const interval = setInterval(() => {
      countdown--;
      const minutes = Math.floor(countdown / 60);
      const seconds = countdown % 60;

      const minuteElement = document.getElementById('minute');
      const secondElement = document.getElementById('second');
      if (minuteElement) {
        minuteElement.textContent = `${minutes}`;
      }
      if (secondElement) {
        secondElement.textContent = `${seconds}`;
      }

      if (countdown <= 0) {
        clearInterval(interval);
        document.body.removeChild(modal);
      } else {
        this.checkQRStatus(qrCodeId, orderInfoBefoSend);
      }
    }, 1000);
    modal.addEventListener('click', () => {
      clearInterval(interval);
      document.body.removeChild(modal);
    });
  }

  async checkQRStatus(qrCodeId: string, orderInfoBefoSend: any) {
    try {
      const response = await fetch('http://localhost:3000/api/lookupQRPaymentStatus', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qrCodeId: qrCodeId })
      });

      const data = await response.json();

      if (data.paymentStatus === 'processing') {
        this.checkQRStatus(qrCodeId, orderInfoBefoSend);
      } else if (data.paymentStatus === 'completed') {
        orderInfoBefoSend.paymentStatus = 'completed';

        // Hiển thị modal thông báo thanh toán thành công
        this.showPaymentSuccessModal();

        // Gọi API tạo order sau khi thanh toán thành công
        const response = await fetch('http://localhost:3000/api/orderCreation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderInfoBefoSend)
        });
        const responseData = await response.json();
        const responseMes = responseData.message;
        const oId = responseData.orderId;
        const orderAmt = responseData.totalAmt;
        const confirmedOrderInfo = {
          orderId: oId,
          customerAccountName: orderInfoBefoSend.customerAccountName,
          receiverAddress: orderInfoBefoSend.receiverAddress,
          receiverPhoneNumber: orderInfoBefoSend.receiverPhoneNumber,
          orderDate: orderInfoBefoSend.orderDate,
          payMethod: orderInfoBefoSend.payMethod,
          paymentStatus: orderInfoBefoSend.paymentStatus,
          products: orderInfoBefoSend.products,
          confirmedStatus: responseMes,
          orderAmt: orderAmt,
          ortherInfo: orderInfoBefoSend.ortherInfo
        };
        sessionStorage.setItem('confirmedOrderInfo', JSON.stringify(confirmedOrderInfo));
        this.goToDetailOrderReviewPage();
      }
    } catch (error) {
      console.error('Error checking QR payment status:', error);
    }
  }

  showPaymentSuccessModal() {
    const modal = document.getElementById('paymentModal');
    const res = document.getElementById('result');
    const qrImageContainer = document.getElementById('qrImageCon');
    const qrImage = document.getElementById('qrImage');
    if (modal && res && qrImageContainer && qrImage) {
      qrImageContainer.removeChild(qrImage);
      res.innerHTML = "THANH TOÁN THÀNH CÔNG";
      setTimeout(() => {
        document.body.removeChild(modal);
      }, 5000);
    }
  }
}
