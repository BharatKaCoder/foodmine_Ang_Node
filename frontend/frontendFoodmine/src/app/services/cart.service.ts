import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/CartItems'; // Ensure correct import
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart = this.getCartItemLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor(private _toastr: ToastrService) { }

  addToCartList(food: Food): void {
    let cartItem = this.cart.item.find(item => item.food.id === food.id); // Use _id for consistency
    if (cartItem) {
      cartItem.quantity += 1; // Increment quantity if item already exists
    } else {
      this.cart.item.push({ food, quantity: 1, price: food.price }); // Create new cart item
    }
    this.setCartItemToLocalStorage();
  }

  removeFromCart(item: CartItem): void {
    this.cart.item = this.cart.item.filter(cartItem => cartItem.food.id !== item.food.id);
    this.updateCartTotals();
    this.setCartItemToLocalStorage();
    this._toastr.error(`${item.food.name} has been removed from cart`);
  }

  updateCartTotals(): void {
    this.cart.totalCount = this.cart.item.reduce((count, cartItem) => count + cartItem.quantity, 0);
    this.cart.totalPrice = this.cart.item.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
  }

  changeQuantity(foodId: string, quantity: number): void {
    let cartItem = this.cart.item.find(item => item.food.id === foodId); // Use _id for consistency
    if (!cartItem) {
      console.error(`Food item with ID ${foodId} not found in cart.`);
      return;
    }
    cartItem.quantity = quantity;
    this.updateCartTotals(); // Update totals after changing quantity
    this.setCartItemToLocalStorage();
  }

  clearCart(): void {
    this.cart = new Cart(); // Assuming Cart() initializes an empty cart
    this.setCartItemToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  private setCartItemToLocalStorage(): void {
    // Calculate total price and count
    this.updateCartTotals();

    // Save the updated cart to local storage
    const setJSON = JSON.stringify(this.cart);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cart', setJSON);
    }

    // Notify subscribers about the cart update
    this.cartSubject.next(this.cart);
  }

  private getCartItemLocalStorage(): Cart {
    if (typeof localStorage !== 'undefined') {
      const cartJSON = localStorage.getItem('cart');
      return cartJSON ? JSON.parse(cartJSON) : new Cart(); // Ensure Cart is initialized
    }
    return new Cart(); // Return an empty cart if localStorage is not available
  }
}

