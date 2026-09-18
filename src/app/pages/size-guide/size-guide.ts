import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Ruler, Shirt, Columns, Info } from 'lucide-angular';

@Component({
  selector: 'app-size-guide',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './size-guide.html',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { Ruler, Shirt, Columns, Info }
    }
  ]
})
export class SizeGuide {
  readonly Ruler = Ruler;
  readonly Shirt = Shirt;
  readonly Columns = Columns;
  readonly Info = Info;

  activeTab: 'dresses' | 'tops' | 'bottoms' = 'dresses';
  measurementSystem: 'in' | 'cm' = 'in';

  setTab(tab: 'dresses' | 'tops' | 'bottoms') {
    this.activeTab = tab;
  }

  toggleMeasurement() {
    this.measurementSystem = this.measurementSystem === 'in' ? 'cm' : 'in';
  }

  // Helper method to convert inches to cm
  toCm(inches: number): string {
    return (inches * 2.54).toFixed(1);
  }
}
