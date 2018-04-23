import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';
import { FilterByPriceEnum, PriceEnum } from './../enums/product';

@Pipe({
  name: 'filterProductCategory'
})
export class FilterProductCategoryPipe implements PipeTransform {
  transform(value: any, categoryName: string): any {
    if (!categoryName) {
      return value;
    }
    return value.filter((product: Product) => {
      if (product.CategoryName) {
        return product.CategoryName.toLowerCase().indexOf(categoryName.toLowerCase()) !== -1;
      }
    });
  }
}

@Pipe({
  name: 'filterProductPrice'
})
export class FilterProductPricePipe implements PipeTransform {
  transform(value: any, price: FilterByPriceEnum): any {
    if (!value) {
      return value;
    }
    return value.filter((product: Product) => {
      const currentPrice = product.PromotionPrice || product.Price;
      let from, to;
      switch (+price) {
        case FilterByPriceEnum.From3To6M:
          from = PriceEnum.ThreeM;
          to = PriceEnum.SixM;
          break;
        case FilterByPriceEnum.From6To10M:
          from = PriceEnum.SixM;
          to = PriceEnum.TenM;
          break;
        case FilterByPriceEnum.GreaterThan10M:
          from = PriceEnum.TenM;
          to = Number.MAX_VALUE;
          break;
        default:
          from = 0;
          to = Number.MAX_VALUE;
      }
      return currentPrice >= from && currentPrice <= to;
    });
  }
}
