import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review/review.component';
import { Review } from '../../shared/interfaces/review.interface';
import { Translation } from '../../shared/interfaces/translation.interface';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, ReviewComponent],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.scss'
})
export class RecommendationComponent implements OnInit {
  @Input() reviews!: Translation['reviews'];
  
  reviewsList: Review[] = [
    {
      id: 1,
      textKey: "reviews.review1.text",
      reviewerName: "V. Schuster",
      reviewerTitle: "Team Partner",
      avatarUrl: "assets/images/reviews/avatar1.jpg"
    },
    {
      id: 2,
      textKey: "reviews.review2.text",
      reviewerName: "Sarah Johnson", 
      reviewerTitle: "Senior Developer",
      avatarUrl: "assets/images/reviews/avatar2.jpg"
    },
    {
      id: 3,
      textKey: "reviews.review3.text",
      reviewerName: "Mark Wilson",
      reviewerTitle: "Product Owner", 
      avatarUrl: "assets/images/reviews/avatar3.jpg"
    }
  ];

  ngOnInit(): void {
  }
}