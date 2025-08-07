import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterLink } from '@angular/router';

import { SlideAnimationComponent } from '../../shared/slide-animation/slide-animation.component';


@Component({
  selector: 'app-above-the-fold',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SlideAnimationComponent, RouterLink], 
  templateUrl: './above-the-fold.component.html',
  styleUrl: './above-the-fold.component.scss'
})
export class AboveTheFoldComponent {
emailAddress = 'info@stefan-helldobler.de';
}
