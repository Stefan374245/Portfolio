import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { MainContentComponent } from "./main-content/main-content.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { TranslatePipe } from './shared/pipes/translate.pipe';

/**
 * Root component of the portfolio application.
 * 
 * This component serves as the main container for the entire application,
 * providing the basic layout structure with header, main content area, and footer.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, MainContentComponent, FooterComponent, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  /**
   * Creates an instance of AppComponent.
   * The root component initializes the basic application structure.
   */
}