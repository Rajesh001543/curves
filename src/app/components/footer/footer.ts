import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Instagram, Facebook, Twitter, Youtube } from 'lucide-angular';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  providers: [
    {
      provide: 'LucideIcons',
      useValue: { Instagram, Facebook, Twitter, Youtube }
    }
  ]
})
export class Footer {
  readonly Instagram = Instagram;
  readonly Facebook = Facebook;
  readonly Twitter = Twitter;
  readonly Youtube = Youtube;
}
