import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideAnimationComponent } from '../../shared/slide-animation/slide-animation.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

import { Translation } from '../../shared/interfaces/translation.interface';

interface IconInfo {
  name: string;
  text: string;
  iconPath: string;
}

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [
    CommonModule, 
    SlideAnimationComponent, 
    TranslatePipe,

  ],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})

export class AboutMeComponent {
    @Input() translation!: Translation['sections']['about'];

  hoveredIcon: string | null = null;

 icons: IconInfo[] = [
    {
      name: 'map-icon',
      text: 'sections.about.points.location',
      iconPath: 'assets/icons/about-me-icons/map-icon-blue.png'
    },
    {
      name: 'light-bulb',
      text: 'sections.about.points.passion',
      iconPath: 'assets/icons/about-me-icons/light-bulb-blue.png'
    },
    {
      name: 'puzzle',
      text: 'sections.about.points.collaboration',
      iconPath: 'assets/icons/about-me-icons/puzzle-blue.png'
    }
  ];

  /**
   * Handles icon hover state changes.
   * Sets the hovered icon when mouse enters and clears it when mouse leaves.
   * 
   * @param iconName - The name of the icon being hovered
   * @param isHovering - Whether the icon is currently being hovered
   */
  onIconHover(iconName: string, isHovering: boolean): void {
    this.hoveredIcon = isHovering ? iconName.replace('-blue', '') : null;
  }

  /**
   * Returns the appropriate icon source path based on hover state.
   * Shows the hovered version of the icon when it's being hovered, otherwise shows default.
   * 
   * @param name - The name of the icon to get the source for
   * @returns The complete path to the icon image
   */
  getIconSrc(name: string): string {
    const base = 'assets/icons/about-me-icons/';
    return this.hoveredIcon === name.replace('-blue', '')
      ? `${base}${name}-hovered.png`
      : `${base}${name}.png`;
  }
}