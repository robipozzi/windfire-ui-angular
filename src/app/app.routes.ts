import { Routes } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './security/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'restaurants', component: RestaurantsComponent, canActivate: [AuthGuard] },
    { path: 'sensors', component: HomeComponent, canActivate: [AuthGuard] }
];