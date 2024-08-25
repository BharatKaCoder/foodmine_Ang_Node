import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../shared/models/order';
import { ORDER_CREATE_URL } from '../shared/constant/url';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _http:HttpClient) { }

  create(order:Order) {
    return this._http.post<Order>(ORDER_CREATE_URL,order);
  }
}
