import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  HostListener
} from '@angular/core';

@Component({
  selector: 'app-story',
  standalone: true,
  templateUrl: './story.html',
  styleUrl: './story.scss'
})
export class Story implements AfterViewInit {

  @ViewChild('storySection', { static: true })
  storyRef!: ElementRef<HTMLElement>;

  @ViewChild('gdayRef', { static: true })
gdayRef!: ElementRef<HTMLElement>;

  activeWordIndex = -1;

floatingWords = [
  { small: 'Born in', big: 'INDIA', emoji: '🇮🇳' },
  { small: 'Raised with', big: 'CURIOSITY', emoji: '🌱' },
  { small: 'Living the', big: 'CODE', emoji: '💻' }
];

  ngAfterViewInit() {
    this.updateWord();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.updateWord();
  }

private updateWord() {
  const story = this.storyRef.nativeElement;
  const rect = story.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // If story not visible → hide
  if (rect.bottom <= 0 || rect.top >= viewportHeight) {
    this.activeWordIndex = -1;
    return;
  }

  const storyHeight = story.offsetHeight;

  // How much the story has been scrolled past viewport top
  const scrolled = Math.min(
    Math.max(-rect.top, 0),
    storyHeight
  );

  const progress = scrolled / storyHeight;

  if (progress < 0.13) {
    this.activeWordIndex = 0; // Born 🇮🇳
  } 
  else if (progress < 0.46) {
    this.activeWordIndex = 1; // Raised 🌱
  } 
  else {
    this.activeWordIndex = 2; // Living 💻
  }
}
}