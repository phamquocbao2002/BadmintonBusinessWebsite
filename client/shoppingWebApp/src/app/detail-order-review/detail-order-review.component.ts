import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-detail-order-review',
  templateUrl: './detail-order-review.component.html',
  styleUrls: ['./detail-order-review.component.css']
})
export class DetailOrderReviewComponent implements OnInit {
  confirmedOrderInfo: any = {
    orderId: '',
    customerAccountName: '',
    receiverAddress: '',
    receiverPhoneNumber: '',
    orderDate: '',
    payMethod: '',
    paymentStatus: '',
    products: [],
    confirmedStatus: '',
    orderAmt: '',
    ortherInfo: '',
  };

  constructor(private cartService: CartService, private contentService: ContentService) { }

  async ngOnInit() {
    // Get the confirmedOrderInfo JSON object from session storage
    const savedOrderInfo = sessionStorage.getItem('confirmedOrderInfo');
    if (savedOrderInfo) {
      this.confirmedOrderInfo = JSON.parse(savedOrderInfo);
    }

    for (let product of this.confirmedOrderInfo.products) {
      const productDetail = await this.getDetailProductInfo(product.productId);
      this.productDetails.push(productDetail);
    }
    sessionStorage.clear();
  }

  productDetails: Array<{ ProductNameWithQuantity: string, productAmt: number }> = [];
  // Hàm nàu trả về JSON gồm {"ProductNameWithQuantity": , "productAmt": }

  async getDetailProductInfo(productId: string): Promise<{ ProductNameWithQuantity: string, productAmt: number }> {
    const quantity = await this.cartService.getProductQty(productId);
    const productInfo = await this.cartService.getUniqueProductOnCartInfo(productId);

    const productNameWithQuantity = `${productInfo.productName} x ${quantity}`;
    const productAmt = productInfo.productAmt;

    return {
      ProductNameWithQuantity: productNameWithQuantity,
      productAmt: productAmt
    };
  }

  goToHomePage() {
    this.contentService.setContentRouter("/home-page-content");
  }

  displayOrtherInfo(): string {
    const ortherInfo = this.confirmedOrderInfo?.ortherInfo;
    if (ortherInfo && typeof ortherInfo === 'object') {
      return Object.entries(ortherInfo)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    }
    return 'Không có thông tin thêm';
  }
  
  getOrtherInfoEntries(): [string, any][] {
    const ortherInfo = this.confirmedOrderInfo?.ortherInfo;
    if (ortherInfo && typeof ortherInfo === 'object') {
      return Object.entries(ortherInfo);
    }
    return [];
  }
  
}
