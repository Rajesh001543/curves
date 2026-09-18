import { Component, OnInit, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Filter, ChevronDown, SlidersHorizontal } from 'lucide-angular';
import { ProductCard, Product } from '../../components/product-card/product-card';
import { ProductService } from '../../services/product.service';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ProductCard, Button],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { Filter, ChevronDown, SlidersHorizontal }
    }
  ]
})
export class Shop implements OnInit {
  productService = inject(ProductService);
  
  readonly Filter = Filter;
  readonly ChevronDown = ChevronDown;
  readonly SlidersHorizontal = SlidersHorizontal;

  allProducts = this.productService.getProducts();
  
  selectedCategory = signal<string>('All');
  categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Party Wear', 'Casual Wear', 'Premium'];
  
  isMobileFiltersOpen = false;

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    if (category === 'All') return this.allProducts();
    return this.allProducts().filter(p => p.category === category);
  });

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  onAddToCart(product: Product) {
    this.productService.addToCart(product);
  }

  onAddToWishlist(product: Product) {
    this.productService.toggleWishlist(product);
  }

  toggleMobileFilters() {
    this.isMobileFiltersOpen = !this.isMobileFiltersOpen;
  }
}
