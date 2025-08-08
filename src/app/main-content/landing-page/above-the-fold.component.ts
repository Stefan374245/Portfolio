import { Component, OnInit, Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Translation } from '../../shared/interfaces/translation.interface';

import { SlideAnimationComponent } from '../../shared/slide-animation/slide-animation.component';

interface SocialLink {
  url: string;
  icon: string;
  alt: string;
  ariaLabel: string;
  target?: string; 
  rel?: string;
}

@Component({
  selector: 'app-above-the-fold',
  standalone: true,
  imports: [CommonModule, SlideAnimationComponent, RouterLink], 
  templateUrl: './above-the-fold.component.html',
  styleUrl: './above-the-fold.component.scss'
})
export class AboveTheFoldComponent implements OnInit {
    @Input() translation!: Translation['sections']['hero'];

  emailAddress = 'info@stefan-helldobler.de';
  
  socialLinks: SocialLink[] = [
    {
      url: 'https://github.com/Stefan374245',
      icon: 'assets/icons/hero-icons/social-icons/github.png',
      alt: 'GitHub icon',
      ariaLabel: 'Visit my GitHub profile',
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    {
      url: 'mailto:info@stefan-helldobler.de',
      icon: 'assets/icons/hero-icons/social-icons/mail.png',
      alt: 'Email icon',
      ariaLabel: 'Send me an email'
    },
    {
      url: 'https://linkedin.com',
      icon: 'assets/icons/hero-icons/social-icons/linkedin.png',
      alt: 'LinkedIn icon',
      ariaLabel: 'Visit my LinkedIn profile',
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  ];

  constructor() { }

  ngOnInit(): void { }
}
