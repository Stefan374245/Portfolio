import { Component, Input, OnInit, OnDestroy, ChangeDetectionStrategy, HostBinding, HostListener, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Review {
  id: number;
  text: string;
  reviewerName: string;
  reviewerTitle: string;
  avatarUrl: string;
  rating?: number;
}

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-component]': '"reviews"',
    '[attr.data-auto-play]': 'autoPlay',
    '[attr.data-total-reviews]': 'reviews.length'
  }
})
export class ReviewComponent implements OnInit, OnDestroy {
  @Input() reviews: Review[] = [];
  @Input() autoPlay: boolean = true;
  @Input() autoPlayInterval: number = 5000;

  private currentIndexSignal = signal(0);
  private isPausedSignal = signal(false);

  currentReviewIndex = computed(() => this.currentIndexSignal());
  currentReview = computed(() => this.reviews[this.currentIndexSignal()] || this.getDefaultReview());
  indicators = computed(() => 
    this.reviews.map((_, index) => ({
      index,
      active: index === this.currentIndexSignal(),
      ariaLabel: `Go to review ${index + 1}`
    }))
  );

  private autoPlayTimer: any;
  private readonly TRANSITION_DURATION = 300;

  @HostBinding('attr.data-reviews-count') 
  get reviewsCount() { return this.reviews.length; }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.previousReview();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextReview();
        break;
      case ' ':
      case 'Spacebar':
        event.preventDefault();
        this.toggleAutoPlay();
        break;
      case 'Home':
        event.preventDefault();
        this.goToReview(0);
        break;
      case 'End':
        event.preventDefault();
        this.goToReview(this.reviews.length - 1);
        break;
    }
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (this.autoPlay) {
      this.pauseAutoPlay();
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.autoPlay && this.isPausedSignal()) {
      this.resumeAutoPlay();
    }
  }

  ngOnInit() {
    if (this.reviews.length === 0) {
      this.reviews = this.getDefaultReviews();
    }
    
    if (this.autoPlay && this.reviews.length > 1) {
      this.startAutoPlay();
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
  }

  nextReview() {
    if (this.reviews.length <= 1) return;
    
    const nextIndex = (this.currentIndexSignal() + 1) % this.reviews.length;
    this.goToReview(nextIndex);
  }

  previousReview() {
    if (this.reviews.length <= 1) return;
    
    const prevIndex = this.currentIndexSignal() === 0 
      ? this.reviews.length - 1 
      : this.currentIndexSignal() - 1;
    this.goToReview(prevIndex);
  }

  goToReview(index: number) {
    if (index >= 0 && index < this.reviews.length && index !== this.currentIndexSignal()) {
      this.currentIndexSignal.set(index);
      this.resetAutoPlay();
    }
  }

  private toggleAutoPlay() {
    if (this.isPausedSignal()) {
      this.resumeAutoPlay();
    } else {
      this.pauseAutoPlay();
    }
  }

  private startAutoPlay() {
    if (this.autoPlay && this.reviews.length > 1) {
      this.autoPlayTimer = setInterval(() => {
        if (!this.isPausedSignal()) {
          this.nextReview();
        }
      }, this.autoPlayInterval);
    }
  }

  private stopAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  private pauseAutoPlay() {
    this.isPausedSignal.set(true);
  }

  private resumeAutoPlay() {
    this.isPausedSignal.set(false);
  }

  private resetAutoPlay() {
    if (this.autoPlay) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  private getDefaultReview(): Review {
    return {
      id: 0,
      text: "No reviews available",
      reviewerName: "Unknown",
      reviewerTitle: "User",
      avatarUrl: "assets/images/default-avatar.png"
    };
  }

  private getDefaultReviews(): Review[] {
    return [
      {
        id: 1,
        text: "Michael really kept the team together with his great organization and clear communication. We wouldn't have got this far without his commitment.",
        reviewerName: "V. Schuster",
        reviewerTitle: "Team Partner",
        avatarUrl: "assets/images/reviewers/reviewer-1.jpg"
      },
      {
        id: 2,
        text: "Excellent collaboration and outstanding technical skills. The project was delivered on time and exceeded our expectations.",
        reviewerName: "A. Mueller",
        reviewerTitle: "Project Manager",
        avatarUrl: "assets/images/reviewers/reviewer-2.jpg"
      },
      {
        id: 3,
        text: "Professional approach and innovative solutions. Great attention to detail and user experience.",
        reviewerName: "S. Weber",
        reviewerTitle: "UX Designer",
        avatarUrl: "assets/images/reviewers/reviewer-3.jpg"
      }
    ];
  }
}