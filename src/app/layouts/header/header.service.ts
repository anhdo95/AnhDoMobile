import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { LoadingBarService } from '../../services/loading-bar.service';
import { ToastrService } from 'ngx-toastr';
import { Menu } from '../../models/menu';

@Injectable()
export class HeaderService {
  apiStatus: any;

  constructor(
    private apiService: ApiService,
    private configService: ConfigService,
    private loadingService: LoadingBarService,
    private toastr: ToastrService
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

}
