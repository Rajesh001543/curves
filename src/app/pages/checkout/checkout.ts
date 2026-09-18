import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, ShieldCheck, Truck, CreditCard, Wallet, Info } from 'lucide-angular';
import { ProductService } from '../../services/product.service';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, Button],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { ShieldCheck, Truck, CreditCard, Wallet, Info }
    }
  ]
})
export class Checkout {
  productService = inject(ProductService);
  router = inject(Router);

  readonly ShieldCheck = ShieldCheck;
  readonly Truck = Truck;
  readonly CreditCard = CreditCard;
  readonly Wallet = Wallet;
  readonly Info = Info;

  step = 1;

  contact = { name: '', email: '', phone: '' };
  address = { fullName: '', address: '', city: '', state: '', pincode: '', phone: '' };
  delivery = 'standard';
  payment = 'cod';

  isProcessing = false;

  nextStep() {
    if (this.step < 4) this.step++;
  }

  placeOrder() {
    this.isProcessing = true;
    setTimeout(() => {
      // Clear cart and redirect after animation
      this.productService.cart.set([]);
      this.router.navigate(['/order-confirmation']);
    }, 2500);
  }
}
