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

  /**
   * Component initialization lifecycle hook.
   * Determines if the project layout should be reversed based on its index.
   */
  ngOnInit(): void {
    this.isReversed = this.index % 2 !== 0;
  }

  /**
   * Generiert die Video-URL basierend auf der Projekt-ID
   * @returns The complete path to the project preview video
   */
  getProjectVideoUrl(): string {
    const projectId = this.project.id.toLowerCase();
    return `assets/videos/${projectId}-preview.mp4`;
  }

  /**
   * Prüft ob für das aktuelle Projekt ein Preview-Video verfügbar ist
   * @returns True if a preview video is available for this project
   */
  hasPreviewVideo(): boolean {
    const validProjects = ['join', 'el-pollo-loco', 'pokedex'];
    return validProjects.includes(this.project.id.toLowerCase());
  }

  /**
   * Generiert den Übersetzungsschlüssel für die Projektbeschreibung
   * @returns The translation key for the project description
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

  /**
   * Handles mouse enter event on the project.
   * Sets hover state and starts video playback.
   */
  onMouseEnter(): void {
    this.hoveredProject = true;
    this.playVideo();
  }

  /**
   * Handles mouse leave event on the project.
   * Removes hover state and pauses video playback.
   */
  onMouseLeave(): void {
    this.hoveredProject = false;
    this.pauseVideo();
  }

  /**
   * Handles video loaded event.
   * Sets the video as loaded and resets playback position.
   *
   * @param event - The video load event
   */
  onVideoLoaded(event: Event): void {
    this.videoLoaded = true;
    const video = event.target as HTMLVideoElement;
    video.currentTime = 0;
  }

  /**
   * Starts video playback from the beginning.
   * Only plays if video element exists and is loaded.
   *
   * @private
   */
  private playVideo(): void {
    if (this.videoElement && this.videoLoaded) {
      const video = this.videoElement.nativeElement;
      video.currentTime = 0;
      video.play().catch((error) => {
        console.log('Video play failed:', error);
      });
    }
  }

  /**
   * Pauses video playback and resets to beginning.
   * Only operates if video element exists and is loaded.
   *
   * @private
   */
  private pauseVideo(): void {
    if (this.videoElement && this.videoLoaded) {
      const video = this.videoElement.nativeElement;
      video.pause();
      video.currentTime = 0;
    }
  }

  /**
   * Returns CSS styles for the project content container.
   * Applies reverse flex direction for odd-indexed projects on desktop.
   *
   * @returns CSS style object for content layout
   */
  getContentStyles() {
    if (window.innerWidth <= 768) {
      return {};
    }

    return this.isReversed ? { 'flex-direction': 'row-reverse' } : {};
  }

  /**
   * Returns CSS styles for the project text content.
   * Adjusts text alignment based on project index and screen size.
   *
   * @returns CSS style object for text alignment
   */
  getTextStyles() {
    if (window.innerWidth <= 768) {
      return {
        'align-items': 'center',
        'text-align': 'center',
      };
    }

    return this.isReversed
      ? { 'align-items': 'flex-start', 'text-align': 'left' }
      : { 'align-items': 'flex-end', 'text-align': 'right' };
  }

  /**
   * Returns CSS styles for the project action buttons.
   * Adjusts button alignment based on project index and screen size.
   *
   * @returns CSS style object for action button alignment
   */
  getActionsStyles() {
    if (window.innerWidth <= 768) {
      return { 'justify-content': 'center' };
    }

    return this.isReversed
      ? { 'justify-content': 'flex-end' }
      : { 'justify-content': 'flex-start' };
  }

  /**
   * Returns CSS class for the project video based on its index.
   * Applies special styling for the second project (index 1).
   *
   * @returns CSS class name for video styling
   */
  getProjectVideoClass(): string {
    return this.index === 1 ? 'large-video' : 'standard-video';
  }
}
