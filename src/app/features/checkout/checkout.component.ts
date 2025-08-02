import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  formData: any = {
    name: '',
    address: '',
    city: '',
    zip: '',
    payment: '',
  };

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {
    const cart = localStorage.getItem('cart');
    this.cartItems = cart ? JSON.parse(cart) : [];

    const savedForm = localStorage.getItem('checkout');
    if (savedForm) {
      this.formData = JSON.parse(savedForm);
    }
  }

  getTotal(): number {
    return this.cartItems.reduce(
      (acc, item) => acc + item.product.price * item.quantity * 100,
      0
    );
  }

  saveForm(): void {
    localStorage.setItem('checkout', JSON.stringify(this.formData));
  }

  placeOrder(): void {
    if (
      !this.formData.name ||
      !this.formData.address ||
      !this.formData.city ||
      !this.formData.zip ||
      !this.formData.payment ||
      this.cartItems.length === 0
    ) {
      return;
    }
    this.saveForm();
    this.cartService.clearCart();
    this.router.navigate(['/thank-you']);
  }
}
