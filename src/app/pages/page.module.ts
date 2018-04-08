import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './details/details.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
  ],
  declarations: [
    HomeComponent,
    ProductComponent,
    DetailsComponent,
    ContactComponent, LoginComponent],
  exports: [HomeComponent,
    ProductComponent,
    DetailsComponent,
    ContactComponent,
    LoginComponent]
})
export class PageModule { }
