import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  notification:number = 0;
  constructor(private _foodService: FoodService, private _cartService:CartService ) {}
  ngOnInit() {
    this._cartService.getCartObservable().subscribe((cart:any)=>{
      if (cart) {
        this.notification = cart.item?.length;
      }
    });
  }
}
