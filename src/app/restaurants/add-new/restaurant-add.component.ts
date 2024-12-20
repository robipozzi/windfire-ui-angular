import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ErrorService } from '../../error/services/error.service';
import { Restaurant } from '../model/restaurant';
import { RestaurantService } from '../services/restaurant.service';
import { RestaurantAddController } from '../controllers/restaurant-add.controller';
import { Address } from '../model/address';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface PlacePrediction {
  description: string;
  place_id: string;
}

interface AddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

@Component({
  selector: 'restaurant-add-new',
  imports: [ReactiveFormsModule],
  standalone: true,
  templateUrl: './restaurant-add.component.html'
})

export class RestaurantAddComponent implements OnInit {
  private mapsServiceProxyBaseUrl: string = "";
  addNewRestaurantLabel = "Add New Restaurant"
  restaurantNameLabel = "Restaurant Name";
  fullAddress = "Address";
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
  newRestaurantForm: FormGroup;
  predictions: PlacePrediction[] = [];
  newRestaurantName: string | null | undefined;
  newRestaurantAddedMsg = "";

  constructor(private fb: FormBuilder, private http: HttpClient, private restaurantService: RestaurantService, private restaurantAddController: RestaurantAddController, private errorService: ErrorService) { 
    this.setupEnv();
    this.newRestaurantForm = this.fb.group({
      name: [''],
      fullAddress: [''],
      city: [''],
      zipcode: [''],
      province: [''],
      region: [''],
      country: [''],
      street: [''],
      streetNumber: [''],
      phone: [''],
      mobile: [''],
      email: [''],
      website: [''],
      cuisine: [''],
    });
  }

  ngOnInit(): void {
    this.errorService.clear();
    this.setupAddressAutocomplete();
  }

  setupAddressAutocomplete() {
    this.newRestaurantForm.get('fullAddress')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(input => {
        if (!input || input.length < 3) {
          return of([]);
        }
        return this.fetchAutocomplete(input);
      })
    ).subscribe(
      (response: never[] | { predictions: PlacePrediction[] }) => {
        this.predictions = Array.isArray(response) ? response : response.predictions || [];
      }
    );
  }

  fetchAutocomplete(input: string) {
    return this.http.get<{predictions: PlacePrediction[]}>(this.mapsServiceProxyBaseUrl + `/api/places/autocomplete?input=${input}`);
  }

  selectAddress(prediction: PlacePrediction) {
    this.http.get<{result: {address_components: AddressComponent[], formatted_address: string}}>(
      this.mapsServiceProxyBaseUrl + `/api/places/details?placeid=${prediction.place_id}`
    ).subscribe(response => {
      const addressComponents = response.result.address_components;
      
      // Reset form first
      this.newRestaurantForm.patchValue({
        fullAddress: prediction.description,
        streetNumber: '',
        street: '',
        city: '',
        province: '',
        zipcode: '',
        country: ''
      });

      // Map address components
      addressComponents.forEach(component => {
        const types = component.types;
        
        if (types.includes('street_number')) {
          this.newRestaurantForm.get('streetNumber')?.setValue(component.long_name);
        }
        
        if (types.includes('route')) {
          this.newRestaurantForm.get('street')?.setValue(component.long_name);
        }
        
        if (types.includes('locality')) {
          this.newRestaurantForm.get('city')?.setValue(component.long_name);
        }
        
        if (types.includes('administrative_area_level_1')) {
          this.newRestaurantForm.get('region')?.setValue(component.long_name);
        }

        if (types.includes('administrative_area_level_2')) {
          this.newRestaurantForm.get('province')?.setValue(component.short_name);
        }
        
        if (types.includes('postal_code')) {
          this.newRestaurantForm.get('zipcode')?.setValue(component.long_name);
        }
        
        if (types.includes('country')) {
          this.newRestaurantForm.get('country')?.setValue(component.long_name);
        }
      });
    });
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
                                                            this.newRestaurantForm.value.country),
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

  private setupEnv() {
    this.mapsServiceProxyBaseUrl = "http://localhost:3000";
    //this.restaurantServiceBaseUrl = this.appConfigService.getConfig().RESTAURANT_SVC_BASEURL
    console.log('mapsServiceProxyBaseUrl =  ' + this.mapsServiceProxyBaseUrl);
  }

}