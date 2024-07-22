import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/tag';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private foodDataSubject = new BehaviorSubject<Food[]>([]);
  foodData$ = this.foodDataSubject.asObservable();
  constructor() { }

  updateFoodData(newData: Food[]) {
    this.foodDataSubject.next(newData);
  }

  getAllFood(): Food[] {
    return sample_foods;
  }

  getAllFoodBySearch(searchTerm:string) {
    return this.getAllFood().filter((food)=> food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  getAllTags():Tag[] {
    return sample_tags
  }

  getAllFoodByTagName(tag:string):Food[] {
    return (tag === 'All')? 
     this.getAllFood()
    :this.getAllFood().filter((filter)=> filter.tags?.includes(tag));
  }

  getFoodDetailsById(id:string): Food[] {
    return this.getAllFood().filter((filter)=> filter?.id.includes(id));
  }

  // addToCartList(item:any) {
  //   const currentItems:Food[] = this.getItem();
  //   currentItems.push(item)
  //   localStorage.setItem('cartList',JSON.stringify(currentItems));
  // }

  getItem():Food[] {
    const item = localStorage.getItem('cartList');
    return item? JSON.parse(item):[];
  }

  removeItemFromCart(index:number) {
    const items = this.getItem();
    items.splice(index,1)
    localStorage.setItem('cartList',JSON.stringify(items));
  }

  clearCart(): void {
    localStorage.removeItem('cartList');
  }
}
