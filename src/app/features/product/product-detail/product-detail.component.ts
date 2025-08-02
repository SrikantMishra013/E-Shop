import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/product.service';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/core/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Review {
  author: string;
  rating: number;
  comment: string;
}

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  product!: Product | undefined;

  reviews: Review[] = [
    {
      author: 'Alice Johnson',
      rating: 5,
      comment: 'Absolutely love this! Highly recommended.',
    },
    {
      author: 'Bob Smith',
      rating: 4,
      comment: 'Works well, though I wish the packaging was better.',
    },
    {
      author: 'Diana Lopez',
      rating: 5,
      comment: 'Exceeded my expectations. Would buy again!',
    },
    {
      author: 'Ethan Patel',
      rating: 2,
      comment: 'Not worth the price in my opinion.',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);

    this.productService.fetchProducts().subscribe((products) => {
      this.product = products.find((p) => p.id === id);
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product);

      this.snackBar.open('Product added to cart!', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['snackbar-success'],
      });
    }
  }
}
