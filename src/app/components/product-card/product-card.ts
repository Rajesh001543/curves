import { Component, Input, Output, EventEmitter, inject, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Heart, ShoppingBag, Eye, Star, ChevronLeft, ChevronRight } from 'lucide-angular';
import { ProductService } from '../../services/product.service';

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  discountPrice?: number;
  rating: number;
  image: string;
  images?: string[];
  isNew?: boolean;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { Heart, ShoppingBag, Eye, Star, ChevronLeft, ChevronRight }
    }
  ]
})
export class ProductCard implements OnDestroy {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();
  @Output() addToWishlist = new EventEmitter<Product>();
  @Output() quickView = new EventEmitter<Product>();

  readonly Heart = Heart;
  readonly ShoppingBag = ShoppingBag;
  readonly Eye = Eye;
  readonly Star = Star;
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;

  productService = inject(ProductService);
  cdr = inject(ChangeDetectorRef);

  isHovered = false;
  currentImageIndex = 0;
  slideInterval: any;

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  onMouseEnter() {
    this.isHovered = true;
    this.startAutoSlide();
  }

  onMouseLeave() {
    this.isHovered = false;
    this.stopAutoSlide();
    this.currentImageIndex = 0; // Optional: reset to first image when mouse leaves
  }

  startAutoSlide() {
    if (this.product && this.product.images && this.product.images.length > 1) {
      this.slideInterval = setInterval(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images!.length;
        this.cdr.detectChanges();
      }, 1500); // Change image every 1.5 seconds
    }
  }

  stopAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }

  get isWishlisted(): boolean {
    if (!this.product) return false;
    return this.productService.wishlist().some(p => p.id === this.product.id);
  }

  get hasDiscount(): boolean {
    return !!this.product.discountPrice && this.product.discountPrice < this.product.price;
  }

  toggleWishlist(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.addToWishlist.emit(this.product);
  }

  onAddToCart(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.addToCart.emit(this.product);
  }

  onQuickView(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.quickView.emit(this.product);
  }

  nextImage(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.product.images && this.product.images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
    }
  }

  prevImage(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    if (this.product.images && this.product.images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
    }
  }
}
