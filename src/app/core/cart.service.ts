import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

const STORAGE_KEY = 'cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cart$ = this.cartItems.asObservable();

  constructor() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      this.cartItems.next(JSON.parse(saved));
    }
  }

  private updateStorage(items: CartItem[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    this.cartItems.next(items);
  }

  addToCart(product: Product) {
    const current = [...this.cartItems.value];
    const existing = current.find((ci) => ci.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      current.push({ product, quantity: 1 });
    }
    this.updateStorage(current);
  }

  removeFromCart(index: number) {
    const updated = [...this.cartItems.value];
    updated.splice(index, 1);
    this.updateStorage(updated);
  }

  updateQuantity(index: number, quantity: number) {
    const updated = [...this.cartItems.value];
    if (quantity <= 0) {
      updated.splice(index, 1);
    } else {
      updated[index].quantity = quantity;
    }
    this.updateStorage(updated);
  }

  getTotal(): number {
    return this.cartItems.value.reduce(
      (total, item) => total + item.product.price * 100 * item.quantity,
      0
    );
  }

  clearCart() {
    this.updateStorage([]);
  }
}
