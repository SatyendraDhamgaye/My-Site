import {
  Component,
  ElementRef,
  HostListener,
  ViewChildren,
  QueryList,
  AfterViewInit
} from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects implements AfterViewInit {

  @ViewChildren('projectImage', { read: ElementRef })
  images!: QueryList<ElementRef<HTMLImageElement>>;

  @ViewChildren('projectTitle', { read: ElementRef })
  titles!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit() {
    setTimeout(() => this.handleScroll(), 0);
  }

  @HostListener('window:scroll')
  handleScroll() {
    const viewportHeight = window.innerHeight;

    this.images.forEach((imgRef) => {
      const img = imgRef.nativeElement;
      const rect = img.getBoundingClientRect();

      const centerOffset =
        rect.top + rect.height / 2 - viewportHeight / 2;

      const progress = centerOffset / viewportHeight;

      const scale = 1 + Math.abs(progress) * 0.35;
      img.style.transform = `scale(${scale})`;
    });

this.titles.forEach((titleRef) => {
  const title = titleRef.nativeElement;
  const rect = title.getBoundingClientRect();

  // How far title is from viewport center
  const centerOffset =
    rect.top + rect.height / 2 - viewportHeight / 2;

  const progress = centerOffset / viewportHeight;

  // Inverted + subtle drift
  const drift = -progress * 40;

  title.style.transform = `translateX(${drift}px)`;
});
  }
}