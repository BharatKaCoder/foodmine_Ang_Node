import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodDetailComponent } from './components/pages/food-detail/food-detail.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { CheckoutPageComponent } from './components/pages/checkout-page/checkout-page.component';

export const routes: Routes = [
    { path:'', component:HomeComponent},
    { path:'search/:searchTerm', component:HomeComponent},
    { path:'tag/:tag', component:HomeComponent},
    { path:'cart-page', component:CartPageComponent},
    { path:'login', component:LoginPageComponent},
    { path:'checkout', component:CheckoutPageComponent},
];