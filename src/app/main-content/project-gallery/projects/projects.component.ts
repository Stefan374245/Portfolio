import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../../shared/interfaces/project.interface';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { Translation } from '../../../shared/interfaces/translation.interface';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements OnInit {
  @Input() project!: Project;
  @Input() index!: number;
  @Input() translation?: Translation['sections']['portfolio'];
  @ViewChild('projectVideo') videoElement!: ElementRef<HTMLVideoElement>;

  hoveredProject: boolean = false;
  isReversed: boolean = false;
  videoLoaded: boolean = false;

  ngOnInit(): void {
    this.isReversed = this.index % 2 !== 0;
  }

  /**
   * Generiert den Übersetzungsschlüssel für die Projektbeschreibung
   */
  getDescriptionKey(): string {
    switch (this.project.id.toLowerCase()) {
      case 'el-pollo-loco':
        return 'projects.elPolloLoco.description';
      case 'pokedex':
        return 'projects.pokedex.description';
      default:
        const normalizedId = this.project.id.replace(/-/g, '').toLowerCase();
        return `projects.${normalizedId}.description`;
    }
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
      video.play().catch((error) => {
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
    if (window.innerWidth <= 768) {
      // MD Breakpoint
      // Auf Mobile: Alle Projects haben column-reverse
      return {};
    }

    // Desktop: Normale reverse logic
    return this.isReversed ? { 'flex-direction': 'row-reverse' } : {};
  }

  getTextStyles() {
    if (window.innerWidth <= 768) {
      // MD Breakpoint
      // Auf Mobile: Immer zentriert
      return {
        'align-items': 'center',
        'text-align': 'center',
      };
    }

    // Desktop: Normale alignment logic
    return this.isReversed
      ? { 'align-items': 'flex-start', 'text-align': 'left' }
      : { 'align-items': 'flex-end', 'text-align': 'right' };
  }

  getActionsStyles() {
    if (window.innerWidth <= 768) {
      // MD Breakpoint
      // Auf Mobile: Immer zentriert
      return { 'justify-content': 'center' };
    }

    // Desktop: Normale actions logic
    return this.isReversed
      ? { 'justify-content': 'flex-end' }
      : { 'justify-content': 'flex-start' };
  }
}
