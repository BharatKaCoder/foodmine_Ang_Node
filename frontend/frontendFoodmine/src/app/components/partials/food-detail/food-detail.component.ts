import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../../pages/home/rating/rating.component';

@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RatingComponent, CommonModule, RouterLink],
  templateUrl: './food-detail.component.html',
  styleUrl: './food-detail.component.css'
})
export class FoodDetailComponent {
  foods?: Food[];

  constructor(private _foodService:FoodService,private _activatedRoute:ActivatedRoute) {}

  ngOnInit():void {
    this._activatedRoute.params.subscribe((param)=>{
      if (param['id']) {
        this.foods = this._foodService.getFoodDetailsById(param['id']);
      }
    });
  }
}
