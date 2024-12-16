import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { ContentService } from '../content.service';
@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrl: './header-menu.component.css'
})
export class HeaderMenuComponent implements OnInit {
  cartProductsQty: number = 0;
  constructor(private cartService: CartService, private router: Router, private contentService: ContentService) { }
  ngOnInit() {
    this.cartService.getCartProductsQtyFromSession();
    this.cartService.currentCartProductsQty.subscribe((qty: number) => {
      this.cartProductsQty = qty;
    });
  }
  goToCartReview() {
    this.contentService.setContentRouter('/cart-review');
  }

  goToHomePage() {
    this.contentService.setContentRouter('/home-page-content');
  }

  goToMainProductsSection() {
    this.contentService.setContentRouter('/main-products');
  }

  goToAccessoryProductsSection() {
    this.contentService.setContentRouter('/accessory-products');
  }

  goToContactPage() {
    this.contentService.setContentRouter('/contact');
  }

  goToStorePointsPage() {
   this.contentService.setContentRouter("/store");
  }

}
