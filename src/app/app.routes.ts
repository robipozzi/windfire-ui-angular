import { Routes } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './security/auth.guard';
import { SensorsComponent } from './sensors/sensors.component';
import { CalendarComponent } from './calendar/calendar.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'restaurants', component: RestaurantsComponent, canActivate: [AuthGuard] },
    { path: 'sensors', component: SensorsComponent, canActivate: [AuthGuard] },
    { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] }
];