import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  HostListener,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideAnimationComponent } from '../../slide-animation/slide-animation.component';
import { RouterLink, RouterLinkActive, RouterModule, Router, NavigationEnd } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Language } from '../../interfaces/translation.interface';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    SlideAnimationComponent,
    RouterLink,
    RouterLinkActive,
    RouterModule,
    TranslatePipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy, AfterViewInit {
  private translationService = inject(TranslationService);
  private router = inject(Router);
  private readonly HEADER_HEIGHT = 109;

  isMobileMenuOpen: boolean = false;
  burgerMenuState: 'burger' | 'burger-transition' | 'burger-close-final' =
    'burger';

  private scrollPosition: number = 0;
  activeSection: string = '';

  /**
   * Gets the current language from the translation service.
   * @returns The currently selected language
   */
  get currentLang(): Language {
    return this.translationService.currentLanguage();
  }

  /**
   * Wechselt die Sprache der Anwendung
   * @param lang - The language to switch to
   */
  switchLanguage(lang: Language): void {
    this.translationService.setLanguage(lang);
  }

  /**
   * Toggles the mobile menu open/closed state and manages body scroll behavior.
   * When opening, saves current scroll position and disables body scroll.
   * When closing, restores scroll position and enables body scroll.
   */
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (this.isMobileMenuOpen) {
      this.scrollPosition = window.pageYOffset;
      this.burgerMenuState = 'burger-close-final';
      this.toggleBodyScroll(true);
    } else {
      this.burgerMenuState = 'burger';
      this.toggleBodyScroll(false);
    }
  }

  /**
   * Toggles body scroll behavior for mobile menu overlay.
   * @param disable - Whether to disable (true) or enable (false) body scrolling
   * @private
   */
  private toggleBodyScroll(disable: boolean): void {
    if (disable) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${this.scrollPosition}px`;
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, this.scrollPosition);
    }
  }

  /**
   * Navigiert zu einer Section und schließt das Mobile Menu
   * @param fragment - The section fragment to navigate to
   */
  navigateAndClose(fragment: string): void {
    this.router.navigate(['/'], { fragment });
    this.isMobileMenuOpen = false;
    this.burgerMenuState = 'burger';
    this.toggleBodyScroll(false);
  }

  /**
   * Schließt das Mobile Menu direkt
   */
  closeMobileMenu(): void {
    if (this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      this.burgerMenuState = 'burger';
      this.toggleBodyScroll(false);
    }
  }

  /**
   * Component initialization lifecycle hook.
   * Sets up initial active section detection and subscribes to router events for fragment navigation.
   */
  ngOnInit(): void {
    this.updateActiveSection();
    
    // Router Events überwachen für Fragment-Navigation
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => this.handleFragmentScroll(), 0);
      });
  }

  /**
   * After view init lifecycle hook.
   * Handles initial fragment scrolling after the component view has been initialized.
   */
  ngAfterViewInit(): void {
    // Initial Fragment handling nach dem Laden der Seite
    setTimeout(() => this.handleFragmentScroll(), 100);
  }

  /**
   * Component cleanup lifecycle hook.
   * Currently no cleanup logic implemented.
   */
  ngOnDestroy(): void {
  }

  /**
   * Handles fragment-based scrolling by parsing the current URL fragment
   * and smoothly scrolling to the corresponding element with header offset.
   * @private
   */
  private handleFragmentScroll(): void {
    const fragment = this.router.parseUrl(this.router.url).fragment;
    if (fragment) {
      const element = document.getElementById(fragment);
      if (element) {
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - this.HEADER_HEIGHT;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }

  @HostListener('window:scroll', [])
  /**
   * Handles the window scroll event by updating the active section indicator.
   * This method is typically called when the user scrolls the window.
   * It delegates the logic to {@link updateActiveSection} to determine which section is currently active.
   */
  onWindowScroll(): void {
    this.updateActiveSection();
  }

  /**
   * Updates the `activeSection` property based on the current scroll position.
   * Determines which section (from 'aboutMe', 'techStack', 'portfolio') is currently in view
   * by comparing the scroll position to the position of each section's DOM element.
   * If the scroll position is near the top of the page (less than 100px), clears the active section.
   *
   * @private
   */
  private updateActiveSection(): void {
    const sections = ['aboutMe', 'techStack', 'portfolio'];
    const scrollPosition = window.pageYOffset + this.HEADER_HEIGHT + 50;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = window.pageYOffset + rect.top;
        const elementBottom = elementTop + element.offsetHeight;

        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          this.activeSection = section;
          return;
        }
      }
    }
    if (window.pageYOffset < 100) {
      this.activeSection = '';
    }
  }

  /**
   * Determines if the specified section is currently active.
   *
   * @param section - The name of the section to check.
   * @returns `true` if the given section is active; otherwise, `false`.
   */
  isActiveSection(section: string): boolean {
    return this.activeSection === section;
  }
}