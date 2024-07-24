import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from '../../data';
import { Tag } from '../shared/models/tag';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FOOD_BY_ID_URL, FOOD_BY_SEARCH_ID_URL, FOOD_BY_TAG_ID_URL, FOOD_TAG_URL, FOOD_URL } from '../shared/constant/url';

@Injectable({
  providedIn: 'root',
})
export class FoodService {

  private foodDataSubject = new BehaviorSubject<Food[]>([]);
  foodData$ = this.foodDataSubject.asObservable();
  constructor(private _http:HttpClient) { }

  updateFoodData(newData: Food[]) {
    this.foodDataSubject.next(newData);
  }

  getAllFood(): Observable<Food[]> {
    // return sample_foods; //this just clint side file;
    return this._http.get<Food[]>(FOOD_URL); //this is using api
  }

  getAllFoodBySearch(searchTerm:string) {
    // return this.getAllFood().filter((food)=> food.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return this._http.get<any>(FOOD_BY_SEARCH_ID_URL+searchTerm); //this is using api
  }

  getAllTags():Observable<Tag[]> {
    // return sample_tags
    return this._http.get<Tag[]>(FOOD_TAG_URL); //this is using api
  }

  getAllFoodByTagName(tag:string): Observable<Food[]> {
    // return (tag === 'All')? this.getAllFood():this.getAllFood().filter((filter)=> filter.tags?.includes(tag));
    return (tag === 'All')? this.getAllFood() : this._http.get<Food[]>(FOOD_BY_TAG_ID_URL+tag); //this is using api
  }

  getFoodDetailsById(id:string): Observable<any> {
    // return this.getAllFood().filter((filter)=> filter?.id.includes(id));
    return this._http.get<any>(FOOD_BY_ID_URL+id); //this is using api
  }
}
