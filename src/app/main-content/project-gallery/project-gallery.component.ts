import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects/projects.component';
import { ProjectService } from '../../shared/services/project.service';
import { Project } from '../../shared/interfaces/project.interface';
import { SlideAnimationComponent } from '../../shared/slide-animation/slide-animation.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { Translation } from '../../shared/interfaces/translation.interface';


@Component({
  selector: 'app-project-gallery',
  standalone: true,
  imports: [CommonModule, ProjectsComponent, SlideAnimationComponent, TranslatePipe],
  templateUrl: './project-gallery.component.html',
  styleUrl: './project-gallery.component.scss'
})
export class ProjectGalleryComponent implements OnInit {
  @Input() translation!: Translation['sections']['portfolio'];
  @Input() projects!: Translation['projects'];

  projectList: Project[] = [];

  /**
   * Initializes the ProjectGalleryComponent with the ProjectService dependency.
   * @param projectService - Service for managing project data
   */
  constructor(private projectService: ProjectService) {}

  /**
   * Component initialization lifecycle hook.
   * Loads the project list from the project service and subscribes to updates.
   */
  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projectList = projects;
    });
  }

  /**
   * Determines the slide animation direction for a project based on its index.
   * Even-indexed projects slide from the right, odd-indexed from the left.
   * 
   * @param index - The index of the project in the list
   * @returns The slide direction ('left' or 'right')
   */
   getSlideDirection(index: number): 'left' | 'right' {
    return index % 2 === 0 ? 'right' : 'left';
  }
  
  /**
   * Calculates the animation delay for a project based on its index.
   * Creates a staggered animation effect with increasing delays.
   * 
   * @param index - The index of the project in the list
   * @returns The animation delay in milliseconds
   */
  getAnimationDelay(index: number): number {
  return 200 + (index * 300);
}
}