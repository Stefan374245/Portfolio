import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from './review/review.component';
import { Review } from '../../shared/interfaces/review.interface';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, ReviewComponent],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.scss'
})
export class RecommendationComponent implements OnInit {
  reviews: Review[] = [
    {
      id: 1,
      text: "Michael really kept the team together with his great organization and clear communication. We wouldn't have got this far without his commitment.",
      reviewerName: "V. Schuster",
      reviewerTitle: "Team Partner",
      avatarUrl: "assets/images/reviews/avatar1.jpg"
    },
    {
      id: 2,
      text: "Outstanding technical skills and ability to solve complex problems efficiently.",
      reviewerName: "Sarah Johnson", 
      reviewerTitle: "Senior Developer",
      avatarUrl: "assets/images/reviews/avatar2.jpg"
    },
    {
      id: 3,
      text: "A reliable team member who always delivers high-quality work on time.",
      reviewerName: "Mark Wilson",
      reviewerTitle: "Product Owner", 
      avatarUrl: "assets/images/reviews/avatar3.jpg"
    }
  ];

  ngOnInit(): void {
    
  }
}