import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/product.service';
import { Product } from 'src/app/models/product.model';
import { ThemeService } from 'src/app/core/theme.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filtered: Product[] = [];

  search = '';
  category = '';
  sort = '';
  maxPrice = 1000;
  minRating = 0;

  isLoading = true;
  pageSize = 8;
  page = 1;
  visibleProducts: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    public themeService: ThemeService
  ) {}

  ngOnInit(): void {
    this.productService.fetchProducts().subscribe((data) => {
      this.products = data;
      this.isLoading = false;
      this.applyFilters();
    });
  }

  applyFilters() {
    const results = this.products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(this.search.toLowerCase()) &&
          (!this.category || p.category === this.category) &&
          p.price <= this.maxPrice &&
          p.rating.rate >= this.minRating
      )
      .sort((a, b) => {
        if (this.sort === 'price-asc') return a.price - b.price;
        if (this.sort === 'price-desc') return b.price - a.price;
        if (this.sort === 'rating') return b.rating.rate - a.rating.rate;
        return 0;
      });

    this.filtered = results;
    this.page = 1;
    this.visibleProducts = this.filtered.slice(0, this.pageSize);
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const bottom = document.body.offsetHeight;

    if (scrollPosition >= bottom - 100) {
      this.loadMore();
    }
  }

  loadMore() {
    const start = this.page * this.pageSize;
    const nextItems = this.filtered.slice(start, start + this.pageSize);

    if (nextItems.length) {
      this.visibleProducts = [...this.visibleProducts, ...nextItems];
      this.page++;
    }
  }

  openProductDetails(id: number) {
    this.router.navigate(['product', id]);
  }
}
