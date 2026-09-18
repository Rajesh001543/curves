import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Trash2, ArrowRight, ShoppingBag } from 'lucide-angular';
import { ProductService } from '../../services/product.service';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, Button],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { Trash2, ArrowRight, ShoppingBag }
    }
  ]
})
export class Cart {
  productService = inject(ProductService);
  
  readonly Trash2 = Trash2;
  readonly ArrowRight = ArrowRight;
  readonly ShoppingBag = ShoppingBag;

  cartItems = this.productService.cart;

  subtotal = computed(() => {
    return this.cartItems().reduce((acc, item) => {
      let price = item.product.discountPrice || item.product.price;
      let customizationCharge = 0;
      if (item.options?.fit && item.options.fit !== 'Regular') customizationCharge += 1500;
      if (item.options?.length && item.options.length === 'Maxi') customizationCharge += 2000;
      return acc + (price + customizationCharge) * item.quantity;
    }, 0);
  });

  deliveryCharge = 500;
  
  total = computed(() => {
    return this.subtotal() > 0 ? this.subtotal() + this.deliveryCharge : 0;
  });

  removeItem(index: number) {
    this.productService.removeFromCart(index);
  }
}
