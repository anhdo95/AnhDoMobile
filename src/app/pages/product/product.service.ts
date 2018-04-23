import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { LoadingBarService } from '../../services/loading-bar.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../models/product';

@Injectable()
export class ProductService {
  apiStatus: any;

  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    private loadingService: LoadingBarService,
    private toastr: ToastrService) {
    this.apiStatus = this.configService.get('status');
  }

  getProducts(callback: (products) => void): void {
    const api = this.configService.get('APIs').product.list;
    this.loadingService.start();
    this.apiService.get(api).subscribe(
      res => {
        if (res.Status === this.apiStatus.success) {
          let products = new Array<Product>();
          res.References.Products.map(product => {
            products.push(product);
          });
          callback(products);
        } else if (res.Status === this.apiStatus.error) {
          this.toastr.error(res.StatusMessage, 'Error Message!');
        }
        this.loadingService.stop();
      }, error => {
        this.toastr.error(error.message || error, 'Error Message!');
      }
    );
  }
}
