import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, Package, Printer, CreditCard, CheckCircle2, AlertCircle } from 'lucide-angular';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-returns',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, Button],
  templateUrl: './returns.html',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { Search, Package, Printer, CreditCard, CheckCircle2, AlertCircle }
    }
  ]
})
export class Returns {
  readonly Search = Search;
  readonly Package = Package;
  readonly Printer = Printer;
  readonly CreditCard = CreditCard;
  readonly CheckCircle2 = CheckCircle2;
  readonly AlertCircle = AlertCircle;

  orderNumber: string = '';
  email: string = '';
  lookupStatus: 'idle' | 'loading' | 'success' | 'error' = 'idle';

  onLookupOrder(event: Event) {
    event.preventDefault();
    if (!this.orderNumber || !this.email) return;

    this.lookupStatus = 'loading';
    
    // Simulate API call
    setTimeout(() => {
      // Mock validation: success if order starts with 'ORD'
      if (this.orderNumber.toUpperCase().startsWith('ORD')) {
        this.lookupStatus = 'success';
      } else {
        this.lookupStatus = 'error';
      }
    }, 1500);
  }

  resetLookup() {
    this.lookupStatus = 'idle';
    this.orderNumber = '';
    this.email = '';
  }
}
