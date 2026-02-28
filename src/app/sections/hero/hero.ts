import { Component, HostListener, signal, ElementRef, inject } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {

  private el = inject(ElementRef);

  scrollProgress = signal(0);

  @HostListener('window:scroll')
  onScroll() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // how much hero has moved upward
    const progress = Math.min(
      Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
      1
    );

    this.scrollProgress.set(progress);
  }

  get imageStyle() {
    const speedMultiplier = 2;   // >1 = faster than text
    const translate = this.scrollProgress() * 500 * speedMultiplier;

    return {
      transform: `translateY(${-translate}px)`
    };
  }
}