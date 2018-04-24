import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { LoadingBarService } from '../../services/loading-bar.service';
import { ToastrService } from 'ngx-toastr';
import { Province, District } from '../../models/payment';

@Injectable()
export class PaymentService {
  apiStatus: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private configService: ConfigService,
    private loadingService: LoadingBarService,
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
}
