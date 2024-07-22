import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/CartItems';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = this.getCartItemLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart)
  constructor() { }

  
  addToCartList(food:Food):void {
    let cartItem =  this.cart.item.find((find)=>{ find.food.id === food.id});
    if (cartItem) {
      return
    } else {
      this.cart.item.push(new CartItem(food))
    }
    this.setCartItemToLocalStorage();
  }

  removeFromCart(food:Food):void {
    this.cart.item = this.cart.item.filter((filter)=>filter.food.id != food.id);
    this.setCartItemToLocalStorage();
  }

  chnageQuantity(foodId:string, quantity:number):void {
    let cartItem = this.cart.item.find((find)=> find.food.id === foodId);
    if (!cartItem) {
      return;
    } else {
      cartItem.quantity = quantity;
      cartItem.price = quantity*cartItem.food.price;
    }
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartItemToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartItemToLocalStorage():void {
    this.cart.totalPrice = this.cart.item.reduce((preSum,currValue)=> preSum + currValue.price,0);
    this.cart.totalCount = this.cart.item.reduce((preSum,currValue)=> preSum + currValue.quantity,0);
    const setJSON = JSON.stringify(this.cart);
    localStorage.setItem('cart',setJSON);
    this.cartSubject.next(this.cart);
  }

  private getCartItemLocalStorage() {
    const cartJSON = localStorage.getItem('cart');
    return cartJSON? JSON.parse(cartJSON): new Cart();
  }
}
