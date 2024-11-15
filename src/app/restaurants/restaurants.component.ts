import { Component } from "@angular/core";
import { Restaurant } from './model/restaurant';
import { RestaurantService } from './services/restaurant.service';
import { RestaurantAddController } from "./controllers/restaurant-add.controller";
import { ErrorService } from '../error/services/error.service';
import { RestaurantAddComponent } from "./add-new/restaurant-add.component";

@Component({
    selector: 'restaurants',
    imports: [RestaurantAddComponent],
    standalone: true,
    templateUrl: './restaurants.component.html'
})

export class RestaurantsComponent {
    titleLabel = 'Windfire Restaurants';
    mainFunctionsLabel = "Main Functions";
    getRestaurantsLabel = "My Restaurants List";
    addRestaurantLabel = "Add Restaurant";
    restaurants: Restaurant[] = [];
    addFormView = false;

    constructor(private restaurantService: RestaurantService, private restaurantAddController: RestaurantAddController, private errorService: ErrorService) { }

    ngOnInit() {
        this.errorService.clear();
        this.addFormView = false;
        this.getRestaurants();
    }

    getRestaurants(): void {
        this.errorService.clear();
        this.addFormView = false;
        /*if (environment.mock) {
            this.restaurants = this.restaurantService.getRestaurantsFake();
        } else {
            this.restaurantService.getRestaurants().subscribe(obj => this.processResponse(obj));
        }*/
        // Fetch the list of restaurants
        this.restaurantService.getRestaurants().subscribe(
            (data: Restaurant[]) => {
                console.log("Restaurants list returned from RestaurantService, processing ... ", data)
                // Assign data to the restaurants array
                this.restaurants = data;
            },
            (error) => {
                // Handle error (e.g., show an error message)
                console.error('RestaurantsComponent.getRestaurants() --> Failed to load restaurants:');
                this.errorService.add('Oops! Something went wrong. Not able to load restaurants list, please try again later.');
            }
        );
    }

    openAddRestaurantForm(): void {
        console.log("openAddRestaurantForm()");
        console.warn("addFormView is ", this.addFormView);
        this.restaurantAddController.formSubmitted$.subscribe((formSubmitted) => {
            console.log("is form submitted ? ", formSubmitted);
            if (formSubmitted) {
              this.restaurantAddController.setSubmittedState(false);
            }
        });
        this.addFormView = true;
        console.warn("addFormView is ", this.addFormView);
    }

    deleteRestaurant(restaurant: Restaurant): void {
        this.errorService.clear();
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
              console.error('RestaurantsComponent.deleteRestaurant() --> Failed to delete restaurant');
              this.errorService.add('Oops! Something went wrong. Not able to delete restaurant, please try again later.');
            }
        });
    }

    private removeFromRestaurantsArray(id: string | null) {
        this.restaurants = this.restaurants.filter(item => item.id !== id);
    }

}