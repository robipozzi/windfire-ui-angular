import { Component } from "@angular/core";

@Component({
    selector: 'restaurants',
    standalone: true,
    templateUrl: './restaurants.component.html'
})

export class RestaurantsComponent {
    title = 'Windfire Restaurants';
    mainFunctionsLabel = "Main Functions";
    getRestaurantsLabel = "My Restaurants List";
    addRestaurantLabel = "Add Restaurant";
}