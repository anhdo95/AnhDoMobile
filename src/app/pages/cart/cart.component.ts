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
}
