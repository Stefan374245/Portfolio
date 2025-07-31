import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideAnimationComponent } from '../../shared/slide-animation/slide-animation.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, SlideAnimationComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {
  hoveredIcon: string | null = null;

  icons = [
  {
    name: 'map-icon-blue',
    text: ' Where are you located? Are you open to different ways of working, such as working remotely or even relocating?'
  },
  {
    name: 'light-bulb-blue',
    text: '   Show that you are open-minded. Are you enthusiastic about learning new technologies and continually improving your skills?'
  },
  {
    name: 'puzzle-blue',
    text: 'A brief description of your problem-solving approach. Do you learnfrom each challenge as you search for the most efficient or elegantsolution? You can include some keywords like: analytical thinking, creativity, persistence and collaboration.'
  }
];

getIconSrc(name: string): string {
  const base = 'assets/icons/about-me-icons/';
  return this.hoveredIcon === name.replace('-blue', '')
    ? `${base}${name}-hovered.png`
    : `${base}${name}.png`;
}
}
