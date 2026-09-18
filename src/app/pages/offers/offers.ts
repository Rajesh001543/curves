import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule, Tag, ArrowRight, Clock, Star } from 'lucide-angular';
import { ProductCard, Product } from '../../components/product-card/product-card';
import { ProductService } from '../../services/product.service';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, ProductCard, Button],
  templateUrl: './offers.html',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { Tag, ArrowRight, Clock, Star }
    }
  ]
})
export class Offers implements OnInit {
  productService = inject(ProductService);
  router = inject(Router);

  readonly Tag = Tag;
  readonly ArrowRight = ArrowRight;
  readonly Clock = Clock;
  readonly Star = Star;

  discountedProducts: Product[] = [];

  ngOnInit() {
    this.discountedProducts = this.productService.products().filter(
      p => p.discountPrice && p.discountPrice < p.price
    );
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
