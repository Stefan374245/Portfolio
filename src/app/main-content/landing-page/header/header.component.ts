import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideAnimationComponent } from '../../../shared/slide-animation/slide-animation.component';
import { NavigationService } from '../../../shared/services/navigation.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SlideAnimationComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  private navigationService = inject(NavigationService);
  
  hoveredLink: string | null = null;
  currentLang: string = 'EN';

  /**
   * Navigiert zu einer Sektion über den Navigation Service
   * @param sectionId - ID der Zielsektion
   */
  navigateToSection(sectionId: string): void {
    this.navigationService.navigateToSection(sectionId);
    this.hoveredLink = null;
  }

  /**
   * Wechselt die Sprache der Anwendung
   * @param lang - Zielsprache ('DE' oder 'EN')
   */
  switchLanguage(lang: string): void {
    this.currentLang = lang;
    console.log(`Language switched to: ${lang}`);
  }

  /**
   * Setzt den Hover-State für Navigationselemente
   * @param linkId - ID des gehöverten Links
   */
  setHoveredLink(linkId: string | null): void {
    this.hoveredLink = linkId;
  }
}