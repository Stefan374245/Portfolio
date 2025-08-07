import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideAnimationComponent } from '../../shared/slide-animation/slide-animation.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

interface IconData {
  name: string;
  text: string;
}

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, SlideAnimationComponent, TranslatePipe],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  hoveredIcon: string | null = null;

  icons = [
  {
    name: 'map-icon-blue',
    text: 'sections.about.points.location'
  },
  {
    name: 'light-bulb-blue',
    text: 'sections.about.points.passion'
  },
  {
    name: 'puzzle-blue',
    text: 'sections.about.points.collaboration'
  }
];

getIconSrc(name: string): string {
  const base = 'assets/icons/about-me-icons/';
  return this.hoveredIcon === name.replace('-blue', '')
    ? `${base}${name}-hovered.png`
    : `${base}${name}.png`;
}
}
