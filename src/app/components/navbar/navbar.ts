import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LucideAngularModule, Search, Heart, User, ShoppingBag, Menu, X } from 'lucide-angular';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { Search, Heart, User, ShoppingBag, Menu, X }
    }
  ]
})
export class Navbar {
  productService = inject(ProductService);
  wishlist = this.productService.wishlist;
  cart = this.productService.cart;

  isScrolled = false;
  isMobileMenuOpen = false;
  
  readonly Search = Search;
  readonly Heart = Heart;
  readonly User = User;
  readonly ShoppingBag = ShoppingBag;
  readonly Menu = Menu;
  readonly X = X;

  navLinks = [
    { label: 'Home', path: '/' },
    { label: 'New Arrivals', path: '/new-arrivals' },
    { label: 'Dresses', path: '/category/dresses' },
    { label: 'Tops', path: '/category/tops' },
    { label: 'Bottoms', path: '/category/bottoms' },
    { label: 'Collections', path: '/collections' },
    { label: 'Offers', path: '/offers' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
