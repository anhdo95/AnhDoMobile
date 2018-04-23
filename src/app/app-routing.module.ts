import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { DetailsComponent } from './pages/details/details.component';
import { ContactComponent } from './pages/contact/contact.component';
import { LoginComponent } from './pages/login/login.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { CompleteOrderComponent } from './pages/complete-order/complete-order.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trang-chu', component: HomeComponent },
  { path: 'dien-thoai', component: ProductComponent },
  { path: 'dien-thoai/:MetaTitle', component: DetailsComponent },
  { path: 'lien-he', component: ContactComponent },
  { path: 'dang-nhap', component: LoginComponent },
  { path: 'gio-hang', component: ShoppingCartComponent },
  { path: 'thanh-toan', component: PaymentComponent },
  { path: 'thong-tin-dat-hang', component: CompleteOrderComponent },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
