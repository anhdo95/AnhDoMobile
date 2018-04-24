import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { LoadingBarService } from '../../services/loading-bar.service';
import { DataService } from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';
import { Province, District, Customer, OrderComplete } from '../../models/payment';

@Injectable()
export class PaymentService {
  apiStatus: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private configService: ConfigService,
    private loadingService: LoadingBarService,
    private dataService: DataService,
    private toastr: ToastrService) {
    this.apiStatus = this.configService.get('status');
  }

  getProvinces(callback: (provinces) => void): void {
    this.loadingService.start();
    const api = this.configService.get('APIs').payment.provinces;
    this.apiService.get(api).subscribe(
      res => {
        if (res.Status === this.apiStatus.success) {
          let results: Province[] = res.References.Provinces.map(province => province);
          callback(results);
        } else if (res.Status === this.apiStatus.error) {
          this.toastr.error(res.StatusMessage, 'Error Message!');
        }
        this.loadingService.stop();
      }, error => {
        this.toastr.error(error.message || error, 'Error Message!');
      }
    );
  }

  getDistricts(provinceId: number, callback: (districts) => void): void {
    this.loadingService.start();
    const api = `${this.configService.get('APIs').payment.districts}?provinceId=${provinceId}`;
    this.apiService.get(api).subscribe(
      res => {
        if (res.Status === this.apiStatus.success) {
          let results: District[] = res.References.Districts.map(district => district);
          callback(results);
        } else if (res.Status === this.apiStatus.error) {
          this.toastr.error(res.StatusMessage, 'Error Message!');
        }
        this.loadingService.stop();
      }, error => {
        this.toastr.error(error.message || error, 'Error Message!');
      }
    );
  }

  saveOrder(customer: Customer): void {
    this.loadingService.start();
    const APIsConfig = this.configService.get('APIs');
    const api = APIsConfig.payment.processing;
    const params = {
      model: JSON.stringify(customer),
      cartId: localStorage.getItem(APIsConfig.cart.cartIdToken)
    };
    this.apiService.post(api, params).subscribe(
      res => {
        if (res.Status === this.apiStatus.success) {
          this.dataService.setCurrentCompleteOrder(res.References.Result);
          this.router.navigateByUrl('/thong-tin-dat-hang');
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
