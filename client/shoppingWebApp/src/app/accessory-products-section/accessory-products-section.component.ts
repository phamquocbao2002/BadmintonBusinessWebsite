import { Component, ElementRef, Renderer2, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-accessory-products-section',
  templateUrl: './accessory-products-section.component.html',
  styleUrl: './accessory-products-section.component.css'
})
export class AccessoryProductsSectionComponent implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef, private http: HttpClient, private cartService: CartService) { }

  productCategoryList = [
    { name: 'Vợt cầu lông', image: 'vot.PNG' },
    { name: 'Giày cầu lông', image: 'vot.PNG' },
    { name: 'Bao vợt cầu lông', image: 'vot.PNG' },
    { name: 'Vợt cầu lông Yonex', image: 'vot.PNG' },
  ];
 
  products: any[] = []; 
  currentIndex: number = 0; 
  itemsPerPage: number = 6; 
  accessories_Ao: any[] = [];
  accessories_Balo: any[] = [];
  accessories_Giay: any[] = [];

  currentAccessoryType: string = 'Áo'; 
  currentAccessoryProducts: any[] = [];
  accessoryProductsCurrentIndex: number = 0;
  accessoryItemsPerPage: number = 6

  ngOnInit(): void {
    this.getProducts();
    this.loadAccessories();
  }

  
  getProducts() {
    const requestBody = { category: 'Vợt' };
    this.http.post<any[]>('http://localhost:3000/api/getProductInfoByCategory', requestBody)
      .pipe(
        tap((response) => {
          this.products = response; 
          console.log('Dữ liệu từ API:', response); 
        }),
        catchError((error) => {
          console.error('Lỗi khi gọi API:', error.message || error);
          return of([]); 
        })
      ).subscribe();
  }

  
  getVisibleMainProducts(): any[] {
    return this.products.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

 
  mainProductNextPage() {
    if (this.currentIndex + this.itemsPerPage < this.products.length) {
      this.currentIndex += this.itemsPerPage;
    }
  }

  
  mainProductPreviousPage() {
    if (this.currentIndex - this.itemsPerPage >= 0) {
      this.currentIndex -= this.itemsPerPage;
    }
  }
  ///Phần sản phẩm chính

  ///Phần phụ kiện
  loadAccessories() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post('http://localhost:3000/api/getProductInfoByCategory', { category: 'Áo' }, { headers: headers })
      .subscribe((data: any) => {
        this.accessories_Ao = data;
        this.updateCurrentProducts();
      });

    this.http.post('http://localhost:3000/api/getProductInfoByCategory', { category: 'Balo' }, { headers: headers })
      .subscribe((data: any) => {
        this.accessories_Balo = data;
      });

    this.http.post('http://localhost:3000/api/getProductInfoByCategory', { category: 'Giày' }, { headers: headers })
      .subscribe((data: any) => {
        this.accessories_Giay = data;
      });
  }

  updateCurrentProducts() {
    if (this.currentAccessoryType === 'Áo') {
      this.currentAccessoryProducts = this.accessories_Ao;
    } else if (this.currentAccessoryType === 'Balo') {
      this.currentAccessoryProducts = this.accessories_Balo;
    } else if (this.currentAccessoryType === 'Giày') {
      this.currentAccessoryProducts = this.accessories_Giay;
    }
  }

  changeAccessoryType(type: string) {
    this.currentAccessoryType = type;
    this.updateCurrentProducts();
    this.accessoryProductsCurrentIndex = 0; 
  }

  accessoryProductsPreviousPage() {
    if (this.accessoryProductsCurrentIndex > 0) {
      this.accessoryProductsCurrentIndex--;
    }
  }

  accessoryProductsNextPage() {
    if (this.accessoryProductsCurrentIndex + this.itemsPerPage < this.currentAccessoryProducts.length) {
      this.accessoryProductsCurrentIndex++;
    }
  }

  getVisibleAccessoryProductsProducts() {
    return this.currentAccessoryProducts.slice(this.accessoryProductsCurrentIndex, this.accessoryProductsCurrentIndex + this.itemsPerPage);
  }
  
  hoveredProductId: string | null = null;

  onMouseEnter(productId: string) {
    this.hoveredProductId = productId;
  }
  
  onMouseLeave(productId: string) {
    if (this.hoveredProductId === productId) {
      this.hoveredProductId = null;
    }
  }

  cartIconClickHandler(productId: string) {
    let cart = JSON.parse(sessionStorage.getItem('cart') || '[]');
    let cartProductsQty = parseInt(sessionStorage.getItem('cartProductsQty') || '0');

    const productInCart = cart.find((cartItem: any) => cartItem.productId === productId);

    if (productInCart) {
      productInCart.quantity += 1;
    } else {
      cart.push({ productId: productId, quantity: 1 });
    }

    cartProductsQty += 1;

    sessionStorage.setItem('cart', JSON.stringify(cart));
    sessionStorage.setItem('cartProductsQty', cartProductsQty.toString());

   
    this.cartService.updateCartProductsQty(cartProductsQty);
  }
  


  resetItemFocus(item: HTMLElement) {
    const itemImageDiv = item.children[0] as HTMLElement;
    const itemImage = itemImageDiv.children[0] as HTMLElement;
    this.renderer.setStyle(itemImage, 'transform', 'scale(1)');

    const cartIcon = itemImageDiv.querySelector('.onItemCartIcon') as HTMLElement;
    if (cartIcon) {
      this.renderer.removeChild(itemImageDiv, cartIcon);
    }
  }

  addToCartNotificationSender() {
    const notification = this.el.nativeElement.querySelector('#notification');
    this.renderer.addClass(notification, 'show');
    setTimeout(() => {
      this.renderer.removeClass(notification, 'show');
      this.renderer.addClass(notification, 'hide');
    }, 2000);
  }



  // Phần customer review
  currentIndexCustomerSection: number = 0;
  reviews = [
    {
      img: '/account.png',
      name: 'Darrell Steward',
      comment: 'I’ve never had a smoother experience shopping for a car online.........................................',
      rating: 5,
      date: '10/06/2024'
    },
    {
      img: '/account.png',
      name: 'Leslie Alexander',
      comment: 'The website made it so easy to find what I was looking for..................................................',
      rating: 4,
      date: '20/06/2024'
    },
    {
      img: '/account.png',
      name: 'Arlene McCoy',
      comment: 'Detailed profiles really helped me make confident choices!...................................................',
      rating: 5,
      date: '30/06/2024'
    },
  ];

  displayedReviews = [this.reviews[this.currentIndexCustomerSection]];

  nextReview() {
    this.currentIndexCustomerSection = (this.currentIndexCustomerSection + 1) % this.reviews.length;
    this.displayedReviews = [this.reviews[this.currentIndexCustomerSection]];
  }

  prevReview() {
    this.currentIndexCustomerSection = (this.currentIndexCustomerSection - 1 + this.reviews.length) % this.reviews.length;
    this.displayedReviews = [this.reviews[this.currentIndexCustomerSection]];
  }


}
