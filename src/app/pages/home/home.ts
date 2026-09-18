import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { LucideAngularModule, ArrowRight, Star } from 'lucide-angular';
import { Button } from '../../components/button/button';
import { ProductCard, Product } from '../../components/product-card/product-card';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, Button, ProductCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { ArrowRight, Star }
    }
  ]
})
export class Home implements OnInit, OnDestroy {
  productService = inject(ProductService);
  router = inject(Router);
  cdr = inject(ChangeDetectorRef);

  readonly ArrowRight = ArrowRight;
  readonly Star = Star;

  newArrivals: Product[] = [];
  categories = [
    { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80', link: '/category/dresses' },
    { name: 'Tops', image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&auto=format&fit=crop&q=80', link: '/category/tops' },
    { name: 'Bottoms', image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&auto=format&fit=crop&q=80', link: '/category/bottoms' },
    { name: 'Party Wear', image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&auto=format&fit=crop&q=80', link: '/category/party' },
    { name: 'Premium', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80', link: '/collections' },
  ];

  reviews = [
    { name: 'Sarah M.', text: 'The dress looked even better than I expected. Absolutely loved the quality!', rating: 5 },
    { name: 'Emily R.', text: 'Perfect fit and the customization was exactly what I wanted. Highly recommended.', rating: 5 },
    { name: 'Jessica T.', text: 'Beautiful fabric and elegant design. Will definitely buy again from Made For You.', rating: 5 },
    { name: 'Amanda L.', text: 'Stunning collection! Every piece feels like it was tailor-made for me.', rating: 5 },
    { name: 'Rachel C.', text: 'The attention to detail is phenomenal. I felt like a queen wearing their gown.', rating: 5 }
  ];

  currentReviewIndex = 0;
  reviewInterval: any;

  ngOnInit() {
    this.newArrivals = this.productService.products().filter(p => p.isNew).slice(0, 4);
    // If not enough new arrivals, fill with other products
    if (this.newArrivals.length < 4) {
      const additional = this.productService.products().filter(p => !p.isNew).slice(0, 4 - this.newArrivals.length);
      this.newArrivals = [...this.newArrivals, ...additional];
    }

    this.startReviewCarousel();
  }

  ngOnDestroy() {
    if (this.reviewInterval) {
      clearInterval(this.reviewInterval);
    }
  }

  startReviewCarousel() {
    if (this.reviewInterval) {
      clearInterval(this.reviewInterval);
    }
    this.reviewInterval = setInterval(() => {
      this.currentReviewIndex = (this.currentReviewIndex + 1) % this.reviews.length;
      this.cdr.detectChanges();
    }, 3000); // Change review every 3 seconds
  }

  onAddToCart(product: Product) {
    this.productService.addToCart(product);
  }

  onAddToWishlist(product: Product) {
    this.productService.toggleWishlist(product);
  }

  onQuickView(product: Product) {
    this.router.navigate(['/product', product.id]);
  }
}
