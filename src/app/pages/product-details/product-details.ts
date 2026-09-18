import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { LucideAngularModule, Heart, Star, ChevronRight, Check } from 'lucide-angular';
import { ProductService } from '../../services/product.service';
import { Product } from '../../components/product-card/product-card';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, Button],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { Heart, Star, ChevronRight, Check }
    }
  ]
})
export class ProductDetails implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  productService = inject(ProductService);

  readonly Heart = Heart;
  readonly Star = Star;
  readonly ChevronRight = ChevronRight;
  readonly Check = Check;

  product = signal<Product | undefined>(undefined);
  
  // Customization Options
  sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  selectedSize = signal<string | null>(null);

  colors = [
    { name: 'Blush', class: 'bg-[#f9e8e8]' },
    { name: 'Burgundy', class: 'bg-[#800020]' },
    { name: 'Charcoal', class: 'bg-[#333333]' },
    { name: 'Cream', class: 'bg-[#fdfbf7]' }
  ];
  selectedColor = signal<string | null>(null);

  fits = ['Regular', 'Relaxed', 'Slim'];
  selectedFit = signal<string>('Regular');

  lengths = ['Mini', 'Midi', 'Maxi'];
  selectedLength = signal<string>('Midi');

  quantity = signal<number>(1);
  
  // Base price + customization
  customizationCharge = computed(() => {
    let charge = 0;
    if (this.selectedFit() !== 'Regular') charge += 1500;
    if (this.selectedLength() === 'Maxi') charge += 2000;
    return charge;
  });

  totalPrice = computed(() => {
    const p = this.product();
    if (!p) return 0;
    const basePrice = p.discountPrice || p.price;
    return (basePrice + this.customizationCharge()) * this.quantity();
  });

  isWishlisted = computed(() => {
    const p = this.product();
    if (!p) return false;
    return this.productService.wishlist().some(item => item.id === p.id);
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.product.set(this.productService.getProductById(id));
      }
      window.scrollTo(0, 0);
    });
  }

  setSize(size: string) {
    this.selectedSize.set(size);
  }

  setColor(color: string) {
    this.selectedColor.set(color);
  }

  setFit(fit: string) {
    this.selectedFit.set(fit);
  }

  setLength(length: string) {
    this.selectedLength.set(length);
  }

  increaseQuantity() {
    this.quantity.update(q => q + 1);
  }

  decreaseQuantity() {
    this.quantity.update(q => q > 1 ? q - 1 : 1);
  }

  addToCart() {
    const p = this.product();
    if (p && this.selectedSize() && this.selectedColor()) {
      this.productService.addToCart(p, this.quantity(), {
        size: this.selectedSize(),
        color: this.selectedColor(),
        fit: this.selectedFit(),
        length: this.selectedLength()
      });
      // In a real app we might show a toast here
      alert('Added to cart!');
    } else {
      alert('Please select a size and color.');
    }
  }

  buyNow() {
    const p = this.product();
    if (p && this.selectedSize() && this.selectedColor()) {
      this.productService.addToCart(p, this.quantity(), {
        size: this.selectedSize(),
        color: this.selectedColor(),
        fit: this.selectedFit(),
        length: this.selectedLength()
      });
      this.router.navigate(['/checkout']);
    } else {
      alert('Please select a size and color before buying.');
    }
  }

  toggleWishlist() {
    const p = this.product();
    if (p) {
      this.productService.toggleWishlist(p);
    }
  }
}
