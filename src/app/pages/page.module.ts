import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './details/details.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PaymentComponent } from './payment/payment.component';
import { CompleteOrderComponent } from './complete-order/complete-order.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { FacebookModule } from 'ngx-facebook';
import { PipeModule } from './../pipes/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule.forRoot(),
    RecaptchaFormsModule,
    FacebookModule.forRoot(),
    PipeModule
  ],
  declarations: [
    HomeComponent,
    ProductComponent,
    DetailsComponent,
    ContactComponent,
    LoginComponent,
    ShoppingCartComponent,
    PaymentComponent,
    CompleteOrderComponent,
    NotFoundComponent,
  ],
  exports: [
    HomeComponent,
    ProductComponent,
    DetailsComponent,
    ContactComponent,
    LoginComponent,
    ShoppingCartComponent,
    PaymentComponent,
    CompleteOrderComponent,
    NotFoundComponent
  ],
  providers: [
    {
      provide: RECAPTCHA_LANGUAGE,
      useValue: 'vi'
    }
  ]
})
export class PageModule { }
