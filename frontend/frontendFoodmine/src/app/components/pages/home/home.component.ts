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
import { Observable, Subscription } from 'rxjs';
import { CommanService } from '../../../services/comman.service';
import { LoginPageComponent } from '../login-page/login-page.component';
import { LoaderComponent } from '../../partials/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule, 
    MatButtonModule, 
    RatingComponent, 
    CommonModule, 
    SearchComponent, 
    TagsComponent, 
    RouterLink, 
    FoodDetailComponent,
    RouterModule, 
    LoginPageComponent,
    LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  foods:Food[] = [];
  customerRating: number = 0;
  selectedfoodId:any[] = []; // To store the selected product details
  selectedfood:boolean = false;
  showOverlay = false;
  subscription!:Subscription;
  isLoginVisible: boolean = false;
  isLoaderShow:boolean = false;

  constructor(
    private _foodService: FoodService,
    private _activatedRoute: ActivatedRoute,
    private _commanService: CommanService) {
    }
    
    ngOnInit(): void {
    let foodObservable:Observable<Food[]>;
    foodObservable = this._foodService.getAllFood();
    this._activatedRoute.params.subscribe((param)=>{
      if(param['searchTerm']) {
        foodObservable = this._foodService.getAllFoodBySearch(param['searchTerm']);
      } else if (param['tag']) {
        foodObservable = this._foodService.getAllFoodByTagName(param['tag'])
      } else {
        foodObservable = this._foodService.getAllFood();
      }

      this.subscription = foodObservable.subscribe((subscribedFood)=>{
        this.foods = subscribedFood;
      });

      this._commanService.isModalVisible$.subscribe(visible => {
        this.isLoginVisible = visible;
      });

      this._commanService.loaderObservable$.subscribe((loader)=>{
        this.isLoaderShow = loader;
      });

    })
  }

  closeLogin() {
    this._commanService.hide();
  }

  showFoodDetails(foodId: any) {
    this.showOverlay = true;
    this.selectedfood = true;
    this.subscription = this._foodService.getFoodDetailsById(foodId).subscribe((foodDetail)=>{
      this.selectedfoodId = foodDetail;
      this._foodService.updateFoodData(this.selectedfoodId);
    });
  }

  handleDetailViewOpen(isOpen: boolean) {
    if (!isOpen) {
      this.showOverlay = false;
    }
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
