import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../services/translation.service';
import { SlideAnimationComponent } from '../slide-animation/slide-animation.component';

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [CommonModule, RouterModule, SlideAnimationComponent],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {
  constructor(public translationService: TranslationService) {}
}