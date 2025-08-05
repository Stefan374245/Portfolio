import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('projectVideo') videoElement!: ElementRef<HTMLVideoElement>;
  
  hoveredProject: boolean = false;
  isReversed: boolean = false;
  videoLoaded: boolean = false;

  ngOnInit(): void {
    this.isReversed = this.index % 2 !== 0;
  }

  onMouseEnter(): void {
    this.hoveredProject = true;
    this.playVideo();
  }

  onMouseLeave(): void {
    this.hoveredProject = false;
    this.pauseVideo();
  }

  onVideoLoaded(event: Event): void {
    this.videoLoaded = true;
    const video = event.target as HTMLVideoElement;
    video.currentTime = 0;
  }

  private playVideo(): void {
    if (this.videoElement && this.videoLoaded) {
      const video = this.videoElement.nativeElement;
      video.currentTime = 0;
      video.play().catch(error => {
        console.log('Video play failed:', error);
      });
    }
  }

  private pauseVideo(): void {
    if (this.videoElement && this.videoLoaded) {
      const video = this.videoElement.nativeElement;
      video.pause();
      video.currentTime = 0;
    }
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