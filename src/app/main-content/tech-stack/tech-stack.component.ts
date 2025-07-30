import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss'
})
export class TechStackComponent {
  hoveredSkill: string | null = null;

  skills = [
    { name: 'css', displayName: 'CSS' },
    { name: 'javascript', displayName: 'JavaScript' },
    { name: 'typescript', displayName: 'TypeScript' },
    { name: 'firebase', displayName: 'Firebase' },
    { name: 'git', displayName: 'Git' },
    { name: 'rest-api', displayName: 'REST-API' },
    { name: 'material-design', displayName: 'Material Design' },
    { name: 'continually-learning', displayName: 'Continually learning' }
  ];

  getSkillIconSrc(name: string): string {
    const base = 'assets/icons/skill-icons/';
    return this.hoveredSkill === name
      ? `${base}${name}-hovered.png`
      : `${base}${name}.png`;
  }
}