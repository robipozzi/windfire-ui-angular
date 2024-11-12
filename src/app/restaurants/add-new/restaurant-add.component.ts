import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ErrorService } from '../../error/services/error.service';
import { Restaurant } from '../model/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { Address } from '../model/address';

@Component({
  selector: 'restaurant-add-new',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './restaurant-add.component.html'
})

export class RestaurantAddComponent implements OnInit {
  addNewRestaurantLabel = "Add New Restaurant"
  submitted = false;

  newRestaurantForm = new FormGroup({
    name: new FormControl(''),
    city: new FormControl(''),
    zipcode: new FormControl(''),
    street: new FormControl(''),
    cuisine: new FormControl(''),
  });

  constructor(private restaurantService: RestaurantService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.errorService.clear();
  }

  add(): void {
    this.submitted = true;
    console.warn(this.newRestaurantForm.value);
    //constructor( _id: string, _name: string, _address: Address, _cuisine: string )
    let restaurant:Restaurant = new Restaurant("", "Pippo Burger", 
                                              new Address("21013", "Gallarate", "Piazza Libertà", "VA", "Lombardia", "Italia"),
                                              "Lombarda")
    /*let restaurant:Restaurant = new Restaurant("", 
                                                this.newRestaurantForm.value.name, 
                                                new Address("", "", "", "", "", ""), 
                                                this.newRestaurantForm.value.cuisine);*/
    //this.restaurantService.addRestaurant(this.model).subscribe(obj => this.processResponse(obj));
    this.restaurantService.addRestaurant(restaurant);
  }

  edit(): void {
    this.submitted = false;
    this.errorService.clear();
  }

  reset() {
    //this.model = new Restaurant('', '', '', '', '', '', '');
  }

}