import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { RatingComponent } from './rating/rating.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { SearchComponent } from '../../partials/search/search.component';
import { TagsComponent } from '../../partials/tags/tags.component';
import { FoodDetailComponent } from '../food-detail/food-detail.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RatingComponent, CommonModule, SearchComponent, TagsComponent, RouterLink, FoodDetailComponent,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  foods:Food[] = [];
  customerRating: number = 0;
  selectedfoodId:Food[] = []; // To store the selected product details
  selectedfood:boolean = false;
  showOverlay = false;

  constructor(
    private _foodService: FoodService,
    private _activatedRoute: ActivatedRoute) {
    }

  ngOnInit(): void {
    this.foods = this._foodService.getAllFood();
    this._activatedRoute.params.subscribe((param)=>{
      if(param['searchTerm']) {
        this.foods = this._foodService.getAllFoodBySearch(param['searchTerm']);
      } else if (param['tag']) {
        this.foods = this._foodService.getAllFoodByTagName(param['tag'])
      } else {
        this.foods = this._foodService.getAllFood();
      }
    })
  }

  showFoodDetails(foodId: any) {
    this.showOverlay = true;
    this.selectedfood = true;
    this.selectedfoodId = this._foodService.getFoodDetailsById(foodId);
    this._foodService.updateFoodData(this.selectedfoodId);
  }

  handleDetailViewOpen(isOpen: boolean) {
    if (!isOpen) {
      this.showOverlay = false;
    }
  }
}
