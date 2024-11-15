import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ErrorService } from '../../error/services/error.service';
import { Restaurant } from '../model/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { RestaurantAddController } from '../controllers/restaurant-add.controller';
import { Address } from '../model/address';

@Component({
  selector: 'restaurant-add-new',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './restaurant-add.component.html'
})

export class RestaurantAddComponent implements OnInit {
  addNewRestaurantLabel = "Add New Restaurant"
  restaurantNameLabel = "Restaurant Name";
  cityLabel = "City";
  zipcodeLabel = "Zip Code";
  provinceLabel = "Province";
  regionLabel = "Region";
  countryLabel = "Country";
  streetLabel = "Street / Square";
  phoneLabel = "Phone";
  mobileLabel = "Mobile";
  emailLabel = "Email";
  websiteLabel = "Website";
  cuisineLabel = "Cuisine Type";
  submitted = false;
  newRestaurantForm = new FormGroup({
    name: new FormControl(''),
    city: new FormControl(''),
    zipcode: new FormControl(''),
    province: new FormControl(''),
    region: new FormControl(''),
    country: new FormControl(''),
    street: new FormControl(''),
    phone: new FormControl(''),
    mobile: new FormControl(''),
    email: new FormControl(''),
    website: new FormControl(''),
    cuisine: new FormControl(''),
  });
  newRestaurantName: string | null | undefined;
  newRestaurantAddedMsg = "";

  constructor(private restaurantService: RestaurantService, private restaurantAddController: RestaurantAddController, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.errorService.clear();
  }

  add(): void {
    this.errorService.clear();
    console.warn(this.newRestaurantForm.value);
    let restaurant:Restaurant = new Restaurant("", 
                                                this.newRestaurantForm.value.name, 
                                                new Address(this.newRestaurantForm.value.zipcode, 
                                                            this.newRestaurantForm.value.city, 
                                                            this.newRestaurantForm.value.street, 
                                                            this.newRestaurantForm.value.province, 
                                                            this.newRestaurantForm.value.region, 
                                                            "Italia"),
                                                this.newRestaurantForm.value.phone,
                                                this.newRestaurantForm.value.mobile,
                                                this.newRestaurantForm.value.email,
                                                this.newRestaurantForm.value.website,
                                                this.newRestaurantForm.value.cuisine);
    // Add a new restaurant
    this.restaurantService.addRestaurant(restaurant).subscribe(
      (response) => {
        console.log('Restaurant added successfully:', response);
        this.setSubmitted(true);
        this.newRestaurantName = restaurant.name;
        this.newRestaurantAddedMsg = "Form submitted, new restaurant " + this.newRestaurantName + " has been added";
        this.newRestaurantForm.reset();
      },
      (error) => {
        console.error('RestaurantAddComponent.add() --> Failed to add new restaurant');
        this.errorService.add('Oops! Something went wrong. Not able to add new restaurant, please try again later.');
      }
    );
  }

  edit(): void {
    this.setSubmitted(false);
    this.errorService.clear();
  }

  reset() {
    this.newRestaurantForm.reset();
    this.setSubmitted(false);
  }

  private setSubmitted(isSubmitted: boolean) {
    this.restaurantAddController.setSubmittedState(isSubmitted);
    this.submitted = isSubmitted;
  }

}