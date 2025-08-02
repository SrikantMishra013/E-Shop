import { Component } from '@angular/core';
import { ThemeService } from 'src/app/core/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  currentSlide = 0;

  constructor(public themeService: ThemeService) {}

  slides = [
    {
      image: 'assets/men.png',
      title: "Men's Clothing",
    },
    {
      image: 'assets/women.png',
      title: "Women's Clothing",
    },
    {
      image: 'assets/electronic.png',
      title: 'Electronics',
    },
    {
      image: 'assets/jel.png',
      title: 'Jewelery',
    },
  ];

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
