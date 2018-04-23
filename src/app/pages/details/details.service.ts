import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { LoadingBarService } from '../../services/loading-bar.service';
import { ToastrService } from 'ngx-toastr';
import { ProductDetail, Related } from '../../models/product';

@Injectable()
export class DetailsService {
  apiStatus: any;

  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    private loadingService: LoadingBarService,
    private toastr: ToastrService) {
    this.apiStatus = this.configService.get('status');
  }

  getDetails(metaTitle: string, callback: (details) => void): void {
    const api = `${this.configService.get('APIs').product.detail}?metatitle=${metaTitle}`;
    this.loadingService.start();
    this.apiService.get(api).subscribe(
      res => {
        let references = res.References;
        if (res.Status === this.apiStatus.success) {
          let details: ProductDetail = references.Product;
          details.Spec = references.Specification;
          callback(details);
        } else if (res.Status === this.apiStatus.error) {
          this.toastr.error(res.StatusMessage, 'Error Message!');
        }
        this.loadingService.stop();
      }, error => {
        this.toastr.error(error.message || error, 'Error Message!');
      }
    );
  }

  getProductRelated(id: number, callback: (products) => void): void {
    const api = `${this.configService.get('APIs').product.related}/${id}`;
    this.loadingService.start();
    this.apiService.get(api).subscribe(
      res => {
        let references = res.References;
        if (res.Status === this.apiStatus.success) {
          let products = new Array<Related>();
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