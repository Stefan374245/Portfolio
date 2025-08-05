import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  hoveredLink: string | null = null;

  constructor(private router: Router) {}

  /**
   * Resets any hover states when navigating to legal notice
   */
  resetHoverState(): void {
    this.hoveredLink = null;
  }

  /**
   * Opens GitHub profile in new tab
   */
  openGitHub(): void {
    window.open('https://github.com/yourusername', '_blank');
  }

  /**
   * Opens email client
   */
  openEmail(): void {
    window.open('mailto:your.email@example.com', '_blank');
  }

  /**
   * Opens LinkedIn profile in new tab
   */
  openLinkedIn(): void {
    window.open('https://linkedin.com/in/yourprofile', '_blank');
  }
}