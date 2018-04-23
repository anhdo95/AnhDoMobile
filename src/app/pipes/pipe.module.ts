import { NgModule } from '@angular/core';
import { FilterProductCategoryPipe, FilterProductPricePipe } from './filter.pipe';
import { SortPricePipe } from './sort.pipe';

@NgModule({
  declarations: [
    FilterProductCategoryPipe,
    FilterProductPricePipe,
    SortPricePipe
  ],
  exports: [
    FilterProductCategoryPipe,
    FilterProductPricePipe,
    SortPricePipe
  ]
})
export class PipeModule {}
