import { ChangeDetectorRef, Component, EventEmitter, Input, Output, output } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute, Data, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RatingComponent } from '../home/rating/rating.component';
import { CartService } from '../../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, RatingComponent, CommonModule, RouterLink],
  templateUrl: './food-detail.component.html',
  styleUrl: './food-detail.component.css'
})
export class FoodDetailComponent {
  foods?: Food[] = [];
  cartList?: any;
  parsedData?: any[];
  mergedArray?: any[];
  @Output() detailViewOpen = new EventEmitter<boolean>();
  subscription!:Subscription;

  constructor(
    private _cartService:CartService,
    private _activatedRoute:ActivatedRoute,
    private _router:Router,
    private _cd:ChangeDetectorRef,
    private _foodService:FoodService,
    ) {}

  ngOnInit():void {
    this.subscription = this._foodService.foodData$.subscribe((slectedId:any)=>{
      this.foods = slectedId;
      this._cd.detectChanges();
    });
  }

  closeDetails(ev:any) {
    if (ev) {
      this.detailViewOpen.emit(false);
      this._router.navigate(['/']);
      this.foods = []
    }
  }

  addToCart(id:string) {
    this.subscription = this._foodService.getFoodDetailsById(id).subscribe((foodDetail)=>{
      this.cartList = foodDetail;
      this._cartService.addToCartList(this.cartList);
      this.detailViewOpen.emit(false);
      this._router.navigate(['/']);
    })
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // goToCart() {
  //   this._router.navigate(['/food-page']);
  // }
}
