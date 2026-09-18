import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, CheckCircle } from 'lucide-angular';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, Button],
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.css',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { CheckCircle }
    }
  ]
})
export class OrderConfirmation {
  readonly CheckCircle = CheckCircle;
  orderNumber = 'MFY-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
}
