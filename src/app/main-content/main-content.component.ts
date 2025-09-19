import { Component, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboveTheFoldComponent } from './above-the-fold/above-the-fold.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';
import { ProjectGalleryComponent } from './project-gallery/project-gallery.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { TranslationService } from '../shared/services/translation.service';
import { Translation } from '../shared/interfaces/translation.interface';

/**
 * Main content component that orchestrates all sections of the portfolio.
 * 
 * This component manages the main content area of the portfolio website,
 * including all major sections like about me, tech stack, projects, and contact form.
 * It handles translation management and reactive updates when the language changes.
 * 
 * @example
 * ```html
 * <app-main-content></app-main-content>
 * ```
 */
@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    CommonModule,
    AboveTheFoldComponent,
    AboutMeComponent,
    TechStackComponent,
    ProjectGalleryComponent,
    RecommendationComponent,
    ContactFormComponent,
],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
  /** Translation service for managing internationalization */
  private translationService = inject(TranslationService);
  
  /** Current translations for the component */
  translations: Translation;
  
  /**
   * Creates an instance of MainContentComponent.
   * Initializes translations and sets up reactive language change handling.
   */
  constructor() {
    this.translations = this.translationService.getCurrentTranslations();
    
    // React to language changes
    effect(() => {
      const currentLang = this.translationService.currentLanguage();
      this.translations = this.translationService.getCurrentTranslations();
    });
  }
}