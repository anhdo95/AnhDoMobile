import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  imports: [
  ],
  declarations: [HomeComponent, ProductComponent],
  exports: [HomeComponent, ProductComponent]
})
export class PageModule { }
