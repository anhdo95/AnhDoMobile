import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './details/details.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PaymentComponent } from './payment/payment.component';
import { CompleteOrderComponent } from './complete-order/complete-order.component';

@NgModule({
  imports: [
  ],
  declarations: [
    HomeComponent,
    ProductComponent,
    DetailsComponent,
    ContactComponent,
    LoginComponent,
    ShoppingCartComponent,
    PaymentComponent,
    CompleteOrderComponent
  ],
  exports: [HomeComponent,
    ProductComponent,
    DetailsComponent,
    ContactComponent,
    LoginComponent,
    ShoppingCartComponent,
    PaymentComponent,
    CompleteOrderComponent
  ]
})
export class PageModule { }
