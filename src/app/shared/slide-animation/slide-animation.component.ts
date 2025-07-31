import { Component, Input, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-slide-animation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slide-animation.component.html',
  styleUrls: ['./slide-animation.component.scss']
})
export class SlideAnimationComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() direction: 'left' | 'right' | 'up' | 'down' = 'left';
  @Input() delay: number = 0;
  @Input() duration: number = 800;
  @Input() distance: number = 80;
  @Input() triggerOnScroll: boolean = false;
  @Input() threshold: number = 0.1;

  private observer?: IntersectionObserver;
  isVisible: boolean = false;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    document.documentElement.style.setProperty('--slide-duration', `${this.duration}ms`);
    document.documentElement.style.setProperty('--slide-distance', `${this.distance}px`);
    
    if (!this.triggerOnScroll) {
      this.isVisible = true;
    }
  }

  ngAfterViewInit(): void {
    if (this.triggerOnScroll) {
      setTimeout(() => {
        this.setupIntersectionObserver();
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    if (!('IntersectionObserver' in window)) {
      this.isVisible = true;
      return;
    }

    const isMobile = window.innerWidth <= 768;
    
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !this.isVisible) {
            this.isVisible = true;
            this.observer?.disconnect();
          }
        });
      },
      {
        threshold: isMobile ? 0.05 : this.threshold,
        rootMargin: isMobile ? '0px 0px -5% 0px' : '0px 0px -10% 0px'
      }
    );

    this.observer.observe(this.elementRef.nativeElement);
  }

  getAnimationDelay(): string {
  if (this.triggerOnScroll) {
    return this.isVisible ? `${this.delay}ms` : '0ms';
  }
  return `${this.delay}ms`;
}
}
