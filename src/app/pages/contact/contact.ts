import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-angular';

@Component({
  imports: [CommonModule, FormsModule, LucideAngularModule],
  selector: 'app-contact',
  styleUrl: './contact.css',
  templateUrl: './contact.html',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { Mail, Phone, MapPin, Send, CheckCircle }
    }
  ]
})
export class Contact {
  readonly Mail = Mail;
  readonly Phone = Phone;
  readonly MapPin = MapPin;
  readonly Send = Send;
  readonly CheckCircle = CheckCircle;

  isSubmitting = false;
  showToast = false;

  formData = {
    name: '',
    phone: '',
    email: '',
    subject: '',
    enquiry: ''
  };

  constructor(private cdr: ChangeDetectorRef) {}

  onSubmit() {
    if (!this.formData.name || !this.formData.email || !this.formData.enquiry) return;
    
    this.isSubmitting = true;
    
    // Wait for the 800ms fly-out animation to complete
    setTimeout(() => {
      // Icon has flown away, now show the toaster
      this.showToast = true;
      this.formData = { name: '', phone: '', email: '', subject: '', enquiry: '' };
      
      this.cdr.detectChanges();
      
      // Hide toast and bring icon back after 3 seconds
      setTimeout(() => {
        this.showToast = false;
        this.isSubmitting = false;
        this.cdr.detectChanges();
      }, 3000);
      
    }, 800);
  }
}
