import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  signal,
  ViewChild
} from '@angular/core';

import { SideNav } from './layout/side-nav/side-nav';
import { TopNavbar } from './layout/top-navbar/top-navbar';
import { Hero } from './sections/hero/hero';
import { Projects } from './sections/projects/projects';
import { Story } from './sections/story/story';
import { Experience } from './sections/experience/experience';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SideNav,
    TopNavbar,
    Hero,
    Projects,
    Story,
    Experience
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  protected readonly title = signal('portfolio');

  @ViewChild('secondMarquee', { static: false })
  secondMarquee!: ElementRef<HTMLElement>;

  @ViewChild('darkSection', { static: false })
  darkSection!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.checkDarkMode();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.checkDarkMode();
  }

  private checkDarkMode() {
    if (!this.secondMarquee) return;

    const rect = this.secondMarquee.nativeElement.getBoundingClientRect();
    const marqueeCenter = rect.top + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;

    const threshold = 80; // pixels buffer

    if (marqueeCenter <= viewportCenter - threshold) {
      document.body.classList.add('dark-mode');
    }

    if (marqueeCenter > viewportCenter + threshold) {
      document.body.classList.remove('dark-mode');
    }
  }
}
