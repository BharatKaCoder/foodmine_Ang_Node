import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FoodService } from '../../../../services/food.service';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
})
export class RatingComponent {
  @Input() rating: number = 0; // Rating value from service
  stars: Array<'full' | 'half' | 'empty'> = [];

  ngOnChanges() {
    this.updateStars();
  }

  private updateStars() {
    const fullStars = Math.floor(this.rating);
    const hasHalfStar = this.rating % 1 >= 0.5;

    this.stars = Array.from({ length: 5 }, (_, i) => {
      if (i < fullStars) {
        return 'full';
      } else if (i === fullStars && hasHalfStar) {
        return 'half';
      } else {
        return 'empty';
      }
    });
  }
  // @Input() rating: number = 0;
  // @Output() ratingChange = new EventEmitter<number>();

  // stars = Array(5).fill(false); // Assuming you have 5 stars
  // constructor(private _foodService: FoodService) {}

  // ngOnInit() {
  //   // Initialize stars array with data from the service
  //   const foods = this._foodService.getAllFood();
  //   this.stars = foods.map(food => food?.stars > 0);
  // }

  // rate(rating: number) {
  //   this.rating = rating; 
  //   this.ratingChange.emit(this.rating);
  //   this.updateStars();
  // }

  // ngOnChanges() {
  //   this.updateStars();
  // }

  // private updateStars() {
  //   this.stars = Array.from({ length: 5 }, (_, i) => i < this.rating);
  // }
}
