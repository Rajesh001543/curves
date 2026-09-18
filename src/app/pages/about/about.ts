import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Scissors, Star, Heart, Leaf } from 'lucide-angular';

@Component({
  imports: [CommonModule, LucideAngularModule],
  selector: 'app-about',
  styleUrl: './about.css',
  templateUrl: './about.html',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { Scissors, Star, Heart, Leaf }
    }
  ]
})
export class About implements OnInit, OnDestroy {
  readonly Scissors = Scissors;
  readonly Star = Star;
  readonly Heart = Heart;
  readonly Leaf = Leaf;

  artImages = [
    'assets/IMG_6196.PNG',
    'assets/IMG_6197.PNG',
    'assets/IMG_6204.PNG'
  ];
  
  currentImageIndex = 0;
  imageInterval: any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    if (this.imageInterval) {
      clearInterval(this.imageInterval);
    }
  }

  startCarousel() {
    this.imageInterval = setInterval(() => {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.artImages.length;
      this.cdr.detectChanges();
    }, 4000); // Change image every 4 seconds
  }
}
