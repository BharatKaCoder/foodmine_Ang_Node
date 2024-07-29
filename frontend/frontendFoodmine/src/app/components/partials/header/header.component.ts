import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { User } from '../../../shared/models/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  notification:number = 0;
  UserName:string='';
  isExstingUser!:any;
  userLogged:boolean = false;
  constructor(
    private _foodService:FoodService, 
    private _cartService:CartService,
    private _userService:UserService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _router:Router) 
  {}
  
  ngOnInit() {
    this._cartService.getCartObservable().subscribe((cart:any)=>{
      if (cart) {
        this.notification = cart.item?.length;
      }
    });
    this._userService.userObservable$.subscribe((newUser:any)=>{
      if(newUser) {
        this.UserName = newUser.name;
        this.isExstingUser = newUser.token;
        this.userLogged = this.isExstingUser ? false: true;
      }
    });
  }

  logout():any {
    if(isPlatformBrowser(this.platformId)) {
     this._userService.logout();
    }
  }
}
