import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Heart } from 'lucide-angular';
import { ProductService } from '../../services/product.service';
import { ProductCard, Product } from '../../components/product-card/product-card';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, ProductCard, Button],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { Heart }
    }
  ]
})
export class Wishlist {
  productService = inject(ProductService);
  readonly Heart = Heart;
  
  wishlistItems = this.productService.wishlist;

  onAddToCart(product: Product) {
    this.productService.addToCart(product);
  }

  onAddToWishlist(product: Product) {
    // This will toggle it off if it's already in the wishlist
    this.productService.toggleWishlist(product);
  }
}
