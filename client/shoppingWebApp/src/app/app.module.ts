import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Thêm dòng này
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderMenuComponent } from './header-menu/header-menu.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageContentComponent } from './home-page-content/home-page-content.component';
import { ConsultationSignUpComponent } from './consultation-sign-up/consultation-sign-up.component';
import { CartReviewComponent } from './cart-review/cart-review.component';
import { HttpClientModule } from '@angular/common/http';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailOrderReviewComponent } from './detail-order-review/detail-order-review.component';
import { MainProductsSectionComponent } from './main-products-section/main-products-section.component';
import { AccessoryProductsSectionComponent } from './accessory-products-section/accessory-products-section.component';
import { ContactComponent } from './contact/contact.component';
import { StorePointsComponent } from './store-points/store-points.component'; // Thay HttpClient bằng HttpClientModule

@NgModule({
  declarations: [
    AppComponent,
    HeaderMenuComponent,
    FooterComponent,
    HomePageContentComponent,
    ConsultationSignUpComponent,
    CartReviewComponent,
    CheckoutComponent,
    DetailOrderReviewComponent,
    MainProductsSectionComponent,
    AccessoryProductsSectionComponent,
    ContactComponent,
    StorePointsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, // FormsModule để xử lý form
    HttpClientModule // Thêm HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
