import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContentService } from '../content.service';

@Component({
  selector: 'app-cart-review',
  templateUrl: './cart-review.component.html',
  styleUrls: ['./cart-review.component.css']
})
export class CartReviewComponent implements OnInit {
  cartItems: any[] = [];
  subTotal: number = 0;
  grandTotal: number = 0;
  currentPage: number = 0; 
  itemsPerPage: number = 4;
  constructor(private http: HttpClient, private contentService: ContentService) { 
  }

  ngOnInit(): void {
    const cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    this.loadCartItems(cart);

  }

  loadCartItems(cart: any[]): void {
    cart.forEach((cartItem) => {
      this.http.get<any>(`http://localhost:3000/api/product/${cartItem.productId}`)
        .subscribe((product) => {
          const item = {
            productId: cartItem.productId,
            productName: product.productName,
            mainImageURL: product.mainImageURL,
            unitPrice: product.unitPrice,
            quantity: cartItem.quantity
          };
          this.cartItems.push(item);
          this.updateTotals();
        });
    });
  }

  getTotalPrice(item: any): number {
    return item.unitPrice * item.quantity;
  }

  updateTotals(): void {
    this.subTotal = this.cartItems.reduce((acc, item) => acc + this.getTotalPrice(item), 0);
    this.grandTotal = this.subTotal;  // Có thể thêm phí giao hàng nếu cần
  }

  increaseQty(index: number): void {
    let cartProductsQty = parseInt(sessionStorage.getItem('cartProductsQty') || '0');
    this.cartItems[index].quantity++;
    this.updateCartInSession();
    this.updateTotals();
    cartProductsQty++;
    sessionStorage.setItem('cartProductsQty', cartProductsQty.toString());
  }

  decreaseQty(index: number): void {
    if (this.cartItems[index].quantity > 1) {
      let cartProductsQty = parseInt(sessionStorage.getItem('cartProductsQty') || '0');
      this.cartItems[index].quantity--;
      this.updateCartInSession();
      this.updateTotals();
      cartProductsQty--;
      sessionStorage.setItem('cartProductsQty', cartProductsQty.toString());
    }
  }

  updateCartInSession(): void {
    const updatedCart = this.cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity
    }));
    
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  }

  removeItem(index: number, quantity: number): void {
    this.cartItems.splice(index, 1);
    this.updateCartInSession();
    this.updateTotals();
    let cartProductsQty = parseInt(sessionStorage.getItem('cartProductsQty') || '0');
    cartProductsQty = cartProductsQty - quantity;
    sessionStorage.setItem('cartProductsQty', cartProductsQty.toString());
  }

  getCurrentPageItems() {
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.cartItems.slice(startIndex, endIndex);
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }


  nextPage() {
    if ((this.currentPage + 1) * this.itemsPerPage < this.cartItems.length) {
      this.currentPage++;
    }
  }

  goToHomePage() {
    this.contentService.setContentRouter('/home-page-content');
  }

  goToCheckoutPage() {
    this.contentService.setContentRouter('/checkout');
  }
}
