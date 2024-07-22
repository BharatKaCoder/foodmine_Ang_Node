import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FoodService } from '../../../services/food.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  count:number = 0;
  constructor(private _foodService: FoodService) {}
  ngOnInit() {
    // const list:any = localStorage.getItem('cartList');
    // let parsedData = this._foodService.getItem();
    // console.log(parsedData)
  }
}
