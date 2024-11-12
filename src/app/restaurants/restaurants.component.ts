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

    openAddRestaurantForm(): void {
        this.addFormView = true;
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

    delete(restaurant: Restaurant): void {
        this.addFormView = false;
        let restaurantId = restaurant.id;
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

    private removeFromRestaurantsArray(id: string) {
        this.restaurants = this.restaurants.filter(item => item.id !== id);
    }

    /* processResponse(obj: string): void {
         console.log("######## restaurant.processResponse() - obj = ");
         console.log(obj);
         const jsonObj = JSON.parse(JSON.stringify(obj));
         console.log("######## restaurant.processResponse() - jsonObj = ");
         console.log(jsonObj);
         const errorMsg = jsonObj.error;
         if (errorMsg != undefined) {
             this.errorService.add(errorMsg);
         } else {
             const restaurantObjArray = jsonObj;
             let index = 0;
             try {
                 restaurantObjArray.forEach(response => {
                     console.log("######## restaurant.processResponse() - response = ");
                     console.log(response);
                     const restaurant: Restaurant = new Restaurant(response._id, response.restaurant_id, response.name, (response.borough || response.city), response.address.street, response.address.zipcode, response.cuisine);
                     this.restaurants[index++] = restaurant;
                 });
             } catch (error) {
                 this.errorService.add("GENERIC ERROR : Something went wrong while processing response from RestaurantService");
             }
         }
     }*/
}