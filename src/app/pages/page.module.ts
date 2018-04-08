import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  imports: [
  ],
  declarations: [HomeComponent, ProductComponent, DetailsComponent],
  exports: [HomeComponent, ProductComponent, DetailsComponent]
})
export class PageModule { }
