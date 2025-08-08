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

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projectList = projects;
    });
  }
   getSlideDirection(index: number): 'left' | 'right' {
    return index % 2 === 0 ? 'right' : 'left';
  }
  
  getAnimationDelay(index: number): number {
  return 200 + (index * 300);
}
}