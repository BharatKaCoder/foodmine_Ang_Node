import { Component } from '@angular/core';
import { Cart } from '../../../shared/models/cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/CartItems'; // Ensure correct import
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmptyPageComponent } from '../../partials/empty-page/empty-page.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, FormsModule, MatFormFieldModule, CommonModule, RouterLink, EmptyPageComponent],
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'] // Corrected from styleUrl to styleUrls
})
export class CartPageComponent {
  cart: CartItem[] = []; // Use specific type
  cartData: Cart | undefined; // Use specific type
  showEmptyPage: boolean = false;

  constructor(private _cartService: CartService) {}

  ngOnInit(): void {
    this._cartService.getCartObservable().subscribe((cart: Cart) => {
      if (cart && cart.item.length) {
        this.cart = cart.item;
        this.cartData = cart;
        this.showEmptyPage = false;
      } else {
        this.showEmptyPage = true;
      }
    });
  }

  removeItemFromCart(cartItem: CartItem): void {
    this._cartService.removeFromCart(cartItem);
  }

  changeQuantity(cartItem: CartItem, qty: string): void {
    const quantity = parseInt(qty, 10); // Specify radix for parseInt
    if (!isNaN(quantity)) { // Check if quantity is a valid number
      this._cartService.changeQuantity(cartItem.food.id, quantity); // Use _id instead of id
    }
  }
}

