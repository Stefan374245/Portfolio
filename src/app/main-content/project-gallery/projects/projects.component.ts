import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../shared/interfaces/project.interface';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  @Input() project!: Project;
  @Input() index!: number;
  
  hoveredProject: boolean = false;
  isReversed: boolean = false;

  ngOnInit(): void {
    this.isReversed = this.index % 2 !== 0;
  }

  getContentStyles() {
    return {
      'flex-direction': this.isReversed ? 'row-reverse' : 'row'
    };
  }

  getTextStyles() {
    return {
      'align-items': this.isReversed ? 'flex-start' : 'flex-end',
      'text-align': this.isReversed ? 'left' : 'right'
    };
  }

  getActionsStyles() {
    return {
      'justify-content': this.isReversed ? 'flex-start' : 'flex-end'
    };
  }
}