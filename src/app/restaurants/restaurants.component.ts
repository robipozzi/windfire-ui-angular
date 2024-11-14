import { Component } from "@angular/core";
import { Restaurant } from './model/restaurant';
import { RestaurantService } from './services/restaurant.service';
import { ErrorService } from '../error/services/error.service';
import { RestaurantAddComponent } from "./add-new/restaurant-add.component";

@Component({
    selector: 'restaurants',
    imports: [RestaurantAddComponent],
    standalone: true,
    templateUrl: './restaurants.component.html'
})

export class RestaurantsComponent {
    title = 'Windfire Restaurants';
    mainFunctionsLabel = "Main Functions";
    getRestaurantsLabel = "My Restaurants List";
    addRestaurantLabel = "Add Restaurant";
    restaurants: Restaurant[] = [];
    addFormView = false;

    constructor(private restaurantService: RestaurantService, private errorService: ErrorService) { }

    ngOnInit() {
        this.errorService.clear();
        this.getRestaurants();
    }

    getRestaurants(): void {
        /*if (environment.mock) {
            this.restaurants = this.restaurantService.getRestaurantsFake();
        } else {
            this.restaurantService.getRestaurants().subscribe(obj => this.processResponse(obj));
        }*/
        this.addFormView = false;
        //this.restaurants = this.restaurantService.getRestaurantsFake();
        // Fetch the list of restaurants when the component is initialized
        this.restaurantService.getRestaurants().subscribe(
            (data: Restaurant[]) => {
                console.log("Restaurants list returned from RestaurantService, processing ... ", data)
                // Assign data to the restaurants array
                this.restaurants = data;
            },
            (error) => {
                // Handle error (e.g., show an error message)
                console.error('Failed to load restaurants:', error);
                this.errorService.add('Failed to load restaurants');
            }
        );
    }

    openAddRestaurantForm(): void {
        console.log("addFormView is ", this.addFormView);
        console.log("openAddRestaurantForm()");
        this.addFormView = true;
        console.log("addFormView is ", this.addFormView);
    }

    delete(restaurant: Restaurant): void {
        this.addFormView = false;
        let restaurantId: string | null;
        restaurantId = restaurant.id;
        this.restaurantService.deleteRestaurant(restaurantId).subscribe({
            next: () => {
              // Handle successful deletion (e.g., remove from local list or show a message)
              console.log(`Restaurant with ID ${restaurantId} deleted successfully.`);
              this.removeFromRestaurantsArray(restaurantId);
            },
            error: (err) => {
              // Handle error (e.g., show an error message)
              console.error('Error deleting restaurant:', err);
              this.errorService.add('Error deleting restaurant');
            }
        });
    }

    private removeFromRestaurantsArray(id: string | null) {
        this.restaurants = this.restaurants.filter(item => item.id !== id);
    }

}