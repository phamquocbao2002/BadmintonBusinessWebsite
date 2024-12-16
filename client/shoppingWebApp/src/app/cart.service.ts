import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartProductsQtySource = new BehaviorSubject<number>(0);
  currentCartProductsQty = this.cartProductsQtySource.asObservable();

  constructor(private http: HttpClient) { }

  updateCartProductsQty(newQty: number) {
    this.cartProductsQtySource.next(newQty);
  }

  getCartProductsQtyFromSession() {
    const cartProductsQty = sessionStorage.getItem('cartProductsQty');
    const qty = cartProductsQty ? parseInt(cartProductsQty, 10) : 0;
    this.updateCartProductsQty(qty);
  }

  updateSessionCartProductsQty() {
    const cartProductsQty = sessionStorage.getItem('cartProductsQty');
    const qty = cartProductsQty ? parseInt(cartProductsQty, 10) : 0;
    this.updateCartProductsQty(qty);
  }

  // Hàm lấy số lượng của productId trong giỏ hàng
  getProductQty(productId: string): number {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const product = cart.find((item: any) => item.productId === productId);
    return product ? product.quantity : 0;
  }

  // Hàm lấy thông tin sản phẩm kèm productAmt
  getUniqueProductOnCartInfo(productId: string): Promise<any> {
    return this.http.get<any>(`http://localhost:3000/api/product/${productId}`)
      .toPromise()
      .then(productInfo => {
        const productQty = this.getProductQty(productId);
        const productAmt = productInfo.unitPrice * productQty;
        return { ...productInfo, productAmt };
      })
      .catch(error => {
        console.error(`Error fetching product info for ${productId}:`, error);
        return null;
      });
  }

  // Hàm tính tổng giá trị giỏ hàng
  async getCartTotalAmt(): Promise<number> {
    let cartTotalAmt = 0;
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    
    for (const item of cart) {
      const productId = item.productId;
      const productInfo = await this.getUniqueProductOnCartInfo(productId);
      if (productInfo) {
        cartTotalAmt += productInfo.productAmt;
      }
    }

    return cartTotalAmt;
  }
}
