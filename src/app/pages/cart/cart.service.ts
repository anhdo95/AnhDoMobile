import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { ConfigService } from '../../services/config.service';
import { LoadingBarService } from '../../services/loading-bar.service';
import { ToastrService } from 'ngx-toastr';
import { Cart } from '../../models/cart';

@Injectable()
export class CartService {
  apiStatus: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private configService: ConfigService,
    private loadingService: LoadingBarService,
    private toastr: ToastrService) {
    this.apiStatus = this.configService.get('status');
  }

  getCart(callback: (cart: Cart) => void): void {
    this.loadingService.start();
    const cart = this.configService.get('APIs').cart;
    const api = `${cart.list}?cartId=${localStorage.getItem(cart.cartIdToken)}`;
    this.apiService.get(api).subscribe(
      res => {
        if (res.Status === this.apiStatus.success) {
          const results = res.References.Results;
          callback(new Cart(results.CartItems, results.CartTotalPrice));
        } else if (res.Status === this.apiStatus.error) {
          this.toastr.error(res.StatusMessage, 'Error Message!');
        }
        this.loadingService.stop();
      }, error => {
        this.toastr.error(error.message || error, 'Error Message!');
      }
    );
  }

  updateCartQuantity(recordId: number, newQuantity: number, callback: (status) => void): void {
    this.loadingService.start();
    const api = this.configService.get('APIs').cart.changeQuantityFromCart;
    const params = { recordId, newQuantity };
    this.apiService.post(api, params).subscribe(
      res => {
        if (res.Status === this.apiStatus.success) {
            callback(true);
        } else if (res.Status === this.apiStatus.error) {
          this.toastr.error(res.StatusMessage, 'Error Message!');
        }
        this.loadingService.stop();
      }, error => {
        this.toastr.error(error.message || error, 'Error Message!');
      }
    );
  }

  removeItemFromCart(recordId: number, callback: (status) => void): void {
    this.loadingService.start();
    const api = `${this.configService.get('APIs').cart.removeFromCart}`;
    this.apiService.post(api, {recordId}).subscribe(
      res => {
        if (res.Status === this.apiStatus.success) {
            callback(true);
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
