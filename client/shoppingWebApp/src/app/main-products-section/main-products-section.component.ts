import { Component, ElementRef, Renderer2, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-main-products-section',
  templateUrl: './main-products-section.component.html',
  styleUrl: './main-products-section.component.css'
})
export class MainProductsSectionComponent implements OnInit {
  constructor(private renderer: Renderer2, private el: ElementRef, private http: HttpClient, private cartService: CartService) { }

  // Phần danh mục sản phẩm
  productCategoryList = [
    { name: 'Vợt cầu lông', image: 'vot.PNG' },
    { name: 'Giày cầu lông', image: 'vot.PNG' },
    { name: 'Bao vợt cầu lông', image: 'vot.PNG' },
    { name: 'Vợt cầu lông Yonex', image: 'vot.PNG' },
    // Add more products as needed
  ];
  // Phần danh mục sản phẩm



  // Phần main productsDisplaying section

  ///Phần sản phẩm chính
  products: any[] = []; // Mảng chứa dữ liệu sản phẩm từ API
  currentIndex: number = 0; // Chỉ số hiện tại để hiển thị 6 sản phẩm
  itemsPerPage: number = 6; // Số lượng sản phẩm hiển thị trên mỗi trang
  accessories_Ao: any[] = [];
  accessories_Balo: any[] = [];
  accessories_Giay: any[] = [];

  currentAccessoryType: string = 'Áo'; // Để theo dõi loại phụ kiện đang hiển thị
  currentAccessoryProducts: any[] = []; // Để lưu danh sách sản phẩm hiện tại
  accessoryProductsCurrentIndex: number = 0;
  accessoryItemsPerPage: number = 6

  ngOnInit(): void {
    this.getProducts();
    this.loadAccessories();
  }

  // Gọi API để lấy danh sách sản phẩm
  getProducts() {
    const requestBody = { category: 'Vợt' };
    this.http.post<any[]>('http://localhost:3000/api/getProductInfoByCategory', requestBody)
      .pipe(
        tap((response) => {
          this.products = response; // Xử lý thành công và gán dữ liệu vào mảng products
          console.log('Dữ liệu từ API:', response); // Kiểm tra dữ liệu từ API
        }),
        catchError((error) => {
          console.error('Lỗi khi gọi API:', error.message || error);
          return of([]); // Trả về mảng trống khi có lỗi, để tránh lỗi tiếp tục xảy ra trong các bước tiếp theo
        })
      ).subscribe();
  }

  // Lấy các sản phẩm hiển thị trên trang hiện tại
  getVisibleMainProducts(): any[] {
    return this.products.slice(this.currentIndex, this.currentIndex + this.itemsPerPage);
  }

  // Xử lý khi bấm nút "Next"
  mainProductNextPage() {
    if (this.currentIndex + this.itemsPerPage < this.products.length) {
      this.currentIndex += this.itemsPerPage;
    }
  }

  // Xử lý khi bấm nút "Previous"
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

    // Gọi API cho từng loại phụ kiện
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
    this.accessoryProductsCurrentIndex = 0; // Reset index khi thay đổi loại phụ kiện
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
  ///Phần phụ kiện

  //Phần xử lý hành vi cartIcon
  hoveredProductId: string | null = null;

  // Xử lý khi chuột vào
  onMouseEnter(productId: string) {
    this.hoveredProductId = productId;
  }

  // Xử lý khi chuột rời đi
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

    // Lưu giỏ hàng và số lượng vào sessionStorage
    sessionStorage.setItem('cart', JSON.stringify(cart));
    sessionStorage.setItem('cartProductsQty', cartProductsQty.toString());

    // Cập nhật số lượng sản phẩm giỏ hàng trong service
    this.cartService.updateCartProductsQty(cartProductsQty);
  }
  //Phần xử lý hành vi cartIcon


  // Hàm reset lại trạng thái khi mouseout
  resetItemFocus(item: HTMLElement) {
    const itemImageDiv = item.children[0] as HTMLElement;
    const itemImage = itemImageDiv.children[0] as HTMLElement;

    // Reset ảnh về kích thước ban đầu
    this.renderer.setStyle(itemImage, 'transform', 'scale(1)');

    const cartIcon = itemImageDiv.querySelector('.onItemCartIcon') as HTMLElement;
    if (cartIcon) {
      this.renderer.removeChild(itemImageDiv, cartIcon);
    }
  }

  // Hàm hiển thị thông báo khi thêm vào giỏ hàng
  addToCartNotificationSender() {
    const notification = this.el.nativeElement.querySelector('#notification');

    // Thêm class 'show' để hiện thông báo
    this.renderer.addClass(notification, 'show');

    // Sau 2 giây, ẩn thông báo
    setTimeout(() => {
      this.renderer.removeClass(notification, 'show');
      this.renderer.addClass(notification, 'hide');
    }, 2000);
  }
  // Phần main productsDisplaying section



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
    // Add more reviews as needed
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
  // Phần customer review


}
