import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      [type]="type"
      [disabled]="disabled"
      (click)="onClick.emit($event)"
      class="relative group inline-flex items-center justify-center font-medium transition-all duration-300 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2"
      [ngClass]="[
        getVariantClasses(),
        getSizeClasses(),
        customClass,
        fullWidth ? 'w-full' : '',
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-0.5 active:translate-y-0'
      ]"
    >
      <span class="relative z-10 flex items-center gap-2">
        <ng-content></ng-content>
      </span>
      <div 
        *ngIf="!disabled && (variant === 'primary' || variant === 'secondary')"
        class="absolute inset-0 h-full w-full bg-white/20 scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100"
      ></div>
    </button>
  `
})
export class Button {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() disabled = false;
  @Input() fullWidth = false;
  @Input() customClass = '';

  @Output() onClick = new EventEmitter<MouseEvent>();

  getVariantClasses(): string {
    switch (this.variant) {
      case 'primary':
        return 'bg-burgundy text-white hover:bg-charcoal focus:ring-burgundy shadow-md hover:shadow-lg';
      case 'secondary':
        return 'bg-blush text-charcoal hover:bg-rose focus:ring-rose shadow-sm';
      case 'outline':
        return 'border-2 border-charcoal text-charcoal hover:bg-charcoal hover:text-white focus:ring-charcoal';
      case 'ghost':
        return 'text-gray-600 hover:text-burgundy hover:bg-blush/30 focus:ring-burgundy';
      default:
        return '';
    }
  }

  getSizeClasses(): string {
    switch (this.size) {
      case 'sm':
        return 'px-4 py-2 text-sm rounded-md';
      case 'md':
        return 'px-6 py-3 text-base rounded-md';
      case 'lg':
        return 'px-8 py-4 text-lg rounded-lg';
      case 'icon':
        return 'p-2 rounded-full';
      default:
        return 'px-6 py-3 text-base rounded-md';
    }
  }
}
