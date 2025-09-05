import {
  Component,
  inject,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideAnimationComponent } from '../../slide-animation/slide-animation.component';
import {
  RouterLink,
  RouterLinkActive,
  RouterModule,
  Router,
} from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Language } from '../../interfaces/translation.interface';

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
export class HeaderComponent implements OnInit, OnDestroy {
  private translationService = inject(TranslationService);
  private router = inject(Router);

  isMobileMenuOpen: boolean = false;
  burgerMenuState: 'burger' | 'burger-transition' | 'burger-close-final' =
    'burger';

  // Active Section State
  activeSection: string = '';

  get currentLang(): Language {
    return this.translationService.currentLanguage();
  }

  /**
   * Wechselt die Sprache der Anwendung
   */
  switchLanguage(lang: Language): void {
    this.translationService.setLanguage(lang);
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;

    if (this.isMobileMenuOpen) {
      this.burgerMenuState = 'burger-close-final';
      this.toggleBodyScroll(true);
    } else {
      this.burgerMenuState = 'burger';
      this.toggleBodyScroll(false);
    }
  }

  /**
   * Navigiert zu einer Section und schließt das Mobile Menu
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
   * Verhindert/erlaubt das Scrollen des Body Elements
   */
  private toggleBodyScroll(disable: boolean): void {
    if (disable) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
    }
  }

  ngOnInit(): void {
    this.updateActiveSection();
  }

  ngOnDestroy(): void {
    // Cleanup wenn nötig
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.updateActiveSection();
  }

  /**
   * Bestimmt welche Section aktuell im Viewport ist
   */
  private updateActiveSection(): void {
    const sections = ['aboutMe', 'techStack', 'portfolio'];
    const scrollPosition = window.pageYOffset + 150; // Offset für bessere UX

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

    // Fallback: wenn ganz oben, keine aktive Section
    if (window.pageYOffset < 100) {
      this.activeSection = '';
    }
  }

  /**
   * Prüft ob eine Section aktuell aktiv ist
   */
  isActiveSection(section: string): boolean {
    return this.activeSection === section;
  }
}
