import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './details/details.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  imports: [
  ],
  declarations: [HomeComponent, ProductComponent, DetailsComponent, ContactComponent],
  exports: [HomeComponent, ProductComponent, DetailsComponent, ContactComponent]
})
export class PageModule { }
