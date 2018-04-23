import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product, Category } from '../../models/product';
import { SortByPriceEnum, FilterByPriceEnum } from '../../enums/product';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  sortByPriceEnum = SortByPriceEnum;
  filterByPriceEnum = FilterByPriceEnum;

  filterQuery = {
    category: '',
    price: FilterByPriceEnum.All,
    sort: SortByPriceEnum.DESC
  };

  constructor(
    private productService: ProductService) {
  }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.productService.getProducts(products => {
      if (products) {
        this.products = products;
      }
    });
  }

  loadCategories() {
    this.productService.getCategories(categories => {
      if (categories) {
        this.categories = categories;
      }
    });
  }

  filterCategory(category: string) {
    this.filterQuery.category = category;
  }
}
