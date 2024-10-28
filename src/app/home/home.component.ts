import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  standalone: true,
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {
  welcomeMsg = "Welcome";
  title = "Windfire UI Angular";
  mainFunctionsLabel = "Main Functions";
  getRestaurantsLabel = "My Restaurants List";
  addRestaurantLabel = "Add Restaurant";

  constructor() { }

  ngOnInit() {
  }

  add(): void {
    console.log("######## ADD");
  }

}