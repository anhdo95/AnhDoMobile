import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product, Category } from '../../models/product';
import { SortByPriceEnum, FilterByPriceEnum } from '../../enums/product';
import { HelperService } from '../../services/helper.service';
import { ActivatedRoute } from '@angular/router';

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
    private productService: ProductService,
    private helperService: HelperService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    this.subcribeHashChanges();
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

  navigate(url: string, param?: any) {
    this.helperService.navigate(url, param);
  }
  subcribeHashChanges() {
    this.route.fragment.subscribe((hash: string) => {
      if (hash.toLowerCase() === 'apple') {
        this.filterQuery.category = 'apple';
      } else if (hash.toLowerCase() === 'samsung') {
        this.filterQuery.category = 'samsung';
      } else {
        this.filterQuery.category = '';
      }
    });
  }
}
