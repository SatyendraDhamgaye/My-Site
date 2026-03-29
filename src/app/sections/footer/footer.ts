import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrls: ['./footer.scss']
})
export class Footer implements AfterViewInit {

  @ViewChild('section', { static: false }) section!: ElementRef;

  ngAfterViewInit() {
    setTimeout(() => {

      const el = this.section.nativeElement;

      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;

      if (inView) {
        el.classList.add('show');
      }

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('show');
        }
      }, { threshold: 0.2 });

      observer.observe(el);

    }, 100);
  }
}