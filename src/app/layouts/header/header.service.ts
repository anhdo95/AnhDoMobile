import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { LoadingBarService } from '../../services/loading-bar.service';
import { ToastrService } from 'ngx-toastr';
import { Menu } from '../../models/menu';
import { Product } from '../../models/product';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HeaderService {
  apiStatus: any;

  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    private loadingService: LoadingBarService,
    private toastr: ToastrService,
  ) {
    this.apiStatus = this.configService.get('status');
  }

  getMenus(callback: (menus) => void): void {
    const menuAPI = this.configService.get('APIs').menu;
    this.loadingService.start();
    this.apiService.get(menuAPI).subscribe(
      res => {
        if (res.Status === this.apiStatus.success) {
          let menus = new Array<Menu>();
          res.References.Menus.map(menu => {
            menus.push(menu);
          });
          callback(menus);
        } else if (res.Status === this.apiStatus.error) {
          this.toastr.error(res.StatusMessage, 'Error Message!');
        }
        this.loadingService.stop();
      }, error => {
        this.toastr.error(error.message || error, 'Error Message!');
      }
    );
  }

  searchProducts(term: string): Observable<Product[]> {
    const api = `${this.configService.get('APIs').product.search}?keyword=${term}`;
    this.loadingService.start();
    let products = this.apiService.get(api).map(res =>
      res.References.Products.map(product =>
        new Product(
          product.Id,
          product.Name,
          product.MetaTitle,
          product.Image,
          product.Price,
          product.PromotionPrice
        )
      ));
    this.loadingService.stop();
    return products;
  }
}
