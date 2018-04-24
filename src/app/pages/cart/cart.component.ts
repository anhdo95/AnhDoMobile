import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { HelperService } from './../../services/helper.service';
import { Cart } from './../../models/cart';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [CartService]
})
export class CartComponent implements OnInit {
  cart: Cart;
  loading: boolean;
  constructor(
    private cartService: CartService,
    private helperService: HelperService
  ) { }

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart(cart => {
      this.cart = cart;
      if (!cart.CartItems.length) {
        this.navigate('/');
      }
    });
  }

  changeQuantity(index: number, number: number) {
    const record = this.cart.CartItems[index];
    const newQuantity = record.Quantity + number;
    if (newQuantity < 1) {
      return;
    }
    this.loading = true;
    record.Quantity = newQuantity;
    this.cartService.updateCartQuantity(record.RecordId, record.Quantity, res => {
      if (res) {
        this.getCart();
        this.loading = false;
      }
    });
  }

  removeItem(index: number) {
    this.loading = true;
    const recordId = this.cart.CartItems[index].RecordId;
    this.cartService.removeItemFromCart(recordId, res => {
      if (res) {
        this.getCart();
        this.loading = false;
      }
    });
  }

  navigate(url: string, param?: any) {
    this.helperService.navigate(url, param);
  }
}
