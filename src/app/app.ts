import { Component, signal } from '@angular/core';
import { SideNav } from './layout/side-nav/side-nav';
import { TopNavbar } from './layout/top-navbar/top-navbar';
import { Hero } from './sections/hero/hero';

@Component({
  selector: 'app-root',
  imports: [ SideNav, TopNavbar, Hero],
  templateUrl: './app.html',
  template: `
    <div class="app-container">
      <app-side-nav></app-side-nav>

      <div class="main-content">
        <app-top-navbar></app-top-navbar>
        <app-hero></app-hero>
      </div>
    </div>
  `,
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('portfolio');
}
