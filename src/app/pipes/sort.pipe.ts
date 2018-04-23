import { Pipe, PipeTransform } from '@angular/core';
import { SortByPriceEnum } from './../enums/product';

@Pipe({
  name: 'sortPrice'
})
export class SortPricePipe implements PipeTransform {
  transform(value: any, type: SortByPriceEnum): any {
    if (!value || type === -1) {
      return value;
    }
    type = +type;
    switch (type) {
      case SortByPriceEnum.ASC:
        return value.sort((a, b) => this.sortPrice(a, b));
      case SortByPriceEnum.DESC:
        return value.sort((a, b) => this.sortPrice(b, a));
    }
  }

  sortPrice(a: any, b: any) {
    if (a.PromotionPrice) {
      a.Price = a.PromotionPrice;
    }
    if (b.PromotionPrice) {
      b.Price = b.PromotionPrice;
    }
    return a.Price - b.Price;
  }
}

