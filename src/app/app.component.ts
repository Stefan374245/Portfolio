import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { MainContentComponent } from "./main-content/main-content.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { ImprintComponent } from './imprint/imprint.component';
import { TranslatePipe } from './shared/pipes/translate.pipe';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, MainContentComponent, FooterComponent, ImprintComponent, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}