import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-background',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './background.component.html',
  styleUrl: './background.component.scss'
})
export class BackgroundComponent {
  glows = [
    { class: 'glow-left-1', position: 'left' },
    { class: 'glow-left-2', position: 'left' },
    { class: 'glow-right-1', position: 'right' },
    { class: 'glow-right-2', position: 'right' },
    { class: 'glow-right-3', position: 'right' },
    { class: 'background', position: 'center' }

  ];
}
