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

    constructor(private restaurantService: RestaurantService, private errorService: ErrorService) {

    }

    ngOnInit() {
        this.errorService.clear();
        this.getRestaurants();
    }

    openAddRestaurantForm(): void {
        this.addFormView = true;
    }

    delete(restaurant: Restaurant): void {
        this.addFormView = false;
        this.removeFromRestaurantsArray(restaurant.id);
        //this.restaurantService.deleteRestaurant(restaurant.id).subscribe();
    }

    getRestaurants(): void {
        /*if (environment.mock) {
            this.restaurants = this.restaurantService.getRestaurantsFake();
        } else {
            this.restaurantService.getRestaurants().subscribe(obj => this.processResponse(obj));
        }*/
       this.addFormView = false;
       this.restaurants = this.restaurantService.getRestaurantsFake();
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