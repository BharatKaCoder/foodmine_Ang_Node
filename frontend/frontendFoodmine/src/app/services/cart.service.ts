import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/CartItems';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart:Cart = this.getCartItemLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart)
  constructor(private _toastr:ToastrService) { }

  
  addToCartList(food:Food):void {
    let cartItem =  this.cart.item.find((find)=>{ find.food.id === food.id});
    if (cartItem) {
      return
    } else {
      this.cart.item.push(new CartItem(food))
    }
    this.setCartItemToLocalStorage();
  }

  removeFromCart(food:any):void {
    this.cart.item = this.cart.item.filter((filter:any)=>Array(filter)[0].food[0].id != Array(food)[0].food[0].id);
    this.setCartItemToLocalStorage();
    this._toastr.error(`${food.food[0].name} has been removed from cart`);
  }

  changeQuantity(foodId: string, quantity: number): void {
    let cartItem:any = this.cart.item.find((item:any) => item.food[0].id === foodId);
    if (!cartItem) {
        console.error(`Food item with ID ${foodId} not found in cart.`);
        return;
    }
    cartItem.quantity = quantity;
    cartItem.food[0].price = quantity * cartItem.food[0].price;
    this.setCartItemToLocalStorage();
  }

  clearCart() {
    this.cart = new Cart();
    this.setCartItemToLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setCartItemToLocalStorage():void {
    this.cart.totalPrice = this.cart.item.reduce((preSum:any, currentItem:any) => {
      // Since each currentItem contains a 'food' array with potentially multiple items (though your JSON shows only one per cart item)
      const itemPrice = [currentItem.food].reduce((sum:any, foodItem:any) => {
          return sum + foodItem.price;
      }, 0);      
      return preSum + itemPrice;
    }, 0); 
    this.cart.totalCount = this.cart.item.reduce((preSum:any, currentItem:any) => {
      return preSum + currentItem.quantity;
    }, 0);
    const setJSON = JSON.stringify(this.cart);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cart',setJSON);
    }
    this.cartSubject.next(this.cart);
  }

  public getCartItemLocalStorage() {
    if (typeof localStorage !== 'undefined') {
      const cartJSON = localStorage.getItem('cart');
      return cartJSON? JSON.parse(cartJSON): new Cart();
    }
  }
}
