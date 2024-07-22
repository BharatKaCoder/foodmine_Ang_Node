import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodDetailComponent } from './components/pages/food-detail/food-detail.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';

export const routes: Routes = [
    { path:'', component:HomeComponent},
    { path:'search/:searchTerm', component:HomeComponent},
    { path:'tag/:tag', component:HomeComponent},
    { path:'cart-page', component:CartPageComponent}
];