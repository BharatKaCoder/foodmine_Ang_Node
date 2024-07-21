import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods } from '../../data';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAllFood(): Food[] {
    return sample_foods;
  }

  getAllFoodBySearch(searchTerm:string) {
    return this.getAllFood().filter((food)=> food.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
}
