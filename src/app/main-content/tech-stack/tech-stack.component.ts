import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideAnimationComponent } from '../../shared/slide-animation/slide-animation.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { RouterLink } from '@angular/router';
import { Translation } from '../../shared/interfaces/translation.interface';
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule, SlideAnimationComponent, TranslatePipe, RouterLink],
  templateUrl: './tech-stack.component.html',
  styleUrl: './tech-stack.component.scss',
    animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-50%) translateY(10px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(-50%) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateX(-50%) translateY(10px)' }))
      ])
    ])
  ]
})
export class TechStackComponent {
  @Input() translation!: Translation['sections']['skills'];

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

  /**
   * Determines the appropriate icon source path for a given skill.
   * Returns the hovered version of the icon if the skill is currently being hovered
   * and has a hover variant available, otherwise returns the default icon.
   * 
   * @param name - The name of the skill to get the icon for
   * @returns The complete path to the skill icon image
   */
  getSkillIconSrc(name: string): string {
    const base = 'assets/icons/skill-icons/';
    const hasHoverIcon = this.skillsWithHoverIcons.includes(name);

    if (this.hoveredSkill === name && hasHoverIcon) {
      return `${base}${name}-hovered.png`;
    }

    return `${base}${name}.png`;
  }

  /**
   * Returns CSS classes for a skill icon based on whether it has hover functionality.
   * Skills without hover icons receive the 'no-hover-icon' class.
   * 
   * @param name - The name of the skill to get CSS classes for
   * @returns CSS class string for the skill icon
   */
  getSkillIconClasses(name: string): string {
    const hasHoverIcon = this.skillsWithHoverIcons.includes(name);
    return hasHoverIcon ? '' : 'no-hover-icon';
  }
}
