import { Injectable } from '@angular/core';
import { ErrorService } from '../../error/services/error.service';
import { Restaurant } from '../model/restaurant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Address } from '../model/address';
//import { AppConfigService } from 'src/app/app-config.service';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private restaurantServiceBaseUrl: string = "";
  private restaurantServiceEndpoint: string = "";

  constructor(private httpClient: HttpClient, private errorService: ErrorService, /*private appConfigService: AppConfigService*/) {
    this.setupEnv();
  }

  getRestaurants(): Observable<Restaurant[]> {
    console.log('getRestaurants - Calling Restaurant Service Endpoint @ ' + this.restaurantServiceEndpoint);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.get<Restaurant[]>(this.restaurantServiceEndpoint, { headers })
      .pipe(
        catchError(error => {
          // Quality control catches the problem
          console.error('RestaurantService.getRestaurants() --> Error during REST API call : ', error.message);
          // Send an apology note or fix the issue
          return throwError(() => new Error(error));
        })
      )
  }

  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    console.log('addRestaurant - Calling Restaurant Service Endpoint @ ' + this.restaurantServiceEndpoint);
    console.log("Restaurant to create ", restaurant);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<Restaurant>(this.restaurantServiceEndpoint, restaurant, { headers })
      .pipe(
        catchError(error => {
          // Quality control catches the problem
          console.error('RestaurantService.addRestaurant() --> Error during REST API call : ', error.message);
          // Send an apology note or fix the issue
          return throwError(() => new Error(error));
        })
      );
  }

  deleteRestaurant(restaurantId: string | null): Observable<void>{
    console.log('deleteRestaurant - Calling Restaurant Service Endpoint @ ' + this.restaurantServiceEndpoint);
    const url = `${this.restaurantServiceEndpoint}/${restaurantId}`; // Construct the URL with the restaurant ID
    return this.httpClient.delete<void>(url)
      .pipe(
        catchError(error => {
          // Quality control catches the problem
          console.error('RestaurantService.deleteRestaurant() --> Error during REST API call : ', error.message);
          // Send an apology note or fix the issue
          return throwError(() => new Error(error));
        })
      )
  }

  getRestaurantsFake(): Restaurant[] {
    console.log('Returning a fake Restaurant list');
    const restaurants: Restaurant[] = [];
    var index = 0;
    var restaurant1 = new Restaurant('1', 'Taverna del Pittore', new Address('28041', 'Arona', 'Piazza del Popolo 39', 'NO', 'Piemonte', 'Italy'), '0331212121', '34567890123', 'pippo@pluto.com', 'www.paperino.minni', 'Pesce');
    var restaurant2 = new Restaurant('2', 'La Corte del Re', new Address('21013', 'Gallarate', 'Via Manzoni, 1', 'VA', 'Lombardia', 'Italy'), '0331212121', '34567890123', 'pippo@pluto.com', 'www.paperino.minni', 'Italian');
    var restaurant3 = new Restaurant('3', 'La Perla', new Address('21100', 'Varese', 'Via Carrobbio 19', 'VA', 'Lombardia', 'Italy'), '0331212121', '34567890123', 'pippo@pluto.com', 'www.paperino.minni', 'Pesce');
    restaurants[index++] = restaurant1;
    restaurants[index++] = restaurant2;
    restaurants[index++] = restaurant3;
    return restaurants;
  }

  private setupEnv() {
    this.restaurantServiceBaseUrl = "http://localhost:8081";
    //this.restaurantServiceBaseUrl = this.appConfigService.getConfig().RESTAURANT_SVC_BASEURL
    console.log('restaurantServiceBaseUrl =  ' + this.restaurantServiceBaseUrl);
    this.restaurantServiceEndpoint = this.restaurantServiceBaseUrl + '/restaurants';
  }

}