import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
export class AboveTheFoldComponent implements OnInit, AfterViewInit, OnDestroy {
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

  currentTitle = '';
  private titles = ['FRONTEND DEVELOPER', 'Web Developer', 'PROBLEM SOLVER', 'Creative Coder'];
  private currentIndex = 0;
  private typewriterInterval: any;

  /**
   * Initializes the AboveTheFoldComponent.
   * Sets up the component with default configuration.
   */
  constructor() { }

  /**
   * Component initialization lifecycle hook.
   * Currently no initialization logic implemented.
   */
  ngOnInit(): void { 
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.startTypewriterAnimation();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }
  }

  private startTypewriterAnimation() {
    let isDeleting = false;
    let currentText = '';
    let charIndex = 0;

    this.typewriterInterval = setInterval(() => {
      const fullText = this.titles[this.currentIndex];

      if (!isDeleting) {
        currentText = fullText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === fullText.length) {
          setTimeout(() => {
            isDeleting = true;
          }, 1000);
        }
      } else {
        currentText = fullText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          this.currentIndex = (this.currentIndex + 1) % this.titles.length;
        }
      }

      this.currentTitle = currentText;
    }, isDeleting ? 50 : 100);
  }
}
