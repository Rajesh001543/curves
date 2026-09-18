import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <app-navbar></app-navbar>
    <main class="min-h-screen pt-20">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
})
export class App {
  title = 'made-for-you';
}
