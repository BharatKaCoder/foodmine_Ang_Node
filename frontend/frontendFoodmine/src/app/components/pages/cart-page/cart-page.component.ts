import { Component } from '@angular/core';
import { Cart } from '../../../shared/models/cart';
import { CartService } from '../../../services/cart.service';
import { CartItem } from '../../../shared/models/CartItems';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EmptyPageComponent } from '../../partials/empty-page/empty-page.component';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,FormsModule, MatFormFieldModule, CommonModule,RouterLink, EmptyPageComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent {
  cart!:any[];
  cartData!:any;
  showEmptyPage:boolean = false;

  constructor(private _cartService:CartService) {}

  ngOnInit():void {
    this._cartService.getCartObservable().subscribe((cart:any)=>{
    if(cart && cart?.item.length) {
      this.cart = cart?.item;
      this.cartData = cart;
      this.showEmptyPage = false;
    } else {
        this.showEmptyPage = true;
      }
    });
  }

  removeItemFromCart(cartItem:CartItem) {
    this._cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem:any,qty:string) {
    const quantity = parseInt(qty);
    this._cartService.changeQuantity(cartItem.food[0].id,quantity);
  }

  removeFromCart(item:any) {
    this._cartService.removeFromCart(item);
  }
}
