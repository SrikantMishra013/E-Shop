import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from 'src/app/core/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((items) => {
      this.cart = items;
      this.total = this.cartService.getTotal();
    });
  }

  remove(index: number) {
    this.cartService.removeFromCart(index);
  }

  changeQuantity(index: number, qty: number) {
    this.cartService.updateQuantity(index, qty);
  }
}
