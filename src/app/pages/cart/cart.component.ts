import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
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
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.cartService.getCart(cart => {
      this.cart = cart;
    });
  }

  changeQuantity(index: number, number: number) {
    this.loading = true;
    const record = this.cart.CartItems[index];
    record.Quantity += number;
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
}
