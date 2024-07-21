import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/tag';

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

  getAllTags():Tag[] {
    return sample_tags
  }

  getAllFoodByTagName(tag:string):Food[] {
    return (tag === 'All')? 
     this.getAllFood()
    :this.getAllFood().filter((filter)=> filter.tags?.includes(tag));
  }
}
