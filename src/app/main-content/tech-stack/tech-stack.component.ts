import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideAnimationComponent } from '../../shared/slide-animation/slide-animation.component';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule, SlideAnimationComponent],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss'
})
export class TechStackComponent {
  hoveredSkill: string | null = null;

  skills = [
    { name: 'css', displayName: 'CSS' },
    { name: 'javascript', displayName: 'JavaScript' },
    { name: 'typeScript', displayName: 'TypeScript' },
    { name: 'firebase', displayName: 'Firebase' },
    { name: 'git', displayName: 'Git' },
    { name: 'api', displayName: 'REST-API' },
    { name: 'material-design', displayName: 'Material Design' },
    { name: 'cont.-learning', displayName: 'Continually learning' }
  ];

  getSkillIconSrc(name: string): string {
    const base = 'assets/icons/skill-icons/';
    return this.hoveredSkill === name
      ? `${base}${name}-hovered.png`
      : `${base}${name}.png`;
  }
}