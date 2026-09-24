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

  async placeOrder() {
    this.isProcessing = true;

    // Format Cart Items
    const cartItems = this.productService.cart();
    let cartTotalValue = 0;
    
    const itemsFormatted = cartItems.map(item => {
      const basePrice = item.product.discountPrice || item.product.price;
      let customCharge = 0;
      if (item.options) {
        if (item.options.fit && item.options.fit !== 'Regular') customCharge += 150;
        if (item.options.length === 'Maxi') customCharge += 200;
      }
      const itemTotalPrice = (basePrice + customCharge) * item.quantity;
      cartTotalValue += itemTotalPrice;

      // Get absolute URL for the image
      const absoluteImageUrl = item.product.image.startsWith('http') 
        ? item.product.image 
        : window.location.origin + '/' + item.product.image;

      return `${item.quantity}x ${item.product.name} (Size: ${item.options?.size || 'N/A'}, Color: ${item.options?.color || 'N/A'}, Fit: ${item.options?.fit || 'Regular'}, Length: ${item.options?.length || 'Regular'}) - ₹${itemTotalPrice}\nProduct Image Link: ${absoluteImageUrl}`;
    }).join('\n\n');

    const totalOrderValue = cartTotalValue + (this.delivery === 'express' ? 500 : 0);

    // Prepare FormData
    const formData = new FormData();
    formData.append('_subject', 'New Order Received! - CURVES');
    formData.append('_replyto', this.contact.email);
    formData.append('Name', this.address.fullName || this.contact.name);
    formData.append('Email', this.contact.email);
    formData.append('Phone', this.contact.phone || this.address.phone);
    formData.append('Shipping_Address', `${this.address.address}, ${this.address.city}, ${this.address.state} - ${this.address.pincode}`);
    formData.append('Delivery_Method', this.delivery);
    formData.append('Payment_Method', this.payment);
    formData.append('Order_Total', `₹${totalOrderValue}`);
    formData.append('Items_Ordered', itemsFormatted);

    // Attach product images
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      try {
        // Fetch the image as a blob
        const res = await fetch(item.product.image);
        const blob = await res.blob();
        // Append as a file attachment
        formData.append(`attachment_${i + 1}`, blob, `product_${i + 1}.jpg`);
      } catch (err) {
        console.error('Could not attach image', err);
      }
    }

    try {
      await fetch('https://formsubmit.co/ajax/madeforyou4343@gmail.com', {
        method: 'POST',
        body: formData
      });
    } catch (error) {
      console.error('Failed to send order email', error);
    }

    setTimeout(() => {
      // Clear cart and redirect after animation
      this.productService.cart.set([]);
      this.router.navigate(['/order-confirmation']);
    }, 2000);
  }
}
