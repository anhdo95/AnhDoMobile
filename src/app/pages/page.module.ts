import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './details/details.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

@NgModule({
  imports: [
  ],
  declarations: [
    HomeComponent,
    ProductComponent,
    DetailsComponent,
    ContactComponent, LoginComponent, ShoppingCartComponent],
  exports: [HomeComponent,
    ProductComponent,
    DetailsComponent,
    ContactComponent,
    LoginComponent,
    ShoppingCartComponent]
})
export class PageModule { }
