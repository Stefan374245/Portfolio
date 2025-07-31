import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideAnimationComponent } from '../../../shared/slide-animation/slide-animation.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, SlideAnimationComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  hoveredLink: string | null = null;
  currentLang: string = 'DE';

  constructor() {
    console.log('HeaderComponent loaded!');
  }


  switchLanguage(lang: string) {
    this.currentLang = lang;

  }
}