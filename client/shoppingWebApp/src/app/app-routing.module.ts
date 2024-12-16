
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartReviewComponent } from './cart-review/cart-review.component';
import { HomePageContentComponent } from './home-page-content/home-page-content.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailOrderReviewComponent } from './detail-order-review/detail-order-review.component';
import { MainProductsSectionComponent } from './main-products-section/main-products-section.component';
import { AccessoryProductsSectionComponent } from './accessory-products-section/accessory-products-section.component';
import { ContactComponent } from './contact/contact.component';
import { StorePointsComponent } from './store-points/store-points.component';

const routes: Routes = [
  { path: 'cart-review', component: CartReviewComponent },
  { path: 'home-page-content', component: HomePageContentComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'order-review', component: DetailOrderReviewComponent },
  { path: 'main-products', component: MainProductsSectionComponent },
  { path: 'accessory-products', component: AccessoryProductsSectionComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'store', component: StorePointsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Điều hướng mặc định
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

