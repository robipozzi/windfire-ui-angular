import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RestaurantAddController {
  private formSubmitted = new BehaviorSubject<boolean>(false);
  formSubmitted$ = this.formSubmitted.asObservable();

  setSubmittedState(value: boolean) {
    this.formSubmitted.next(value);
  }

}