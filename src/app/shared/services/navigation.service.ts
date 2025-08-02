import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  
  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) {
    this.configureScrollBehavior();
  }

  /**
   * Navigiert zu einer bestimmten Sektion auf der Hauptseite
   * @param sectionId - Die ID der Zielsektion
   */
  navigateToSection(sectionId: string): void {
    this.router.navigate(['/'], { fragment: sectionId }).then((success) => {
      if (success) {
        setTimeout(() => {
          this.viewportScroller.scrollToAnchor(sectionId);
        }, 100);
      }
    });
  }

  scrollToTop(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  }

  private configureScrollBehavior(): void {
    this.viewportScroller.setOffset([0, 109]);
  }

  isOnMainPage(): boolean {
    return this.router.url === '/' || this.router.url.startsWith('/#');
  }

  getCurrentFragment(): string | null {
    return this.router.parseUrl(this.router.url).fragment;
  }
}