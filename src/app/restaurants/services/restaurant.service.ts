import { Injectable } from '@angular/core';
import { ErrorService } from '../../error/services/error.service';
import { Restaurant } from '../model/restaurant';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
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
    return this.httpClient.get<Restaurant[]>(this.restaurantServiceEndpoint)
      .pipe(
        catchError(error => {
          // Quality control catches the problem
          console.error('Delivery problem:', error);
          // Send an apology note or fix the issue
          this.errorService.add('Oops! Something went wrong. Not able to fetch restaurants list, please try again later.')
          return throwError(() => new Error('Oops! Something went wrong. Please try again later.'));
        })
      )
  }

  /*addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    console.log('addRestaurant - Calling Restaurant Service Endpoint @ ' + this.restaurantServiceEndpoint);
    return this.http.post<Restaurant>(this.restaurantServiceEndpoint, restaurant, this.httpOptions)
      .pipe(
        catchError(this.errorService.handleError('addRestaurant', restaurant)));
  }*/

  /*deleteRestaurant(id: string): Observable<{}> {
    const url = `${this.restaurantServiceEndpoint}/${id}`;
    return this.http.delete(url, this.httpOptions)
      .pipe(
        catchError(this.errorService.handleError('deleteRestaurant', id)));
  }*/

  getRestaurantsFake(): Restaurant[] {
    console.log('Returning a fake Restaurant list');
    const restaurants: Restaurant[] = [];
    var index = 0;
    var restaurant1 = new Restaurant('1', '1', 'Taverna del Pittore', 'Arona', 'Piazza del Popolo 39', '28041', 'Pesce');
    var restaurant2 = new Restaurant('2', '2', 'La Corte del Re', 'Gallarate', 'Via Manzoni 1', '21013', 'Italian');
    var restaurant3 = new Restaurant('3', '3', 'La Perla', 'Varese', 'Via Carrobbio 19', '21100', 'Pesce');
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