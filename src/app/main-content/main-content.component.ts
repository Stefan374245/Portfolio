import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboveTheFoldComponent } from './landing-page/above-the-fold.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { TechStackComponent } from './tech-stack/tech-stack.component';
import { ProjectGalleryComponent } from './project-gallery/project-gallery.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { BackgroundComponent } from './background/background.component';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [CommonModule, AboveTheFoldComponent, AboutMeComponent, TechStackComponent, ProjectGalleryComponent, RecommendationComponent, ContactFormComponent, BackgroundComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
 constructor() {
    
  }
}
