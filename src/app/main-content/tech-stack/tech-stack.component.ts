import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideAnimationComponent } from '../../shared/slide-animation/slide-animation.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule, SlideAnimationComponent, TranslatePipe, RouterLink],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss',
})
export class TechStackComponent {
  hoveredSkill: string | null = null;

  skillsWithHoverIcons = [
    'html',
    'css',
    'javascript',
    'typescript',
    'angular',
    'firebase',
    'git',
  ];

  skills = [
    { name: 'html', displayName: 'HTML' },
    { name: 'css', displayName: 'CSS' },
    { name: 'javascript', displayName: 'JavaScript' },
    { name: 'typescript', displayName: 'TypeScript' },
    { name: 'angular', displayName: 'Angular' },
    { name: 'firebase', displayName: 'Firebase' },
    { name: 'git', displayName: 'Git' },
    { name: 'scrum', displayName: 'Scrum' },
    { name: 'api', displayName: 'REST-API' },
    { name: 'material-design', displayName: 'Material Design' },
    { name: 'cont.-learning', displayName: 'Continually learning' },
  ];

  getSkillIconSrc(name: string): string {
    const base = 'assets/icons/skill-icons/';
    const hasHoverIcon = this.skillsWithHoverIcons.includes(name);

    if (this.hoveredSkill === name && hasHoverIcon) {
      return `${base}${name}-hovered.png`;
    }

    return `${base}${name}.png`;
  }

  getSkillIconClasses(name: string): string {
    const hasHoverIcon = this.skillsWithHoverIcons.includes(name);
    return hasHoverIcon ? '' : 'no-hover-icon';
  }
}
