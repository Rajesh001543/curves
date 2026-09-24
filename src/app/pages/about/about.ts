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

  lookbookPages = [
    {
      image: 'assets/urvesphoto.PNG',
      title: 'Crafting Confidence,<br>One Stitch at a Time.',
      content: 'Founded on the belief that fashion is the ultimate form of self-expression. We don\'t just make clothes; we design moments.'
    },
    {
      image: 'assets/IMG_6196.PNG',
      title: 'Premium Fabrics,<br>Sustainable Choice.',
      content: 'We source the finest materials from around the globe, ensuring exceptional quality and minimizing our environmental impact.'
    },
    {
      image: 'assets/IMG_6197.PNG',
      title: 'Designed for<br>Every Curve.',
      content: 'Our silhouettes are tailored to celebrate real bodies, providing flattering fits that empower you every single day.'
    }
  ];
  
  currentLookbookIndex = 0;
  
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
      this.currentLookbookIndex = (this.currentLookbookIndex + 1) % this.lookbookPages.length;
      this.cdr.detectChanges();
    }, 3000); // Change image every 3 seconds
  }
}
