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
import { Footer } from './sections/footer/footer';
import { End } from './sections/end/end';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    SideNav,
    TopNavbar,
    Hero,
    Projects,
    Story,
    Experience,
    Footer,
    End
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

  @ViewChild('contactSection', { static: false })
  contactSection!: ElementRef<HTMLElement>;

  ngAfterViewInit() {
    this.checkDarkMode();
    this.handleContactScroll();

     requestAnimationFrame(() => {
    this.handleContactScroll();
  });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.checkDarkMode();
    this.handleContactScroll();
      const scrollY = window.scrollY;

  this.showScrollTop = scrollY > 400;
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

private checkContactReveal() {
  if (!this.contactSection) return;

  const section = this.contactSection.nativeElement;
  const rect = section.getBoundingClientRect();

  const start = window.innerHeight * 0.9; // when it enters
  const end = window.innerHeight * 0.3;   // when it's centered

  if (rect.top <= start) {
    section.classList.add('show');
  }

  // 👇 OPTIONAL: allow reset when scrolling back up
  if (rect.top > window.innerHeight) {
    section.classList.remove('show');
  }
}

private handleContactScroll() {
  if (!this.contactSection) return;

  const section = this.contactSection.nativeElement;
  const rect = section.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const raw = (windowHeight - rect.top) / windowHeight;
  const progress = Math.min(Math.max(raw, 0), 1); // 🔥 clamp
  const x = progress * 180;

  const strips = section.querySelectorAll<HTMLElement>('.strip');

  strips.forEach((el) => {
    const x = progress * 140; // slightly safer range

    el.style.setProperty('--x', `${x}vw`);
  });
}

showScrollTop = false;


scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

}
