import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodDetailComponent } from './components/partials/food-detail/food-detail.component';

export const routes: Routes = [
    { path:'', component:HomeComponent},
    { path:'search/:searchTerm', component:HomeComponent},
    { path:'tag/:tag', component:HomeComponent},
];