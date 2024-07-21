import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RatingComponent } from './rating/rating.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../../partials/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RatingComponent, CommonModule, SearchComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  foods:Food[] = [];
  customerRating: number = 0;
  constructor(
    private _foodService: FoodService,
    private _activatedRoute: ActivatedRoute) {
      _activatedRoute.params.subscribe((param)=>{
        if(param['searchTerm']) {
          this.foods = this._foodService.getAllFoodBySearch(param['searchTerm']);
        } else {
          this.foods = this._foodService.getAllFood();
        }
      })
    }

  ngOnInit(): void {
    this.foods = this._foodService.getAllFood();
  }
}
