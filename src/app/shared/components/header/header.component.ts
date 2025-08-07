import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideAnimationComponent } from '../../slide-animation/slide-animation.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslationService } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Language } from '../../interfaces/translation.interface';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SlideAnimationComponent, RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private translationService = inject(TranslationService);
  
  // Computed property für aktuelle Sprache
  get currentLang(): Language {
    return this.translationService.currentLanguage();
  }

  /**
   * Wechselt die Sprache der Anwendung
   */
  switchLanguage(lang: Language): void {
    this.translationService.setLanguage(lang);
  }
}